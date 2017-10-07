/**
 * Created by GiantX on 2017/6/5.
 */
import TWEEN from 'tween.js'

/**
 * 更新值
 * @param el  {Element} 操作元素
 * @param n   {Number}  新值
 * @param o   {Number}  旧值
 */
function updateNum(el, n, o) {
  function animate(time) {
    requestAnimationFrame(animate)
    TWEEN.update(time)
  }

  new TWEEN.Tween({num: o})
    .to({num: n}, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(function () {
      el.textContent = this.num.toFixed(0)
    })
    .start()
  animate()
}

export default {
  bind(el, binding) {
    el.textContent = binding.value // 赋予初始值
  },
  update(el, binding) {
    if (Number(el.textContent) !== binding.value) {
      // 更新值
      updateNum(el, binding.value, Number(el.textContent))
    }
  }
}
