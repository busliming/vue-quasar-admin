/**
 * 声明  开发参照屏幕宽度 1920
 *
 * 修复本身表格列数较多 默认必须出现滚动条的 情况 没有支持
 * 因为 存在勾选置顶 操作  因此 最小宽度和 宽度必须一样必须是定值
 * 修改人: @jinnian
 * 注释时间: 2019-11-09 10:20:26
 */

import { mapGetters } from "vuex";
export default {
  data() {
    return {

    };
  },
  computed: {
    // {width: 1731, height: 848}
    ...mapGetters({
      window_size_info: "get_window_size_info"
    })
  },
  methods: {
    rebuild_tablecolumns_config(tablecolumns_config) {
      let window_width_reference = 1745 - 80;
      // 当前 屏幕表格实际能占用宽度
      let ww =
        (this.window_size_info.width || window.innerWidth) -
        80 -
        tablecolumns_config.length -
        1;

      let fixedwdth = 0;
      let unfixedwidth = 0;

      tablecolumns_config.map(x => {
        if (x.width == 0) {
          let message =
            " 注意   当前使用的 表格宽度样式逻辑，必须保证有默认宽度设置！";

          this.$q.notify({
            message: `${message}`,
            color: "negative"
          });
          x.width = 100;
        }
        if (x.fixed == 1) {
          fixedwdth += x.width;
        } else {
          unfixedwidth += x.width;
        }
      });

      // console.log("表格宽度 计算");
      // console.log("定宽    :   " + fixedwdth);
      // console.log("不定宽    :   " + unfixedwidth);
      //  实际的 参数配置总和 可能并不等于 1920 -60  需要 计算  不定宽部分实际使用宽度与设置数值之间比率
      //  此处存在可能 原始列数的 宽度配置本身  之和  就超过了 屏幕 的 宽度 必须出现 滚动条
      let rate = 1;
      let sheji_w =
        window_width_reference - 80 - tablecolumns_config.length - 1;
      if (fixedwdth + unfixedwidth < sheji_w) {
        // 本身 在设计之时 全屏情况下 不会出现滚动条
        // 设计之时 不定宽 宽度之和 / 当前
        // 当前 表格 不定宽 实际可用 宽度 / 设计的 不定宽的 宽度  一般大于1
        rate = (ww - fixedwdth) / unfixedwidth;
      }

      let real_setted_width = []; // 实际设值，设置过的数值
      tablecolumns_config.map(x => {
        let obj = {
          // width:'px',
          // maxWidth:'px',
          // minWidth:'px',
        };
        let xw = 0;
        // fixed: 1, width: 30, min: 30
        if (x.fixed == 1) {
          xw = x.width;
          real_setted_width.push(xw);
          obj = {
            width: xw + "px",
            maxWidth: xw + "px",
            minWidth: xw + "px"
          };
        } else {
          xw = parseInt(x.width * rate);

          let r_s_w =0;

            r_s_w =xw;

          obj = {
            width: r_s_w + "px",
            minWidth: r_s_w + "px"
          };

          real_setted_width.push(r_s_w);
        }

        x.style = obj;
      });

      // 用最后 补正 parseInt 丢弃的 小数部分 组成的 几个像素的差异
      // 有可能
      let index = this.$lodash.findLastIndex(tablecolumns_config, o => {
        return o.fixed != 1;
      });
      if (index != -1) {
        let last_un_finxed_obj = tablecolumns_config[index];
        let last_un_finxed_obj_real_width = Math.max(
          ww - this.$lodash.sum(real_setted_width),
          last_un_finxed_obj.width
        );
        real_setted_width[index]=last_un_finxed_obj_real_width

        last_un_finxed_obj.style = {
          width: last_un_finxed_obj_real_width + "px",
          minWidth: last_un_finxed_obj_real_width + "px"
        };
      }

      console.log("加工后的 表格宽度配置表 ");
      console.log(tablecolumns_config);




      return tablecolumns_config;
    },

    _compute_table_col_width(tablecolumns_config, name) {
      // 需要引入
      let window_width_reference = 1920;
      let ww = this.window_size_info.width;

      let col_n_config = this.$lodash.find(tablecolumns_config, o => {
        return o.name == name;
      });
      console.log(window_width_reference)
      if (col_n_config) {
        return col_n_config.style;
      } else {
        let message = " 注意 你的表格列表 索引名称，在配置项中并不存在  "+ name;

        this.$q.notify({
          message: `${message}`,
          color: "negative"
        });
      }
    },

    _compute_table_col_width_return_num(tablecolumns_config, name, str, num) {
      // 需要引入
      let window_width_reference = 1920;
      let ww = this.window_size_info.width;
      let col_n_config = this.$lodash.find(tablecolumns_config, o => {
        return o.name == name;
      });
      let return_width = 100;
      // {width:110,min:110},
      if (col_n_config) {
        if (col_n_config.width == 0) {
          // return `width:auto; !important`;
          // return `width:auto; min-width:${col_n_config.min}px;`;
          return_width = 100;
        } else {
          if (col_n_config.fixed == 1) {
            // return `width:${col_n_config.width}px; !important`;
            return_width = col_n_config.width;
          } else {
            return_width = parseInt(
              (col_n_config.width / window_width_reference) * ww
            );

            // return `width:${real_w}px; !important`;
          }
        }
      }
      console.log(str,num)
      return return_width;
    },

    compute_table_col_width(name) {
      return this._compute_table_col_width(this.tablecolumns, name);
    }
  }
};
