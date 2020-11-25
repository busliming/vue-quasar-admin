/*
 * @Desc: 
 * @Date: 2020-04-17 20:06:26
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-17 20:43:16
 */
export default {
  state: {
      data: null,
  },
  getters: {
      get_data(state) {
          return state.data;
      }
  },
  actions: {
      set_data({ commit }, data) {
          commit("set_data", data)
      },
      clear_data({ commit }) {
          commit("clear_data")
      },

  },
  mutations: {
      set_data(state, data) {
          state.data = data
      },
      clear_data(state) {
          state.data = null
      }

  }
}