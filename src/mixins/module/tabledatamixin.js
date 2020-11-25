export default {
    methods: {
        init_tabledata_before() {
            this.tabledata_loading = true;
            this.tabledata_can_request = false;
        },
        resolve_tabledata_response_base(res) {
            this.init_tabledata_after();
            this.tabledata = this.find_value_in_obj_bypath(res, 'res.data.data.list')||[];
            this.currentPage = this.find_value_in_obj_bypath(res, 'res.data.data.page') * 1 || 1;
            this.total = this.find_value_in_obj_bypath(res, 'res.data.data.total') * 1 || 0;
        },
        init_tabledata_after() {
            this.tabledata_loading = false;
            this.tabledata_can_request = true;
        },
    },
}