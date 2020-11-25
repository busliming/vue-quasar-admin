<template>
  <section class="just-center items-center fg1" :style="root_style">
    <div class="row just-center items-center">
      <div class="text-panda-text-dark mr20x">
        <span class="pagination-check">总数：</span
        ><span class="text-panda-text-dark">{{ total }}条</span>
      </div>
      <q-pagination
        v-model="currentPage"
        :max="maxPageNum"
        :max-pages="maxPages"
        :ellipses="true"
        :boundary-numbers="boundaryNumbers"
        :direction-links="directionLinks"
        @input="currentPage_change"
        :color="pa_color"
        :text-color="pa_textColor"
      ></q-pagination>
      <q-select
        @input="handle_pageSize_change"
        v-model="pageSize"
        :options="pageSizeOptions"
        dense
        outlined
        bg-color="panda-field-grey"
        popup-content-class="text-panda-text-dark"
      >
        <template v-slot:after>
          <span>条/页</span>
        </template>
      </q-select>
      <q-input
        v-model="currentPage_inputed"
        class="ml22x"
        outlined
        dense
        @input="currentPage_inputed_change"
        input-class="w32x"
      >
        <template v-slot:before>
          <span>跳转至</span>
        </template>
        <template v-slot:after>
          <span>页</span>
        </template>
      </q-input>
    </div>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import { valid_ } from "src/util/module/valid.js";

export default {
  mixins: [{ methods: { valid_ } }],
  props: {
    root_style: {
      type: Object,
      default: () => {
        return { width: '100%', transform: "translateX(-16px)" };
      }
    },
    total: {
      type: Number,
      default: 0
    },
    maxPages: {
      type: Number,
      default: 9
    },
    boundaryNumbers: {
      type: Boolean,
      default: true
    },
    directionLinks: {
      type: Boolean,
      default: true
    },
    ellipses: {
      type: Boolean,
      default: true
    },
    pa_color: {
      type: String,
      default: "panda-text-dark"
    },
    pa_textColor: {
      type: String,
      default: "panda-text-2"
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 50,
      pageSizeOptions: [10, 20, 50, 100],
      currentPage_inputed: 1,
      timer: null,
      timer_inputed: null
    };
  },
  computed: {
    ...mapGetters({
      resetCurrentPage: "get_resetCurrentPage"
    }),
    // 翻页总数
    maxPageNum() {
      if (this.total && typeof this.total == "number") {
        return Math.ceil(this.total / this.pageSize);
      }
      return 0;
    }
  },
  watch: {
    resetCurrentPage: {
      handler(val) {
        if (val != 0) {
          this.currentPage = 1;
          this.currentPage_change();
        }
      },
      immediate: true
    }
  },
  methods: {
    // 重置翻页器为1
    reset_currentPage() {
      this.currentPage = 1;
    },
    // 判断是否在可选区间内
    check_page(currentPage) {
      return currentPage <= this.maxPageNum && currentPage >= 1;
    },
    // 设置翻页器
    set_currentPage(val) {
      val = Number(val);
      if (this.check_page(val)) {
        this.currentPage = val; // 此出未触发手动
        this.currentPage_change();
      }
    },
    // 当前页和页容量变化时通知父组件请求
    emit_pageSize_and_currentPage() {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => {
        this.$emit(
          "emit_pageSize_and_currentPage",
          this.pageSize,
          this.currentPage
        );
      }, 300);
    },
    // 当前页码改变执行
    currentPage_change() {
      this.emit_pageSize_and_currentPage();
    },
    // 当前容量改变执行
    handle_pageSize_change(pageSize) {
      let currentPage = this.currentPage;
      if (currentPage > this.maxPageNum) {
        this.reset_currentPage();
      } else {
        this.emit_pageSize_and_currentPage();
      }
    },
    // 跳转查询页
    currentPage_inputed_change(val) {
      this.valid_({
        reg: /^[1-9]\d*$/,
        val,
        model: "currentPage_inputed"
      });
      if (this.timer_inputed) {
        clearTimeout(this.timer_inputed);
      }
      this.timer_inputed = setTimeout(() => {
        this.set_currentPage(this.currentPage_inputed);
      }, 300);
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.q-field--outlined .q-field__control {
  padding: 0 0 0 6px;
  height: 22px;
  min-height: 22px;
  line-height: 22px;
}

>>>.q-field--outlined.q-field--focused .q-field__control:after {
  border-color: var(--q-color-panda-border-primary);
}
>>>.q-btn__wrapper:before
  box-shadow 0

>>>.q-field--auto-height.q-field--dense .q-field__native
  min-height 22px

>>>.q-field--dense .q-field__marginal
  line-height: 22px;
  min-height 22px
  height 22px


</style>
