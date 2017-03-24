/* Vue 主文件*/
import Vue from 'vue'

/* 根组件 */
import App from './App'

/* 路由 */
import router from './router'

/* 引入异步请求插件 */
import axios from 'axios'
axios.defaults.baseURL = '/static/data/';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

/* element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

/* 主css */
import '@/assets/style/index.less'

// 不显示控制台提示信息
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
