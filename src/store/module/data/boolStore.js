/*
 * @Desc: 
 * @Date: 2020-04-17 20:06:26
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-22 15:07:24
 */
export default {
  state: {
      bool: false,   //是否从首页赛事跳转过来！
  },
  getters: {
      get_bool(state) {
          return state.bool;
      }
  },
  actions: {
      set_bool({ commit }, bool) {
          commit("set_bool", bool)
      },
      clear_bool({ commit }) {
          commit("clear_bool")
      },

  },
  mutations: {
      set_bool(state, bool) {
          state.bool = bool
      },
      clear_bool(state) {
          state.bool = false
      }

  }
}