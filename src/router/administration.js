/**
 * Created by giantR on 2017/4/1.
 */
import {administration, common, applyLists} from 'pages'
export default {
  path: '/administration',
  name: '行政事务',
  meta: {
    icon: 'fa-calendar'
  },
  component: common.Index,
  children: [
    {
      path: 'fundManage',
      name: '资金使用',
      component: common.Blank,
      children: [
        {
          path: 'bxaccount',
          component: applyLists.ApplyLists
        },
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    },
    {
      path: 'dailyAttendance',
      name: '日常考勤',
      component: common.Blank,
      children: [
        {
          path: 'addressBook',
          name: '通讯录',
          component: administration.dailyAttendance.AddressBook
        },
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    },
    {
      path: 'materialsManage',
      name: '固定资产&用品管理',
      component: common.Blank,
      children: [
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    },
    {
      path: 'carsManage',
      name: '用车管理',
      component: common.Blank,
      children: [
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    },
    {
      path: 'riskManage',
      name: '风险管理',
      component: common.Blank,
      children: [
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    },
    {
      path: 'attendanceManage',
      name: '考勤管理',
      component: applyLists.ApplyLists
    },
    {
      path: 'otherManage',
      name: '其他审批',
      component: common.Blank,
      children: [
        {
          path: ':op',
          component: applyLists.ApplyLists
        }
      ]
    }
  ]
}
