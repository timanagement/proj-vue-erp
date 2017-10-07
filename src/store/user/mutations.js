import * as types from './mutations_types'

import {local} from '@/util'

export default {
  [types.UPDATE_USERINFO](state, user) {
    state.userInfo = user.user || {}
    local.set('userInfo', state.userInfo)
  },
  [types.REMOVE_USERINFO](state) {
    local.remove('userInfo')
    state.userInfo = {}
  },
  [types.UPDATE_SYS](state) {
    let sys = navigator.userAgent.toLowerCase().indexOf('mobile') > 0 ? '1' : '2'
    local.set('sys', sys)
    state.sys = sys
  },
  [types.SHOW_RELOG_MODAL](state) {
    state.reLogFlag = true
  },
  [types.HIDE_RELOG_MODAL](state) {
    state.reLogFlag = false
  }
}
