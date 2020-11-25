<template>
  <div>
    <!-- <template v-slot:body="props"> -->

    <q-tr :props="props" class="panda-table  full-width text-center" style=" width:100%; border-top:none;">
      <q-th
        v-for="(item,index) in tablecolumns"
        :key="index"
        class="panda-table text-panda-text-dark"
        style="  border-top:none;"
        :style="compute_table_col_width(item.name)"
      >{{item.label}}</q-th>
    </q-tr>
  </div>
</template>
<style lang="stylus"></style>
<script>
import tableColWidthmixin from "src/mixins/style/tableColWidth.js";
export default {
  mixins: [tableColWidthmixin],
  data() {
    return {

    };
  },
  props: {
    props: "",
    tablecolumns:''
  }
};
</script>