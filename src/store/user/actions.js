import * as types from './mutations_types'

export default {
  /* 更新用户信息 */
  update_userInfo({commit}, {user}) {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_USERINFO, {
        user
      })
      resolve()
    })
  },

  /* 移除用户信息 */
  remove_userInfo({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.REMOVE_USERINFO)
      resolve()
    })
  },

  /* 更新用户设备信息 */
  update_sys({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.UPDATE_SYS)
      resolve()
    })
  },
  /* 显示重登陆模态框 */
  show_relog_modal({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.SHOW_RELOG_MODAL)
      resolve()
    })
  },
  /* 隐藏重登陆模态框 */
  hide_relog_modal({commit}) {
    return new Promise((resolve, reject) => {
      commit(types.HIDE_RELOG_MODAL)
      resolve()
    })
  }
}
