import {local} from '@/util'
export default {
  // 登录成功后的用户信息
  userInfo: local.get('userInfo') || {},
  // 用户登录设备信息
  sys: '',
  // token过期重新登录
  reLogFlag: false
}
