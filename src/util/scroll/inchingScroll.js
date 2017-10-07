/**
 * Created by giantR on 2017/3/28.
 */
/**
 * 缓动js
 * @param {number}    A         起始位置；
 * @param {number}    B         目标位置 默认值,0；
 * @param {number}    rate      是缓动速率 默认值,2；
 * @param {function}  callback  变化的位置回调，支持两个参数，value和isEnding，表示当前的位置值（数值）以及是否动画结束了（布尔值）
 * */
export default function(A, B, rate, callback) {
  if (A === B || typeof A !== 'number') {
    return
  }
  B = B || 0
  rate = rate || 2

  const step = function() {
    A = A + (B - A) / rate

    if (A < 1) {
      callback(B, true)
      return
    }
    callback(A, false)
    requestAnimationFrame(step)
  }
  step()
}
