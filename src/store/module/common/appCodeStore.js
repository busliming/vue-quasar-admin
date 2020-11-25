/*
 * @Desc: 
 * @Date: 2020-01-06 21:39:24
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-07 14:01:01
 */


 //存储导航栏切换平台
 export default {
  state: {
    appObj: {},
  },
  getters: {
    get_app_obj(state) {
      return state.appObj;
    }
  },
  actions: {
    set_app_obj({ commit }, appObj) {
      commit("set_app_obj", appObj);
    }
  },
  mutations: {
    set_app_obj(state, appObj) {
      state.appObj = appObj
    }
  }
}