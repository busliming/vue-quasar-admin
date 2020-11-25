<template>
  <!-- <q-tr :props="props" class="bg-panda-dark-dark text-panda-text-light panda-table"> -->
  <q-tr
    :props="props"
    class="panda-table hyuiut"
    @click.native="table_item_click(props.row)"
  >
    <q-td
      key="id"
      class="panda-table panda-table-col-checkbox"
      :style="compute_table_col_width('id')"
      :props="props"
    >
      {{ props.row._index }}
    </q-td>

    <q-td
      key="yonghuid"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('yonghuid')"
      :props="props"
    >
      {{ props.row.yonghuid }}
    </q-td>

    <q-td
      key="suoshushanghu"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('suoshushanghu')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.suoshushanghu"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="leijitouzhujine"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('leijitouzhujine')"
      :props="props"
    >
      <table-cell-ellipsis
        :str_all="props.row.leijitouzhujine"
      ></table-cell-ellipsis>
    </q-td>
    <q-td
      key="leijiyingli"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('leijiyingli')"
      :props="props"
    >
      {{ props.row.leijiyingli }}
    </q-td>

    <q-td
      key="zhudanshuliang"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zhudanshuliang')"
      :props="props"
    >
      {{ props.row.zhudanshuliang }}
    </q-td>

    <q-td
      key="zuihoutouzhushijian"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zuihoutouzhushijian')"
      :props="props"
    >
      {{ props.row.zuihoutouzhushijian }}
    </q-td>

    <q-td
      key="zaixianzhuangtai"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zaixianzhuangtai')"
      :props="props"
    >
      {{ props.row.zaixianzhuangtai }}
    </q-td>

    <q-td
      key="zuihoudenglushijian"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('zuihoudenglushijian')"
      :props="props"
    >
      {{ props.row.zuihoudenglushijian }}
    </q-td>

    
    <q-td
      key="caozuo"
      class="panda-table panda-table-col-text-indent"
      :style="compute_table_col_width('caozuo')"
      :props="props"
    >

 <div class=" row justify-center q-gutter-x-sm"> 

        
      <a class="panda-a cursor-pointer" @click="go_to_betting_user_detail(props.row)">   <span class="panda-icon panda-icon-cha-kan"></span></a>
      
 </div>
   

    </q-td>
  </q-tr>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import mixins from "src/mixins/index.js";
import tableColWidthmixin from "src/mixins/style/tableColWidth.js";
import alertmessagemixin from "src/mixins/module/alertmessagemixin.js";
import dialogmixin from "src/mixins/module/dialogmixin.js";
import log_login_mixin from "src/pages/merchant/bettinguser/mixin/index.js";
import tableCellEllipsis from "src/components/table/tableCellEllipsis.vue";
import { dom } from "quasar";
const { height, width } = dom;
export default {
  mixins: [tableColWidthmixin, alertmessagemixin, dialogmixin, log_login_mixin],
  components: {
    tableCellEllipsis
  },
  data() {
    return {
      affected_match_id_arr: [],
      affected_match_sportId: "",
      affected_type: 1
    };
  },
  props: {
    props: "",
    is_top_slot: "",
    show_right_detail_obj: "",
    tablecolumns: ""
  },
  methods: {
    table_item_click(item) {
      this.$emit("item_click", item);
    },

    show_detail(item) {
      this.$emit("show_detail", item);
    },
go_to_betting_user_detail(item){
  this.$router.push({
    name:"betting_user_detail"
  })
},
    compute_table_row_bg(item) {
      let str = "";
      str = item.is_child_showing ? "bg-panda-dark-dark" : "bg-panda-base-dark";
      if (item.is_selected) {
        str = "bg-panda-dark-light";
      }
      if (
        this.show_right_detail_obj &&
        item.id == this.show_right_detail_obj.id
      ) {
        str = "bg-panda-dark-light";
      }
      return str;
    }
  },
  filters: {
    filterLoginType(val) {
      let arr = ["登录", "登出"];
      return arr[val - 1];
    }
  }
};
</script>
