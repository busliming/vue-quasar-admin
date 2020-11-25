/*
 * @Desc: 
 * @Date: 2020-04-18 21:50:16
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-06 16:57:47
 */
export default {
    state: {
        channel: null,
    },
    getters: {
        get_channel(state) {
            return state.channel;
        }
    },
    actions: {
        set_channel({ commit }, channel) {
            commit("set_channel", channel)
        },
        clear_channel({ commit }) {
            commit("clear_channel")
        },
    },
    mutations: {
        set_channel(state, channel) {
            state.channel = channel
        },
        clear_channel(state) {
            state.channel = null
        },
    }
}