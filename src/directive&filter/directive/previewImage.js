/**
 * Created by GiantX on 2017/5/27.
 */
import {on} from 'util/dom'
import config from 'api/config'
const IMAGE_AFFIX = ['jpg', 'jpeg', 'png', 'gif']
export default {
  // 只调用一次，指令第一次绑定到元素时调用，用这个钩子函数可以定义一个在绑定时执行一次的初始化动作。
  bind(el, binding) {
    let src = el.src || binding.value || ''
    let affix = src.split('.')
    affix = affix[affix.length - 1].toLowerCase()
    if (IMAGE_AFFIX.includes(affix)) {
      on(el, 'click', () => {
        config.BUS.$layer.open({
          type: 1,
          title: false,
          shadeClose: true,
          closeBtn: 2,
          area: '80%',
          offset: '10%',
          move: '.imgDrag',
          skin: 'layui-layer-nobg', //没有背景色
          content: '<div style="text-align: center">' +
          '<img  class="imgDrag" style="max-width:100%" src="' + binding.value.replace(':808', '') + '">' +
          '</div>'
        })
      })
    } else {
      el.style.display = 'none'
    }
  }
}
