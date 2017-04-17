/**
 * Created by giantR on 2017/4/1.
 */
import {administration, common} from '@/pages'

export default {
  path: '/administration',
  component: common.Index,
  meta: {icon: 'fa-calendar'},
  name: '行政事务',
  children: [
    {
      path: 'attendance',
      name: '日常考勤',
      component: common.Blank,
      children: [
        {
          path: 'Contacts',
          name: '通讯录',
          component: administration.attendance.Contacts
        }
      ]
    },
  ]
}
