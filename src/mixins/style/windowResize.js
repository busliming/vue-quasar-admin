/**
 * 因为 panda 项目 目标是 输出 PC 端 exe 软件 界面 效果
 * 特点是 是 浏览器高度 或者 视窗高度定高 ，内部滚动
 * 产生问题是 每次 视口大小改变 界面就需要 重构 此时需要监听 浏览器事件
 *
 * 需要重绘的两种页面场景
 * 1. 表格页面 分为  左侧菜单栏 中间表格 区域  右侧详情区域
 * 2.编辑页面  分为  左侧菜单栏  左侧列表  中间 编辑区域，右侧详情区域
 *
 * 修改人: @jinnian
 * 注释时间: 2019-10-19 10:00:26
 */


import { mapGetters } from "vuex";
export default {
  data() {
    return {
      scroll_area_height: "",     // 滚动区域的高度
      left_component_style: {},   // 编辑页面 左侧列表区域
      middle_component_style: {}, // 编辑页面 中间编辑区域
      right_component_style: {},  // 列表或者编辑页面 右侧详情区域
      main_component_style:{},    // 列表页面 表格所在主要区域
      table_container_style: {},   // 表格容器的宽度
    };
  },
  computed: {
    // {width: 1731, height: 848}
    ...mapGetters({
      window_size_info: "get_window_size_info"
    })
  },
  mounted() {
    this.when_window_size_info_change();
  },

  watch: {
    window_size_info() {

      this.when_window_size_info_change();
    }
  },
  methods: {
    when_window_size_info_change() {
        /**
         * 编辑页面 左中右
         * 列表页面 表格区域  滚动区域 右侧 详情
         * 单个组件内 的 滚动区域
         *
         *
         *
         */

      this.compute_scrollarea_style();        //  在不同的 组件内 对应不同的 区域
      this.compute_middle_component_style();  // 编辑页面 中间区域
      this.compute_left_component_style();    // 编辑页面  左侧区域
      this.compute_right_component_style();   // 页面通用  右侧区域
      this.compute_main_component_style();   // 列表页面  表格区域
      this.compute_table_container_style();   //列表页面   表格容器
    },
    // compute_main_component_style(){},
    compute_scrollarea_style(){},
    // compute_left_component_style() {},
    // compute_middle_component_style() {},
    // compute_right_component_style() {},
    compute_main_component_style(){
      let we = (this.window_size_info.width || window.innerWidth) - 210;
      let wh = this.window_size_info.height || window.innerHeight;
      let wc = wh - 104;   //顶部导航栏高度   一改就会循环计算，切记不要随意改！！！！！！！！！！


      let obj = {
        width: we + "px",
        maxWidth: we + "px",
        minWidth: 600 + "px",
        height: wc + "px",
        maxHeight: wc + "px"
      };
      if (!this.test) {
        this.test = obj
      }
      this.main_component_style = obj

      return obj;
    },
    compute_middle_component_style() {
      let we = (this.window_size_info.width || window.innerWidth) - 60 - 300;
      let wh = this.window_size_info.height || window.innerHeight;
      let wc = wh - 36 - 60 - 30;

      if (this.showrightdetail==1) {
        we -= 350;
      }
      let obj = {
        width: we + "px",
        maxWidth: we + "px",
        minWidth: 600 + "px",
        height: wc + "px",
        maxHeight: wc + "px"
      };

      this.middle_component_style = obj;

      return obj;
    },
    compute_left_component_style() {
      let wh = this.window_size_info.height || window.innerHeight;
      let wc = wh - 36 - 60 ;
      let obj = {
        height: wc + "px",
        maxHeight: wc + "px"
      };
      this.left_component_style = obj;
      console.log( " compute_left_component_style()" );
      console.log(obj );
      return obj;
    },
    compute_right_component_style() {
      let wh = this.window_size_info.height || window.innerHeight;
      let wc = wh - 36 - 30 - 30;
      let obj = {
        height: wc + "px",
        maxHeight: wc + "px"
      };
      this.right_component_style = obj;
      return obj;
    },
    compute_table_container_style(){
      let we = (this.window_size_info.width || window.innerWidth) - 60 ;

      let obj = {
        width: we + "px",
        maxWidth: we + "px",
        minWidth: we + "px",

      };

      this.table_container_style = obj;

      return obj;
    }


  }
};
