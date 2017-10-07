import * as types from './mutations_types'
export default {
  [types.UPDATE_LISTMAXHEIGHT](state) {
    state.listMaxHeight = (parseInt(document.documentElement.clientHeight) - 200)
  },
  [types.TOGGLE_SHOW_LEFTNAV](state) {
    state.show_leftNav = !state.show_leftNav;
  },
  [types.HIDE_LEFTNAV](state) {
    state.show_leftNav = false;
  }
}
