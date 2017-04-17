/**
 * Created by giantR on 2017/4/1.
 */
import {home, common} from '@/pages'
export default {
  path: '/',
  component: common.Index,
  children: [
    {path: '', name: '主页', meta: {icon: 'fa-dashboard'}, component: home.Home},
    {path: 'untodo', meta: {icon: 'fa-square-o'}, name: '待办审批', component: home.Untodo},
    {path: 'havedo', meta: {icon: 'fa-check-square-o'}, name: '已办审批', component: home.Havedo},
    {path: 'todo', meta: {icon: 'fa-external-link'}, name: '发起审批', component: home.Todo},
    {path: 'discussion', name: '互动讨论', component: home.Discussion},
    {path: 'Announcement', name: '集团公告', component: home.Announcement},
    {path: 'Documentation', name: 'CSS文档', component: common.Documentation},
    {path: 'API', name: 'API', component: common.API},
  ]
}
