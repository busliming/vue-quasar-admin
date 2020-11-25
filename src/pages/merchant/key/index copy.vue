<template>
  <div class="full-height full-width bg-panda-bg-5  s99999 ">
    <div class="row p-fwnw">
      <!-- 列表主区域 -->
      <div :style="main_component_style">
        <div class="p-fg1">
          <!-- 头部搜索条件区域 -->
          <div class="full-width fs12">
            <div style="width: calc(100% - 20px)">
              <div
                class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb20x pt20x"
              >
                <div class="append-handle-btn-input" style="position: relative">
                  <q-input
                    style=" width:320px;"
                    outlined
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-30px input-append-btn ml20x"
                    v-model.trim="unauto_queryform_form.fast_search"
                    placeholder="请输入商户名称"
                    @input="show_select"
                    @blur="hidden_select"
                    @keydown.enter="tosearch_queryform"
                  >
                    <template v-slot:prepend>
                      <q-icon name="search" class="text-panda-text-dark" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        v-if="unauto_queryform_form.fast_search !== ''"
                        name="cancel"
                        @click="cancel"
                        class="cursor-pointer"
                      ></q-icon>
                    </template>
                  </q-input>
                </div>
                <q-space />

                <div>
                
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 正常列表格展示 -->
        <table-no-data
          ref="table-no-data"
          :table_no_data_visable="show_table_no_data"
          :tabledata_loading="tabledata_loading"
          style="position: absolute; z-index: 1;
           background: #fff"
        ></table-no-data>
        <div class="panda-table-container">
          <q-table
            :title="tabletittle"
            :data="tabledata"
            :columns="tablecolumns"
            dense
            row-key="name"
            class="bg-panda-base-dark text-panda-text-light panda-table panda-sticky-header-table full-width  line-height-45px"
            table-header-class="panda-table panda-table-col-text-indent"
            :separator="separator"
            :pagination.sync="pagination"
            :no-data-label="data_label"
            :table-style="
              `  max-height: ${scroll_area_height}px ; height: ${scroll_area_height}px  `
            "
          >
            <template v-slot:body="props">
              <tablerow
                :props="props"
                :is_top_slot="0"
                :tablecolumns="tablecolumns"
                :show_right_detail_obj="show_right_detail_obj"
                @show_detail="to_show_detail"
              ></tablerow>
            </template>
            <template v-slot:bottom>
              <panda-pagination
                class="pa p-b--md zi2"
                :total="total"
                @handle_pagination_change="handle_pagination_change"
                @emit_pageSize_and_currentPage="
                  init_tabledata_with_pageSize_and_currentPage
                "
              ></panda-pagination>
            </template>
          </q-table>
        </div>
      </div>
    </div>
    <q-dialog
      v-model="show_detail"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-main :detail_obj="show_detail_obj"></dialog-main>
    </q-dialog>
  </div>
</template>
<style lang="stylus" scoped>
.match-team-child {
  .text-panda-text-light {
    >>>.show_toggle {
      position: absolute;
      right: 0;
    }
  }
}

.card-span-1 {
  color: #687379;
  display: inline-block;
  width: 70px;
}
.match-manage__search-select {
  width: 242px;
  top: 34px;
  z-index: 11;
  background-color: #242B38;
}

.match-manage__search-select-item {
  height: 24px;
  padding-left: 5px;
  line-height: 24px;
  border-radius: 4px;

  &:hover {
    background-color: #50596C;
  }
}

.match-manage__search-select-item.is-active {
  background-color: #50596C;
}
</style>
<script>
import { mapGetters, mapActions } from "vuex";
// import { api_resource } from "src/api/index.js";
// import { api_log } from "src/api/index.js";
// import { api_role } from "src/api/index.js";
import mixins from "src/mixins/index.js";

import { tablecolumns_config } from "src/pages/merchant/key/config/config.js";

import pandaPagination from "src/components/pagination/paginationV2.vue";
import tablerow from "src/pages/merchant/key/component/tablerow.vue";
import tableColWidth from "src/mixins/style/tableColWidth.js";

import { dom } from "quasar";
import tableNoData from "src/components/table/tablenodata.vue";
import tablepagemixin from "src/mixins/table/index.js";
import dialogMain from "src/pages/merchant/key/component/dialog_main.vue";
import log_login_mixin from "src/pages/merchant/key/mixin/index.js";
import mockdata from "src/pages/merchant/key/mock/index.js";

