import * as types from './mutations_types'

export default {
  /**
   * 更新列表最大高度
   * */
  update_listMaxHeight: ({
    commit
  }) => {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_LISTMAXHEIGHT)
      resolve()
    })
  },
  /**
   * 显示隐藏侧边导航
   * */
  toggle_show_leftNav({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.TOGGLE_SHOW_LEFTNAV)
      resolve()
    })
  },
  /**
   * 隐藏侧边导航
   * */
  hide_leftNav({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_LEFTNAV);
      resolve()
    })
  }
}
