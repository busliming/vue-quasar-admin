export default {
    // namespaced: true,
    state: {
        pageSize: 50,
    },
    getters: {
        get_pageSize(state) {
            return state.pageSize;
        }
    },
    actions: {
        set_pageSize({ commit }, pageSize) {
            commit("set_pageSize", pageSize)
        }

    },
    mutations: {
        set_pageSize(state, pageSize) {
            state.pageSize = pageSize
        }

    }
}