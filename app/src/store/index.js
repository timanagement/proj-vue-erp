import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import user from './userinfo'
import global from './global'
import nav from './nav'
export default new Vuex.Store({
  modules: {
    user,
    global,
    nav
  }
});
