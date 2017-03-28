import * as types from './mutations_types';

export default {
  /* 更新用户信息 */
  update_userinfo ({commit}, {userinfo}) {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, {
        userinfo
      });
      resolve()
    });
  },

  /* 移除用户信息 */
  remove_userinfo ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO);
      resolve()
    });
  },

  /* 更新记住密码信息 */
  update_remember ({commit}, {remember_flag, remember_login_info}) {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_REMEMBER, {
        remember_flag,
        remember_login_info
      });
      resolve()
    });
  },

  /* 移除记住密码信息 */
  remove_remember ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_REMEMBER);
      resolve()
    });
  }
};
