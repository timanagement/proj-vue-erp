import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 通用页面 */
import {common} from '@/pages'
/* 主页相关 */
import home from './home'
/* 行政相关 */
import administration from './administration'
/* 系统管理 */
import system from './system'

/* 创建vue-router实例 */
export default new Router({
  mode: 'history',
  routes: [
    home,
    administration,
    system,
    {
      path: '/SignIn',
      name: '登录',
      component: common.SignIn
    },
    {
      path: '*',
      name: '404',
      component: common.ErrPage
    }
  ]
})
