export default {
    // namespaced: true,
    state: {
        account: '',
    },
    getters: {
        get_account(state) {
            return state.account;
        }
    },
    actions: {
        set_account({ commit }, account) {
            commit("set_account", account)
        }

    },
    mutations: {
        set_account(state, account) {
            state.account = account
        }

    }
}