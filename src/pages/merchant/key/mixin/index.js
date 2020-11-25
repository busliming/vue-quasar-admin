/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:39
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-10 13:49
 */
import dialogEdit from "src/pages/merchant/key/component/dialogEdit.vue";
import { handleCopy } from "src/util/module/common.js";
export default {
  data() {
    return {
      tabledata: [],
      tabledata_loading: false,
      searchForm: {
        merchantName: "" //商户名称
      },
      showDialogObj: "",
      eidtKeyShow: false, //编辑证书弹窗阀值
    }
  },
  components: {
    dialogEdit,
  },
  methods: {
    handleCopy,
    // 点击搜索按钮
    handleSearch() {
      this.initTableData();
    },
    //编辑证书
    handleEdit(record, index) {
      console.log(index)
      this.showDialogObj = { ...record };
      this.eidtKeyShow = true;
    },
    //关闭弹窗
    handle_close_dialog_edit() {
      this.eidtKeyShow = false;
      this.initTableData();
    }
  }
};
