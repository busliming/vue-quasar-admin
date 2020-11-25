<template>
  <div>
    <div
      style="overflow:hidden; text-overflow: ellipsis"
      v-html="str_arr"
      ref="word_need_break"
      @mouseover="tooltip_need_hidden('word_need_break', 20)"
    ></div>
    <q-tooltip v-if="flag">
      <div v-html="str_arr" :style="{width}"></div>
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
      flag: false
    };
  },
  props: {
    width: {
      type: String,
      default: '400px'
    },
    str_arr: {
      default: ""
    }
  },
  methods: {
    tooltip_need_hidden(key, value) {
      if (this.flag) return
      key = key || "word_need_break";
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
      } else {
        this.flag = false;
      }
    }
  }
};
</script>   