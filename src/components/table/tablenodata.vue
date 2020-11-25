<!--
 * @Desc: 
 * @Date: 2019-12-25 15:49:45
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-17 18:45:26
 -->
<template>
  <main
    v-show="tabledata_loading || table_no_data_visable"
    class="pa text-panda-text-dark bg-panda-secondary table-no-data"
    :class="table_no_data_visable ? 'p-zi--md' : ''"
    id="table-no-data"
    :style="{height: `${height}px`, width: width}"
  >
    <section class="p-center tac p-lh--xxxs" v-show="!tabledata_loading">
      <img :src="img_src" alt :class="img_class" />
      <p :class="title_class">
        <span>{{ title }}</span>
      </p>
    </section>
    <table-loading :loading="tabledata_loading" :loading_style="loading_style" />
  </main>
</template>

<script>
import tableLoading from "src/components/table/tableLoading.vue";

export default {
  name: "table-no-data",
  components: {
    tableLoading
  },
  props: {
    width: {
      type: String,
      default: `calc(100% - 210px)`
    },
    loading_style: {
      type: Object,
      default: () => ({ height: "100%", width: "100%", "z-index": 10 })
    },
    table_no_data_visable: {
      type: Boolean,
      default: false
    },
    tabledata_loading: {
      type: Boolean,
      default: false
    },
    img_src: {
      type: String,
      default: "statics/svg/icon_empty.svg"
    },
    img_class: {
      type: [Array, String, Object],
      default: ""
    },
    title_class: {
      type: [Array, String, Object],
      default: ""
    },
    title: {
      type: String,
      default: "Sorry，没有找到您想要的结果，请更换查询条件！"
    },
    other_height: {
      type: Number,
      default: 100
    }
  },
  mounted() {
    this.get_height();
  },
  data() {
    return {
      height: 400
    };
  },
  watch: {
    tabledata_loading() {
      this.$nextTick(() => {
        this.$nextTick(this.get_height);
      });
    }
  },
  methods: {
    // 计算高度
    computed_true_height() {
      let body = document.documentElement || document.body;
      let height = body ? body.clientHeight || body.offsetHeight : 1920;
      let table_no_data = document.getElementById("table-no-data");
      let table_no_data_off_height =
        (table_no_data && table_no_data.offsetTop) || this.other_height;
      return height - table_no_data_off_height;
    },
    get_height() {
      this.height = this.computed_true_height();
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-no-data {
  min-height: 400px;
  z-index: 10
}
</style>