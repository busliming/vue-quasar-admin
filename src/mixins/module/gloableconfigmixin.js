import { mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            gloableConfig: 'get_gloableConfig'
        })
    },

}