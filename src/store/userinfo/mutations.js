import * as types from './mutations_types'

import {local} from '@/util/';

export default {
  [types.UPDATE_USERINFO](state, user_db) {
    state.userinfo = user_db.userinfo || {};
    local.set('userinfo', state.userinfo);
  },

  [types.REMOVE_USERINFO](state) {
    local.remove('userinfo');
    state.userinfo = {};
  },

  [types.UPDATE_REMEMBER](state, user_db) {
    state.remember.remember_flag = user_db.remember_flag;
    state.remember.remember_login_info = user_db.remember_login_info;

    local.set('remember_flag', state.remember.remember_flag);
    local.set('remember_login_info', state.remember.remember_login_info);
  },


  [types.REMOVE_REMEMBER](state) {
    local.remove('remember_flag');
    local.remove('remember_login_info');

    state.remember.remember_flag = false;
    state.remember.remember_login_info = {
      username: '',
      token: ''
    };
  },
};
