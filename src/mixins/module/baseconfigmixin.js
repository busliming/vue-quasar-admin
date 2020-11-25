/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-01-30 15:14:28
 */
export default {
  data() {
    return {
      file_server_address: "http://161.117.194.247:7788/",
      currentPage: 1,
      maxPageNum: 1,
      total: 0,
      // pageSize:50,
      pageSizeOptions: [10, 20, 50, 100],
      pagination: {
        sortBy: "name",
        descending: false,
        page: 1,
        rowsPerPage: 100,
        // rowsNumber: undefined,
      },
      separator: 'cell',//'horizontal','vertical','none','cell' 
      tabletittle: '',
      tabledata: [],
      tablecolumns: [
      ],
      tabledata_loading: false,
      tabledata_can_request: true,
    }
  },
}
