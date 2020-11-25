export default {
    data(){
        return{
            editconfig_form: {},
         
        }
    },
    created() {
        
    },
    mounted() {
        
    },

    methods: {
        init_form_base_with_module(name, module) {
            this[name] = null;
            this[name] = this.deep_clone(module)
        },
        abort_dialog_form() {
            // this.close_dialog_base(name)
        },
        submit_dialog_form() {
            // this.close_dialog_base(name)
        },

    },
}