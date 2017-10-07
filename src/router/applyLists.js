/**
 * Created by giantR on 2017/4/1.
 */
import {applyLists, common} from 'pages'
export default {
  path: '/applyLists',
  component: common.Index,
  children: [
    {
      path: 'jb/:type/:id',
      name: '加班单 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Jb
    },
    {
      path: 'qj/:type/:id',
      name: '请假单 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Qj
    },
    {
      path: 'cc/:type/:id',
      name: '出差申请 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Cc
    },
    {
      path: 'bx/:type/:id',
      name: '行政报销 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Bx
    },
    {
      path: 'yk/:type/:id',
      name: '日常立项 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Bx
    },
    {
      path: 'jk/:type/:id',
      name: '借款申请 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Bx
    },
    {
      path: 'yw/:type/:id',
      name: '业务报销 - 详情',
      meta: {
        icon: 'fa-book'
      },
      component: applyLists.Bx
    }
  ]
}
