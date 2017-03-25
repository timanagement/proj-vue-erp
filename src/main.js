import Vue from 'vue'

/* 根组件 */
import App from './App'

/* 路由 */
import router from './router/index'

/* 引入异步请求插件 */
import axios from 'axios'
axios.defaults.baseURL = '/static/data/';
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)

/* element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

// 页面顶部进度条
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/* 主css */
import '@/assets/style/index.less'

// 不显示控制台提示信息
Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  if (!localStorage.getItem('user') && to.path !== '/signin') {
    next('/signin');
  } else {
    NProgress.start();
    next();
  }
})

router.afterEach(transition => {
  NProgress.done();
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
