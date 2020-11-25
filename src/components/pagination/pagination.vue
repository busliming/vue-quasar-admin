<template>
  <div
    class="row q-pt-sm justify-center q-gutter-x-md text-panda-text-dark"
    style="width: 100%; margin-top: 4px;"
  >
    <div>
      <q-input
        outlined
        disable
        dense
        v-model.number="total"
        type="number"
        class="input-height-24px "
        style="width:130px;"
        color="panda-text-light"
        bg-color="panda-field-grey"
      >
        <template v-slot:before>
          <span class="text-panda-text-dark">总数</span>
        </template>
      </q-input>
    </div>
    <div>
      <q-select
        outlined
        dense
        style="width:130px;"
         class="input-height-24px "
        @input="handle_pageSize_change"
        v-model="pageSize"
        :options="pageSizeOptions"
        color="panda-text-light"
        bg-color="panda-field-grey"
        popup-content-class="bg-panda-base-dark text-panda-text-dark"
      >
        <template v-slot:before>
          <span class="text-panda-text-dark">每页</span>
        </template>
      </q-select>
    </div>
    <div>
      <q-pagination
      style="height:24px;"
        v-model="currentPage"
        color="panda-text-light"
        text-color="panda-text-light"
        :input-class="`text-panda-text-dark`"
        :max="maxPageNum"
        :min="1"
        input
      ></q-pagination>
      <!-- <q-pagination
        v-model="currentPage"
        color="panda-text-dark"
        text-color="q-pagination-selected"
        :input-class="`btn-input-blue`"
        :input-style="{ backgroundColor: '#ff0000' }"
        :max="maxPageNum"
        :direction-links="true"
        :boundary-numbers="true"
        :max-pages="9"
        :min="1"

       ellipses
      ></q-pagination>-->
    </div>
    <div>
      <q-input
        outlined
        bottom-slots
        dense
         class="input-height-24px "
        v-model.number="currentPage_inputed"
        :max="maxPageNum"
        style="width:140px;"
        color="panda-text-light"
        bg-color="panda-field-grey"
      >
        <template v-slot:before>
          <span class="text-panda-text-dark">跳转至</span>
        </template>
        <template v-slot:after>
          <span
            class=" text-center no-padding panda-btn-primary-dense text-white"
            @click="goto_input_page"
            style="width:26px;height: 22px; "
            >GO</span
          >
          <span class="text-panda-text-dark q-ml-sm">页</span>
        </template>
      </q-input>
    </div>
  </div>
</template>
<style lang="stylus"></style>
<script>
/**
   需求分析 ：
   传入： 总数   表格数据是否可请求 tabledata_can_request  当前页
   传出： 一切都处理好以后  输出 当前页数 和叶容量 ，并触发 请求

   因为，前后翻页可能存在 延时， 再请求后，需在引入页面 判断 返回页数和当前页
   所以 ，需要将 当前页数进行 双向传输

   传入当前页 原因是 查询条件改变

            <panda-pagination
              :total="total"
              @handle_pagination_change="handle_pagination_change"
              @emit_pageSize_and_currentPage="init_tabledata_with_pageSize_and_currentPage"
            ></panda-pagination>

 */
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      pageSizeOptions: [10, 20, 50, 100],
      pageSize: 50,
      currentPage: 1,
      currentPage_buffer: "",
      maxpage_request: 0,
      timer: "",
      currentPage_inputed: 1,
      maxPageNum: 1,
      emit_history: [],

      pagination: {
        sortBy: "",
        descending: false,
        page: 1,
        rowsPerPage: 10,
        // rowsNumber: 0
      }
    };
  },
  props: {
    total: ""
  },
  computed: {
    ...mapGetters({})
  },
  watch: {
    total() {
      this.compute_maxPageNum();
    },
    currentPage() {
      this.handle_currentPage_change();
    }
  },
  created() {
    this.get_router_cache_value_and_init();
  },
  methods: {
    ...mapActions({
      set_resetCurrentPage: "set_resetCurrentPage"
    }),
    get_router_cache_value_and_init() {
      this.initPageSizeAndCurrentPage(this.pageSize, this.currentPage);
      this.compute_maxPageNum();
    },
    goto_input_page() {
      let n = this.currentPage_confirm(this.currentPage_inputed);
      this.currentPage_inputed = n;
      if (n != this.currentPage) {
        // 输入页数 和当前页数不同
        this.setTimeout_request(n);
      }
    },
    currentPage_confirm(n) {
      //  最大值请求次数限制
      if (n > this.maxPageNum) {
        this.maxpage_request++;
      } else {
        this.maxpage_request = 0;
      }
      if (Number.isNaN(Number(n))) {
        n = 1;
      }
      n = n <= 0 ? 1 : n;
      n = n >= this.maxPageNum ? Number(this.maxPageNum) : n;

      return n;
    },

    handle_currentPage_change() {
      let n = this.currentPage_confirm(this.currentPage);
      this.setTimeout_request(n);
    },
    setTimeout_request(page) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.currentPage_inputed = page;
        this.initPageSizeAndCurrentPage(this.pageSize, Number(page));
      }, 300);
    },
    compute_maxPageNum() {
      console.log("翻页器 计算 最大值");

      this.maxPageNum = Math.ceil(this.total / this.pageSize);

      console.log(this.maxPageNum);
    },
    compute_pagination() {
      let obj = {
        page: this.currentPage,
        rowsPerPage: this.pageSize,
        // rowsNumber: this.total
      };
      this.pagination = Object.assign({}, this.pagination, obj);

      this.$emit("handle_pagination_change", this.pagination);
    },
    initPageSizeAndCurrentPage(pageSize, currentPage) {
      console.log("翻页器 计算 pageSize, currentPage");
      console.log(pageSize, currentPage);
      /**
       * 这里存在 几个问题
       * pageSize  和 currentPage 更新 都会 触发 此方法
       * 都会去请求
       * 这里需要验证一个序列
       *
       *
       */

      this.pageSize = pageSize;
      this.compute_pagination();
      if (Number.isNaN(Number(currentPage))) {
        currentPage = 1;
      }
      currentPage = currentPage <= 0 ? 1 : currentPage;
      currentPage =
        currentPage >= this.maxPageNum ? Number(this.maxPageNum) : currentPage;
      this.currentPage = Number(currentPage);
      this.$forceUpdate();
      //  this.emit_pageSize_and_currentPage();

      let str = JSON.stringify({
        pageSize: this.pageSize,
        currentPage: this.currentPage
      });

      if (this.emit_history.length == 0) {
        this.emit_history.push(str);
        this.emit_pageSize_and_currentPage();
      } else {
        if (str != this.emit_history[0]) {
          this.emit_history.shift(0);
          this.emit_history.push(str);
          this.emit_pageSize_and_currentPage();
        }
      }
    },
    emit_pageSize_and_currentPage() {
      this.$emit(
        "emit_pageSize_and_currentPage",
        this.pageSize,
        this.currentPage
      );
    },

    handle_pageSize_change(val) {
      this.compute_maxPageNum();
      this.initPageSizeAndCurrentPage(val, this.currentPage);
    }
  }
};
</script>
