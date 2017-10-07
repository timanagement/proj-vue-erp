import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import user from './user'
import global from './global'
export default new Vuex.Store({
  modules: {
    user,
    global
  }
})
