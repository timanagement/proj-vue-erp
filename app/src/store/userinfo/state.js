import {local} from '@/util/';
export default {
  //登录成功后的用户信息
  userinfo: local.get('userinfo') || {},

  //记住密码相关信息，现在暂且只做记住一个账号密码
  //后期：每次登录成功一次，就缓存到列表中，然后在登录表单，输入时，会出现下拉列表选择之前登录过得用户
  remember: {
    remember_flag: !!local.get('remember_flag'),
    remember_login_info: local.get('remember_login_info') || {
      username: '',
    }
  },
  // 用户登录设备信息
  sys: ''
};