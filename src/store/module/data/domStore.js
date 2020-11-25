/*
 * @Desc: 
 * @Date: 2020-04-17 20:06:26
 * @LastEditors: Nice
 * @LastEditTime: 2020-09-05 16:06:20
 */
export default {
  state: {
      dom: 0,
  },
  getters: {
      get_dom(state) {
          return state.dom;
      }
  },
  actions: {
      set_dom({ commit }) {
          commit("set_dom")
      },
      clear_dom({ commit }) {
          commit("clear_dom")
      },

  },
  mutations: {
      set_dom(state) {
          state.dom++;
      },
      clear_dom(state) {
          state.dom = 100
      }

  }
}