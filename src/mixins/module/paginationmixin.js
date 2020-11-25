import { mapGetters, mapActions } from 'vuex'
export default {
    computed: {
        ...mapGetters({
            pageSize: 'get_pageSize',
        })

    },

    methods: {
        ...mapActions({
            set_pageSize: 'set_pageSize'
        }),
        initPageSizeAndCurrentPage(pageSize, currentPage) {
            if (pageSize != this.pageSize) {
                this.set_pageSize(pageSize);
            }

            this.currentPage = currentPage;
            if (this.tabledata_can_request) {
                this.init_tabledata()
            }

        },
        handleSizeChange(val) {

            this.initPageSizeAndCurrentPage(val, this.currentPage)
        },
        handleCurrentChange(val) {

            this.initPageSizeAndCurrentPage(this.pageSize, val)
        },
        handlePrevClick(val) {

            this.initPageSizeAndCurrentPage(this.pageSize, val)
        },
        handleNextClick(val) {

            this.initPageSizeAndCurrentPage(this.pageSize, val)
        },

    },
}