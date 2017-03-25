import Vue from 'vue'
import Router from 'vue-router'

// import pages
import Index from '@/pages/'

import Workset from '@/pages/common/Workset'
import ErrPage from '@/pages/common/ErrPage'
import SignIn from '@/pages/page/SignIn'
import Documentation from '@/pages/page/Documentation'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {path: '', redirect: to => {return 'Workset'}},
        {path: 'Workset', component: Workset},
        {path: 'Documentation', component: Documentation},
      ]
    },
    {
      path: '/signin',
      component: SignIn
    },
    {
      path: '*',
      component: ErrPage
    }
  ]
})
