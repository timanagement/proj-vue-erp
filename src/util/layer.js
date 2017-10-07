/**
 * Created by GiantX on 2017/5/26.
 */
import 'layer'
export default (Vue, options) => {
  Vue.prototype.$layer = {}
  Object.assign(Vue.prototype.$layer, window.layer)
  delete window.layer
}
