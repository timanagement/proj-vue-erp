/**
 * Created by giantR on 2017/4/1.
 */
import {system, common} from 'pages'
export default {
  path: '/system',
  name: '系统管理',
  meta: {
    icon: 'fa-cog'
  },
  component: common.Index,
  children: [
    {
      path: 'sysSetting',
      name: '系统设置',
      component: common.Blank,
      children: [
        {
          path: 'moduleManage',
          name: '模块管理',
          component: system.sysSetting.ModuleManage
        },
        {
          path: 'moduleManage/:type/:id',
          name: '模块管理 - 详情',
          component: system.sysSetting.ModuleManageCheck
        }
      ]
    }
  ]
}
