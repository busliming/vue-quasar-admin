<template>
  <div
    class="ellipsis"
    @mouseover="tooltip_need_hidden('words_need_break', 20)"
    ref="words_need_break"
  >
    <span v-html="span_html||str_all" class="ellipsis"></span>
    <q-tooltip v-if="flag" :content-style="tooltip_style">
      <div v-html="str_all" :style="`max-width: ${col_width}px; word-break:break-all;`"></div>
    </q-tooltip>
  </div>
</template>

<script>
/* str_all 是显示的字符串长度 col_width是提示框宽度
* <table-cell-ellipsis :str_all="111111122132"></table-cell-ellipsis>
*/

export default {
  props: {
    span_html:{
      type:String
    },
    str_all: {
      type: String
    },
    col_width: {
      type: Number,
      default: 250
    },
    tooltip_style: {
      type: Object,
      default: () => ({
        background: '#C6CEDE',
        padding: '10px',
        color: "#000"
      })
    }
  },
  data () {
    return {
      flag: false,    
    }
  },
  methods: {
    tooltip_need_hidden(key, value) {
      if (this.flag) return;
      key = key || "words_need_break";
      value = value || 10;
      let dom = this.$refs[key];
      if (dom) {
        let child = dom.firstElementChild;
        let child_width = child.offsetWidth;
        let father_width = dom.offsetWidth;
        if (father_width - value < child_width) {
          this.flag = true;
        } else {
          this.flag = false;
        }
        //此处判断换行
        if(child.childElementCount){
      this.$lodash.forEach(this.orgData)
           this.$lodash.forEach(child.children,element => {
        let element_width = element.scrollWidth;
        if ( element_width > father_width) {
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