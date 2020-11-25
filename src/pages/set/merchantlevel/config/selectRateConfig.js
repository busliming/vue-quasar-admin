/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 21:17:58
 */
const position = 'left';
export const selectRateConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "计算标准",
    width: 100,
    dataIndex: "computingStandard",
    key: "computingStandard",
    align: position,
    scopedSlots: { customRender: "computingStandard" },
  },
  {
    title: "金额范围(CNY)",
    dataIndex: "rangeAmountBegin",
    key: "rangeAmountBegin",
    width: 150,
    align: position,
    sorter: true,
    scopedSlots: { customRender: "rangeAmountBegin" },
  },
  {
    title: "平台费率",
    dataIndex: "terraceRate",
    key: "terraceRate",
    width: 100,
    align: position,
    sorter: true,
    scopedSlots: { customRender: "terraceRate" },
  },
  {
    title: "缴纳周期",
    dataIndex: "paymentCycle",
    key: "paymentCycle",
    width: 100,
    align: position,
    sorter: true,
    scopedSlots: { customRender: "paymentCycle" },
  },
  {
    title: "最后更新时间",
    dataIndex: "modifyTime",
    key: "modifyTime",
    width: 160,
    align: position,
    sorter: true,
    scopedSlots: { customRender: "modifyTime" },
  },
  {
    title: "最后更新人",
    dataIndex: "modifyUser",
    key: "modifyUser",
    width: 140,
    align: 'right',
  },
  {
    title: "操作",
    key: "operation",
    width: 150,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

