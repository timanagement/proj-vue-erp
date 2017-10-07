/**
 * Created by giantR on 2017/4/1.
 */
import {home, common} from 'pages'
export default {
  path: '/',
  component: common.Index,
  children: [
    {
      path: '',
      name: '主页',
      meta: {
        icon: 'fa-dashboard'
      },
      component: home.Home
    },
    {
      path: 'apis',
      name: 'Api - 列表',
      meta: {
        icon: 'fa-book'
      },
      component: common.Api
    },
    {
      path: 'apis/:type/:id',
      name: 'Api - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: common.ApiCheck
    },
    {
      path: 'documentation',
      name: 'CSS文档',
      meta: {
        icon: 'fa-book'
      },
      component: common.Documentation
    },
    {
      path: 'untodo',
      name: '待办审批',
      meta: {
        icon: 'fa-square-o'
      },
      component: home.Untodo
    },
    {
      path: 'todo',
      name: '发起审批',
      meta: {
        icon: 'fa-external-link'
      },
      component: home.Todo
    },
    {
      path: 'havedo',
      component: {
        render (c) {
          return c('router-view')
        }
      },
      children: [
        {
          path: '',
          name: '已办审批 - 分类',
          meta: {
            icon: 'fa-check-square-o'
          },
          component: home.HavedoList
        },
        {
          path: ':op',
          name: '已办审批 - 列表',
          meta: {
            icon: 'fa-check-square-o'
          },
          component: home.Havedo
        }
      ]
    }
  ]
}
