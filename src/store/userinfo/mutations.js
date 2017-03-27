import * as types from './mutations_types'

import {store} from '@/util/';

export default {
  [types.UPDATE_USERINFO](state, user_db) {
    state.userinfo = user_db.userinfo || {};
    store.set('userinfo', state.userinfo);
  },

  [types.REMOVE_USERINFO](state) {
    store.remove('userinfo');
    state.userinfo = {};
  },

  [types.UPDATE_REMEMBER](state, user_db) {
    state.remember.remember_flag = user_db.remember_flag;
    state.remember.remember_login_info = user_db.remember_login_info;

    store.set('remember_flag', state.remember.remember_flag);
    store.set('remember_login_info', state.remember.remember_login_info);
  },


  [types.REMOVE_REMEMBER](state) {
    store.remove('remember_flag');
    store.remove('remember_login_info');

    state.remember.remember_flag = false;
    state.remember.remember_login_info = {
      username: '',
      token: ''
    };
  },
};
