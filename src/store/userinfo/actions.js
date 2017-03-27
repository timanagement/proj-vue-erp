import * as types from './mutations_types';

export default {
  update_userinfo: ({
    commit
  }, {
    userinfo
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, {
        userinfo
      });
      resolve()
    });
  },

  remove_userinfo: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO);
      resolve()
    });
  },


  update_remember: ({
    commit
  }, {
    remember_flag,
    remember_login_info
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_REMEMBER, {
        remember_flag,
        remember_login_info
      });
      resolve()
    });
  },

  remove_remember: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_REMEMBER);
      resolve()
    });
  }
};
