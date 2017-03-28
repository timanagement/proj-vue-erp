import * as types from './mutations_types';

export default {
  /**
   * 显示隐藏侧边导航
   * */
  toggle_show_leftnav ({dispatch, commit}) {
    return dispatch('hide_user').then(() => {
      new Promise((resolve, reject) => {
        commit(types.TOGGLE_SHOW_LEFTNAV);
        resolve()
      });
    })
  },
  /**
   * 显示隐藏迷你侧边导航
   * */
  toggle_mini_leftnav ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.TOGGLE_MINI_LEFTNAV);
      resolve()
    });
  },
  /**
   * 隐藏侧边导航
   * */
  hide_leftNav({commit}){
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LEFTNAV);
      resolve()
    })
  },
  /**
   * 显示隐藏用户信息
   * */
  toggle_show_user({dispatch, commit}){
    return dispatch('hide_leftNav').then(() => {
      new Promise((resolve, reject) => {
        commit(types.TOGGLE_SHOW_USER);
        resolve()
      })
    })
  },
  /**
   * 隐藏用户信息
   * */
  hide_user({commit}){
    return new Promise((resolve, reject) => {
      commit(types.HIDE_USER);
      resolve()
    })
  },
  /**
   * 显示隐藏通知信息
   * */
  toggle_show_notification ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.TOGGLE_SHOW_NOTIFICATION);
      resolve()
    });
  },
  /**
   * 隐藏通知信息
   * */
  hide_notification ({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_NOTIFICATION);
      resolve()
    });
  },
};