const { height, width } = dom;
export default {
  mixins: [...mixins, ...tablepagemixin, tableColWidth, log_login_mixin],
  components: {
    pandaPagination,
    tablerow,
    tableNoData,
    dialogMain
  },
  data() {
    return {
      tabledata_loading: false,
      queryform_form: {},

      search_form: {
        createTimeGT: "", //起始时间
        createTimeLT: "", //结束时间
        userCode: "", //账号id(sys_user的id)
        loginCode: "", //登录编号
        loginIp: "" // 	ip地址(如127.0.0.1）
      },
      unauto_queryform_form: {
        fast_search: ""
      },
      queryform_module: {
        appId: "", //所属后台id
        createTimeGT: "", //起始时间
        createTimeLT: "", //结束时间
        loginType: "", //登录方式
        loginStatus: "", //登录状态(1.正常登录；2正常登出；3.异常登录；4.异常登出)
        roleId: "", //角色id
        pageSize: 50, //每页显示多少行
        currentPage: 1 //当前页数
      },
      appList: [], //后台数据
      tabletittle: "",
      show_right_detail_obj: "",
      scroll_area_height: "",
      tablecolumns: tablecolumns_config,
      tabledata: [],
      show_detail: false,
      show_detail_obj: {},
      visable_select: false, // 下拉框是否显示
      role_constants: []
    };
  },
  created() {
    this.tablecolumns = this.rebuild_tablecolumns_config(this.tablecolumns);

  },
  mounted() {},

  watch: {
    queryform_form: {
      handler: function(val) {
        this.init_tabledata();
      },
      deep: true
    }
  },

  methods: {
    init_tabledata() {
      // this.init_tabledata_before();
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      let arr = [];
      for (let i = 0; i < 20; i++) {
        arr.push({ ...mockdata });
      }
      this.tabledata = this.rebuild_tabledata_to_needed(arr);
      this.total = 20;
      // api_log.post_sysLoginLog_findListByPage(params).then(res => {
      //   this.init_tabledata_after(res);
      //   let code = this.$lodash.get(res, "data.code");
      //   if (code == "00000000") {
      //     // 是
      //     let arr = this.$lodash.get(res, "data.data.records") || [];
      //     this.tabledata = this.rebuild_tabledata_to_needed(arr);
      //     this.total = this.$lodash.get(res, "data.data.total") * 1 || 0;
      //   }
      // });
    },


    rebuild_tabledata_to_needed(arr) {
      arr.map((item, index) => {
        item._index = index + 1;
        item.id = index + 1;
      });
      return arr;
    },
    compute_init_tabledata_params() {
      let params = {
        appId: this.queryform_form.appId // 所属后台编号
      };
      return params;
    },
    compute_scrollarea_style() {
      let hs = this.window_size_info.height - 220;
      this.scroll_area_height = hs;
    },
    // 起始时间选中时间弹窗关闭
    handle_confirm_create_time_date(val) {
      this.$refs.qDateCreateTimeDate.hide();
    },
    // 结束时间选中时间弹窗关闭
    handle_confirm_end_time_date(val) {
      this.$refs.qDateEndTimeDate.hide();
    },
    table_item_click(item) {
      this.show_right_detail_obj = this.$lodash.cloneDeep(item);
    },
    to_show_detail(item) {
      this.show_detail_obj = item;
      this.show_detail = true;
    },
    // 点击搜索按钮
    handleSearch() {
      this.tosearch_queryform();
    },
    // 选中操作账号或者登录编号
    select_item(item) {
      if (!this.unauto_queryform_form.fast_search) return;
      if (item && typeof item == "object") {
        let obj = {};
        let type = item.type;
        Object.assign(this.search_form, {
          userCode: "",
          loginCode: "",
          loginIp: ""
        });
        if (type === 1) {
          this.search_form.userCode = this.unauto_queryform_form.fast_search;
          // this.tosearch_queryform();
        } else if (type === 2) {
          this.search_form.loginCode = this.unauto_queryform_form.fast_search;
          // this.tosearch_queryform();
        } else if (type === 3) {
          this.search_form.loginIp = this.unauto_queryform_form.fast_search;
        }
      }
    },
    // 影藏下拉框
    hidden_select() {
      this.visable_select = false;
    },
    // 展示下拉框
    show_select() {
      if (this.unauto_queryform_form.fast_search.length >= 1) {
        this.visable_select = true;
      } else {
        this.visable_select = false;
      }
    },
    // x清除按钮 清除input框的值
    cancel() {
      (this.unauto_queryform_form.fast_search = ""), this.hidden_select();
      this.search_form.userCode = "";
      this.search_form.loginCode = "";
      this.search_form.loginIp = "";
    }
  }
};
</script>
