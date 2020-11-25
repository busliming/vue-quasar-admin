export default {
    // namespaced: true,
    state: {
        token: '',
    },
    getters: {
        get_token(state) {
            return state.token;
        }
    },
    actions: {
        set_token({ commit }, token) {
            commit("set_token", token)
        }

    },
    mutations: {
        set_token(state, token) {
            state.token = token
        }

    }
}