/*
 * @Desc: 
 * @Date: 2019-12-25 15:49:45
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-30 15:13:39
 */
/**
 * 表格的翻页器和翻页器实际实现脱离
 * 只接收翻页器组件派发出的事件，然后触发当前列表页面请求
 *
 * 表格父组件  接收 翻页器传递的
 *
 * 请勿将 翻页器 插件 和此 表格插件 引入到同一个组件内
 *
 * 输入  跟随子组件事件 接收 pageSize  currentPage   pagination
 * 输出  无
 * 自成闭环系统
 *
 *
 * 对于 表格请求 可能出现 三种 情况
 * 1. 必须强制刷新，页数 调整为1    例如查询条件改变       属于 非首次请求
 * 2.必须强制刷新 ，页数 为当前     例如 生成联赛ID         属于 非首次请求
 * 3. 正常的翻页请求，但是不能重复   例如屏蔽 页面加载瞬间 多次请求同页数据    属于 首次请求
 *
 *
 *
 *
 * 修改人: @jinnian
 * 注释时间: 2019-09-04 11:09:43
 */
/***
 *
 * 考虑到 原有 表格页面  因为 各种要求 最终  导致 多个 入口 触发页面请问 方法
 * 造成 各种  BUG
 * 因此  统一入口
 * 把真正的 触发器 入口 放在  pagation  内部  将 表格的  queryform 融入到此处
 *
 * queryfrom   分为 表格版本的 queryform 和 一般版本的
 *
 *queryform  和 翻页器 合一  翻页器的 值 从 queryform  取舍
 *
 * 缓存操作   只在 进入页面 取值  ，只在  离开页面  赋值
 *set_reset_query(2);  // 派发事件  对于指定订阅的数据 做出对应修改  例如  数据源这里 , 重置不是清空 ，有自己的 默认全选
 *
 * 牵扯  查询条件组件 存在 反向 回显 ，需求 ，肯定会造成 同样参数多次请求  采用json  字符串对比方式， 简单 评定  避免同条件多次请求
 *
 *
 * 修改人: @jinnian
 * 注释时间: 2019-09-19 09:57:32
 */

import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      pageSize_key: "pageSize",
      currentPage_key: "currentPage",
      queryform_form: {}, //  实际使用的
      queryform_module: {
        //  模板  对于表格页面  必须有这个 至少  有  select_sportId   pageSize  currentPage
        // pageSize: 50,
        // currentPage: 1
      },
      total: 0, // 总条目数   后台返回   传值给 翻页器使用
      tabledata_can_request: true, // 只是为了防止多次点击 连续请求
      request_currentPage: -1,
      data_label: " ", // 此处设置无数据时候的显示值为空
      data_label_true: "Sorry，没有找到您想要的结果，请更换查询条件！",
      show_table_no_data: true,
    };
  },

  computed: {
    ...mapGetters({
      resetCurrentPage: "get_resetCurrentPage"
    })
    // 无数据时的界面控制
  },
  watch: {
    tabledata(val) {
      if (Array.isArray(val) && val.length > 0) {
        this.show_table_no_data = false;
      } else {
        // this.set_showrightdetail({
        //   routename: this.$route.name,
        //   value: 2
        // });
        this.show_table_no_data = true;
      }
    },
  },

  methods: {
    ...mapActions([
      "set_resetCurrentPage",
      // "set_showrightdetail"
    ]),
    init_tabledata_before() {
      this.tabledata_loading = true;
      this.tabledata_can_request = false;
    },
    init_tabledata_after() {
      this.tabledata_loading = false;
      this.tabledata_can_request = true;
    },
    tosearch_queryform() {
      /**
       * 重新从第一页请求  ,现在先默认 点击搜索 就是  更改了 查询条件 ，后期在做优化
       */
      if (
        !this.flag && 
        this.queryform_form[this.currentPage_key] &&
        this.queryform_form[this.currentPage_key] !== 1
      ) {
        this.set_resetCurrentPage();
      } else {
        this.init_tabledata();
      }
      this.flag = false
    },
    init_query() {
      this.queryform_form = this.$lodash.cloneDeep(this.queryform_module)
    },
    handle_pagination_change(val) {
      console.log("父级 表格接收到的  this.pagination=val ");
      console.log(val);
      /**
       * 此处 值的传递 完全只是为了  表格显示不做实际请求 参照
       */
      // this.pagination = val;
    },
    init_tabledata_with_pageSize_and_currentPage(pageSize, currentPage) {
      console.log(
        " init_tabledata_with_pageSize_and_currentPage(pageSize, currentPage) ",
        currentPage
      );
      this.flag = true
      this.queryform_form[this.pageSize_key] = pageSize;
      this.queryform_form[this.currentPage_key] = currentPage;
    },

  },

  created() {
    this.init_query()
  },
};
