/*
 * @Desc: 
 * @Date: 2020-04-18 21:50:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-18 21:56:00
 */
export default {
  state: {
      amount: null,
  },
  getters: {
      get_amount(state) {
          return state.amount;
      }
  },
  actions: {
      set_amount({ commit }, amount) {
          commit("set_amount", amount)
      },

  },
  mutations: {
      set_amount(state, amount) {
          state.amount = amount
      },
  }
}