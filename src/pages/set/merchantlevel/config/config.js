/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-12 13:52:55
 */
const position = "right";
export const tablecolumns_config = [
  {
    title: "等级",
    width: 80,
    dataIndex: "level",
    key: "level",
    fixed: "left",
    align: "center",
    scopedSlots: { customRender: "level" }
  },
  {
    title: "计算标准",
    width: 110,
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
    width: 180,
    align: position,
    sorter: (a, b) => a.paymentCycle - b.paymentCycle,
    scopedSlots: { customRender: "paymentCycle" }
  },

  {
    title: "会员费(CNY)",
    dataIndex: "vipAmount",
    key: "vipAmount",
    width: 180,
    sorter: (a, b) => a.vipAmount - b.vipAmount,
    align: position,
    scopedSlots: { customRender: "vipAmount" }
  },
  {
    title: "技术服务费(CNY)",
    dataIndex: "techniqueAmount",
    key: "techniqueAmount",
    width: 180,
    align: position,
    sorter: (a, b) => a.techniqueAmount - b.techniqueAmount,
    scopedSlots: { customRender: "techniqueAmount" }
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
    // fixed: 'right',
    align: 'center'
  },
  {
    title: "操作",
    key: "action",
    fixed: "right",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];
