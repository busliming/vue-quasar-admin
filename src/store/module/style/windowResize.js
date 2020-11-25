export default {
  // namespaced: true,
  state: {
    window_size_info: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  },
  getters: {
    get_window_size_info(state) {
      return state.window_size_info;
    }
  },
  actions: {
    set_window_size_info({ commit }, window_size_info) {
      commit("set_window_size_info", window_size_info);
    }
  },
  mutations: {
    set_window_size_info(state, window_size_info) {
      state.window_size_info = window_size_info;
    }
  }
};
