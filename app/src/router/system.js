/**
 * Created by giantR on 2017/4/6.
 */
import {system, common} from '@/pages'
export default {
  path: '/system',
  component: common.Index,
  name: '系统管理',
  meta: {icon: 'fa-cog',},
  children: [
    {
      path: 'sysSetting',
      name: '系统设置',
      component: common.Blank,
      children: [
        {
          path: 'ModuleManage',
          name: '模块管理',
          component: system.sysSetting.ModuleManage
        }
      ]
    },
  ]
}
