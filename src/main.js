import Vue from 'vue'
/* 不显示控制台提示信息 */
Vue.config.productionTip = false

/* element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)

/* 主css */
import '@/assets/style/index.less'

/* 页面顶部进度条 */
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

/* 路由 */
import router from './router'

/* vuex store */
import store from './store';

/* 根组件 */
import App from './App'

import {scroll} from '@/util'
/* 路由遍历回调 */
router.beforeEach((to, from, next) => {
  if (!store.state.user.userinfo.token && to.path.toLocaleLowerCase() !== '/signin') {
    store.dispatch('remove_userinfo');
    next('/signin');
  } else {
    if (store.state.user.userinfo.token && to.path.toLocaleLowerCase() === '/signin') {
      next({
        path: '/'
      });
    } else {
      NProgress.start();
      next();
    }
  }
})
/* 路由遍历结束回调 */
router.afterEach(() => {
  NProgress.done();
  /* 隐藏导航 */
  store.dispatch('hide_leftNav');
  /* body滚动至顶部 */
  scroll.inchingScroll(document.body.scrollTop, 0, 4, function (value) {
    document.body.scrollTop = value;
  })
});

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
