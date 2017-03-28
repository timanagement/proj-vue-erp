import * as types from './mutations_types'
export default {
  [types.TOGGLE_SHOW_LEFTNAV](state) {
    state.show_leftNav = !state.show_leftNav;
  },
  [types.TOGGLE_MINI_LEFTNAV](state) {
    state.mini_leftNav = !state.mini_leftNav;
  },
  [types.HIDE_LEFTNAV](state) {
    state.show_leftNav = false;
  },
  [types.TOGGLE_SHOW_USER](state) {
    state.show_user = !state.show_user;
  },
  [types.HIDE_USER](state) {
    state.show_user = false;
  },
  [types.TOGGLE_SHOW_NOTIFICATION](state) {
    state.show_notification = !state.show_notification;
  },
  [types.HIDE_NOTIFICATION](state) {
    state.show_notification = !state.show_notification;
  },
};
