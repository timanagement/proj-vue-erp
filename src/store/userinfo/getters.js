export default {
  getUserinfo(state) {
    return state.userinfo;
  },

  getToken(state) {
    return state.userinfo && state.userinfo.token ? state.userinfo.token : '';
  },

  getRemember(state){
    return state.remember;
  }
};
