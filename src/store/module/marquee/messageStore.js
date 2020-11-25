/*
 * @Desc: 
 * @Date: 2020-04-15 19:48:44
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-15 20:31:55
 */
export default {
    // namespaced: true,
    state: {
        message: null,
    },
    getters: {
        get_message(state) {
            return state.message;
        }
    },
    actions: {
        set_message({ commit }, message) {
            commit("set_message", message)
        },
        clear_message({ commit }, message) {
            commit("clear_message", message)
        },

    },
    mutations: {
        set_message(state, message) {
            state.message = message
        },
        clear_message(state, message) {
            state.message = message
        }

    }
}