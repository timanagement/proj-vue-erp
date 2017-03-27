import Vue from 'vue'
import Router from 'vue-router'

// import pages
import pages from '@/pages/index.js'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: pages.common.Home,
      children: [
        {
          path: '', redirect: to => {
          return 'WorkSet'
        }
        },
        {path: 'WorkSet', name: 'workset', component: pages.WorkSet},
        {path: 'Documentation', name: 'documentation', component: pages.page.Documentation},
      ]
    },
    {
      path: '/SignIn',
      name: 'signin',
      component: pages.common.SignIn
    },
    {
      path: '*',
      name: '404',
      component: pages.common.ErrPage
    }
  ]
})
