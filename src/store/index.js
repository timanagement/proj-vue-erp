import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './userinfo'
import global from './global'
export default new Vuex.Store({
  modules: {
    user,
    global,
  }
});
