import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* 通用页面 */
import {common} from 'pages'
/* 主页相关 */
import home from './home'
/* 流程查看详情页 */
import applyLists from './applyLists'
/* 行政事务 */
import administration from './administration'
/* 系统管理 */
import system from './system'

export default new Router({
  mode: 'history',
  routes: [
    home,
    applyLists,
    administration,
    system,
    {
      path: '/signin',
      component: common.SignIn
    },
    {
      path: '*',
      component: common.ErrPage
    }
  ]
})
