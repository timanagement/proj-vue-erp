// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/* element-ui */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
/* 主css */
import 'index-less'
import {scroll, layer} from 'util'
/* layer */
Vue.use(layer)
/* 页面顶部进度条 */
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/* vuex store */
import store from './store'

/* 全局指令及过滤器 */
import './directive&filter'

Vue.config.productionTip = false

/* 路由遍历回调 */
router.beforeEach((to, from, next) => {
  if (!store.state.user.userInfo.token && to.path !== '/signin') {
    store.dispatch('remove_userInfo')
    next('/signin')
  } else if (store.state.user.userInfo.token && to.path === '/signin') {
    next({
      path: '/'
    })
  } else {
    NProgress.start()
    next()
  }
})
/* 路由遍历结束回调 */
router.afterEach(() => {
  NProgress.done()
  /* 隐藏导航 */
  store.dispatch('hide_leftNav')
  /* 更新列表最大高度 */
  store.dispatch('update_listMaxHeight');
  /* body滚动至顶部 */
  scroll.inchingScroll(document.body.scrollTop, 0, 4, function (value) {
    document.body.scrollTop = value
  })
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
