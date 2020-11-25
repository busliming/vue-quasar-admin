export default {
    // namespaced: true,
    state: {
        reloadLike: '1',
    },
    getters: {
        get_reloadLike(state) {
            return state.reloadLike;
        }
    },
    actions: {
        set_reloadLike({ commit }) {

            commit("set_reloadLike", '0');

            commit("set_reloadLike", '1');

            // commit("set_reloadLike", reloadLike)
        }

    },
    mutations: {
        set_reloadLike(state, reloadLike) {
            console.log(" 强制刷新")
            state.reloadLike = reloadLike
        }

    }
}