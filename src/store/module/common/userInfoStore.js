/*
 * @Desc: 
 * @Date: 2020-01-06 21:39:24
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-16 21:51:57
 */


 //存储登录用户信息
export default {
  state: {
    userInfo: {},
  },
  getters: {
    get_user_info(state) {
      return state.userInfo;
    }
  },
  actions: {
    set_user_info({ commit }, userInfo) {
      commit("set_user_info", userInfo);
    },
    clear_user_info({ commit }, userInfo) {
      commit("clear_user_info", userInfo);
    }
  },
  mutations: {
    set_user_info(state, userInfo) {
      state.userInfo = userInfo
    },
    clear_user_info(state){
      state.userInfo = {}
    }
  }
}