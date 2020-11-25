<template>
  <div>
    <table-no-data
      ref="table-no-data"
      :width="$attrs.width"
      :table_no_data_visable="$attrs.table_no_data_visable"
      :tabledata_loading="panda_tabledata_loading"
    ></table-no-data>
    <div class="panda-table-father">
      <q-table
        v-bind="$attrs"
        :data="panda_tabledata"
        :columns="panda_tablecolumns"
        dense
        :pagination.sync="$attrs.pagination"
        row-key="name"
        :no-data-label="$attrs.panda_no_data_label"
        class="bg-panda-base-dark text-panda-text-light panda-table panda-sticky-header-table full-width"
        table-header-class="panda-table panda-table-col-text-indent"
        :table-style="` max-height: ${scroll_area_height}px `"
      >
        <template v-slot:body="props">
          <slot name="body" :props="props">
            <q-tr :props="props">
              <q-td :props="props" v-for="item in props.cols" :key="item.name">{{item.value}}</q-td>
            </q-tr>
          </slot>
        </template>
        <template v-slot:bottom v-if="show_pagination">
          <panda-pagination
            :total="$attrs.total"
            v-on="$listeners"
          ></panda-pagination>
        </template>
        <template #bottom>
          <slot name="bottom">1</slot>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import mixins from "src/mixins/index.js";
import tableNoData from "src/components/table/tablenodata.vue";
import pandaPagination from "src/components/pagination/pagination.vue";
import { dom } from "quasar";
const { height, width } = dom;
export default {
  components: {
    tableNoData,
    pandaPagination
  },
  mixins: [...mixins],
  props: {
    show_pagination: {
      type: Boolean,
      default: true
    },
    panda_scroll_area_height: {
      type: String
    },
    panda_tabledata_loading: {
      default: false
    },
    panda_tablecolumns: {
      default() {
        return [];
      }
    },
    panda_tabledata: {
      default() {
        return [];
      }
    }
  },
  inheritAttrs: false,
  methods: {
    init_tabledata() {},
    compute_scrollarea_style() {
      let hs = this.window_size_info.height - 180;
      this.scroll_area_height = hs;
    }
  },
  data() {
    return {
      scroll_area_height: ""
    };
  }
};
</script>