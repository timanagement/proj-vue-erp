import * as types from './mutations_types';

export default {
  /**
   * 显示ajax加载
   * */
  show_loading: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_LOADING);
      resolve()
    });
  },
  /**
   * 隐藏ajax加载
   * */
  hide_loading: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LOADING);
      resolve()
    });
  }
};
