
export const noCnyConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: "left"
  },
  {
    title: "账期",
    width: 110,
    dataIndex: "billTime",
    key: "billTime",
    align: "center",
    scopedSlots: { customRender: "billTime" }
  },

  {
    title: "商户名称",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 110,
    align: "center",
    scopedSlots: { customRender: "merchantName" }
  },
  {
    title: "商户类型",
    dataIndex: "merchantType",
    key: "merchantType",
    width: 100,
    align: "center",
    scopedSlots: { customRender: "merchantType" }
  },
  {
    title: "结算币种",
    dataIndex: "settleCurrency",
    key: "settleCurrency",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "settleCurrency" }
  },
  {
    title: "账单金额",
    dataIndex: "billAmount",
    key: "billAmount",
    width: 160,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "billAmount" }
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 160,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "betAmount" }
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 160,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "profitAmount" }
  },
  {
    title: "分成方式",
    dataIndex: "splitType",
    key: "splitType",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "splitType" }
  },
  {
    title: "标准费率",
    dataIndex: "standardRate",
    key: "standardRate",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "standardRate" }
  },
  {
    title: "执行费率",
    dataIndex: "executionRate",
    key: "executionRate",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "executionRate" }
  },
  {
    title: "调整额",
    dataIndex: "adjustment",
    key: "adjustment",
    width: 120,
    align: "center",
    scopedSlots: { customRender: "adjustment" }
  },
  {
    title: "操作",
    key: "action",
    width: 120,
    fixed: "right",
    scopedSlots: { customRender: "action" },
    align: "center"
  },
  {
    title: "二级商户",
    dataIndex: "level",
    key: "level",
    width: 100,
    fixed: "right",
    scopedSlots: { customRender: "secondaryMerchant" },
    align: "center"
  }
];
