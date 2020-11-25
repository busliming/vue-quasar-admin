<template>
  <div>
    <div style="overflow:hidden; text-overflow: ellipsis" ref="word_need_break">
      {{str_1}}
      <q-tooltip v-if="shwo_tooltip" >
        <div v-html="str_all" :style="`max-width:${col_width} px; `"></div>
      </q-tooltip>
    </div>
  </div>
</template>
<script>
export default {   
  /**
      调用 方法  anchor="center middle" self="center middle"   break_words_to_ellipsis(tablecolumns_config, name, str)
      <tablecellshow  :str_arr="break_words_to_ellipsis(tablecolumns_config, name, str)>  </tablecellshow>
     */
  data() {
    return {
      str_1: "",
      str_all: "",
      col_width: "",
      shwo_tooltip: false
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
      if (arr) {
        let str = "";
        if (arr.length == 1) {
          str = arr[0];
        } else if (arr.length > 1) {
          str = arr[0] + "...";
        }
        this.str_1 = str;
        
      }

    },
    compute_str_all() {
      let arr = this.str_arr.return_arr;
      let str = "";

      if (arr) {
        if (arr.length > 1) {
          this.shwo_tooltip = true;

          this.str_all = arr.join("");
          let arr2 = this.$lodash.chunk(arr, 2);

          arr2.map(x => {
            str += `   <p>  ${x[0]} ${x[1] ? x[1] : ""} </p> <br/>`;
          });
        }
      }
 this.str_all = str;
  
    }
  }
};
</script>   