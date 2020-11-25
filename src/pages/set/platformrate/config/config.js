/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 13:45:22
 */
const position = "right";
export const tablecolumns_config = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    fixed: "left",
    align: "center"
  },
  {
    title: "计算标准",
    width: 130,
    dataIndex: "computingStandard",
    key: "computingStandard",
    fixed: "left",
    align: position,
    scopedSlots: { customRender: "computingStandard" }
  },
  {
    title: "金额范围(CNY)",
    dataIndex: "rangeAmountBegin",
    key: "rangeAmountBegin",
    width: 240,
    align: position,
    sorter: (a, b) => a.rangeAmountBegin - b.rangeAmountBegin,
    scopedSlots: { customRender: "rangeAmountBegin" }
  },
  {
    title: "平台费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 150,
    align: position,
    sorter: (a, b) => a.terraceRate - b.terraceRate,
    scopedSlots: { customRender: "terraceRate" }
  },
  {
    title: "缴纳周期",
    dataIndex: "paymentCycle",
    key: "paymentCycle",
    width: 200,
    align: position,
    sorter: (a, b) => a.paymentCycle - b.paymentCycle,
    scopedSlots: { customRender: "paymentCycle" }
  },
  {
    title: "备注信息",
    dataIndex: "remarks",
    key: "remarks",
    width: 300,
    align: position,
    scopedSlots: { customRender: "remarks" }
  },
  {
    title: "最后更新时间",
    dataIndex: "modifyTime",
    key: "modifyTime",
    width: 200,
    align: position,
    sorter: (a, b) => a.modifyTime - b.modifyTime,
    scopedSlots: { customRender: "modifyTime" }
  },
  {
    title: "最后更新人",
    dataIndex: "modifyUser",
    key: "modifyUser",
    // width: 130,
    align: "center"
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 160,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
