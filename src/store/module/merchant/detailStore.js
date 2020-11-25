/*
 * @Desc: 
 * @Date: 2020-04-18 21:50:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-06 21:09:13
 */
export default {
  state: {
    detail: null,
  },
  getters: {
    get_detail(state) {
      return state.detail;
    }
  },
  actions: {
    set_detail({ commit }, detail) {
      commit("set_detail", detail)
    },
    clear_detail({ commit }) {
      commit("clear_detail")
    },
  },
  mutations: {
    set_detail(state, detail) {
      state.detail = detail
    },
    clear_detail(state) {
      state.detail = null
    },
  }
}