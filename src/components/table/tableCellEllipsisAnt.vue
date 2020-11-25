<!--
 * @Desc: 
 * @Date: 2020-05-29 17:29:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-10-04 12:19
--> 
<template>
  <div
    class="ellipsis"
    @mouseover="tooltip_need_hidden('words_need_break', 20)"
    ref="words_need_break"
  >
    <a-tooltip v-if="flag" :placement="defaultplace">
      <template slot="title">
        <div
          v-html="str_all"
          :style="`max-width: ${col_width}px; word-break:break-all;`"
        ></div>
      </template>
      <span @click="handleCopy(str, '商户名称')" v-html="span_html || str_all" class="ellipsis cursor-pointer"></span>
    </a-tooltip>
    <span @click="handleCopy(str, '商户名称')" v-else v-html="span_html || str_all" class="ellipsis cursor-pointer"></span>
  </div>
</template>

<script>
/* str_all 是显示的字符串长度 col_width是提示框宽度
 * <table-cell-ellipsis-ant :str_all="111111122132"></table-cell-ellipsis-ant>
 */
import { handleCopy } from "src/util/module/common.js";
export default {
  props: {
    span_html: {
      type: String
    },
    defaultplace: {
      type: String,
      default: "topLeft"
    },
    str_all: {
      type: String
    },
    col_width: {
      type: Number,
      default: 250
    },
    str: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      flag: false
    };
  },
  methods: {
    handleCopy,
    tooltip_need_hidden(key, value) {
      if (this.flag) return;
      key = key || "words_need_break";
      value = value || 10;
      let dom = this.$refs[key];
      if (dom) {
        let child = dom.firstElementChild;
        let child_width= child.offsetWidth;
        let father_width = dom.offsetWidth;
        if(father_width - value < child_width){
          this.flag = true;
        }else{
          this.flag = false;
        }
        //此处判断是否显示/影藏提示框
        if (child.childElementCount) {
          this.$lodash.forEach(child.children, element => {
            let element_width = element.scrollWidth;
            if (element_width > father_width) {
              this.flag = true;
            }
          });
        }
      } else {
        this.flag = false;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space:nowrap;
}
>>>p{
  margin :0;
}
</style>
