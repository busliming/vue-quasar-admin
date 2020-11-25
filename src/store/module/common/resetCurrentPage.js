/*
 * @Desc: 
 * @Date: 2020-01-07 17:27:59
 * @LastEditors: Nice
 * @LastEditTime: 2020-01-07 17:28:03
 */
export default {
  // namespaced: true,
  state: {
      resetCurrentPage: 0,
  },
  getters: {
      get_resetCurrentPage(state) {
          return state.resetCurrentPage;
      }
  },
  actions: {
      set_resetCurrentPage({ commit }) {
          commit("set_resetCurrentPage")
      }

  },
  mutations: {
      set_resetCurrentPage(state) {

          state.resetCurrentPage++
      }

  }
}