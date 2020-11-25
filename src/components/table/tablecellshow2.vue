<template>
  <div>
    <div
      style="overflow:hidden; text-overflow: ellipsis"
      v-html="str_1"
      ref="word_need_break"
      @mouseover="tooltip_need_hidden('word_need_break', 20)"
    ></div>
    <q-tooltip>
      <div v-html="str_all" :style="`width:${col_width} px;`"></div>
    </q-tooltip>
  </div>
</template>
<script>
export default {
  /**
      调用 方法    break_words_to_ellipsis(tablecolumns_config, name, str)
      <tablecellshow  :str_arr="break_words_to_ellipsis(tablecolumns_config, name, str)>  </tablecellshow>
     */
  data() {
    return {
      str_1: "",
      str_all: "",
      col_width: ""
    };
  },
  props: {
    str_arr: ""
  },
  created() {
    this.init_all_need_value();
  },
  watch: {
    str_arr: {
      handler: function() {
        this.init_all_need_value();
      },
      deep: true
    }
  },
  methods: {
    init_all_need_value() {
      let col_width = this.str_arr.col_width;
      this.col_width = col_width ? 1.3 * col_width : 200;

      this.compute_str_1();
      this.compute_str_all();
    },
    compute_str_1() {
      //  {
      //   col_width,
      //   return_arr
      // }
      let arr = this.str_arr.return_arr;

      let str = "";
      if (arr.length == 1) {
        str = arr[0];
      } else if (arr.length > 1) {
        str = arr[0] + "...";
      }
      this.str_1 = str;
    },
    compute_str_all() {
      let arr = this.str_arr.return_arr;

      this.str_all = arr.join("");
    }
  }
};
</script>   