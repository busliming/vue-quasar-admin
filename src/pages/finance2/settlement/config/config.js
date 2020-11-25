/*
 * @Desc:
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: nati
 * @LastEditTime : 2020-02-27 15:35:29
 */
export const tablecolumns_config = [
  {
    title: "序号",
    width: 60,
    dataIndex: "_index",
    key: "_index",
    align: "center",
    fixed: "left"
  },
  {
    title: "账期",
    width: 90,
    dataIndex: "billTime",
    key: "billTime",
    align: "center",
    fixed: "left",
    scopedSlots: { customRender: "billTime" }
  },

  {
    title: "商户名称",
    dataIndex: "merchantName",
    key: "merchantName",
    width: 100,
    align: "center",
    scopedSlots: { customRender: "merchantName" }
  },
  {
    title: "商户类型",
    dataIndex: "merchantType",
    key: "merchantType",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "merchantType" }
  },
  {
    title: "结算币种",
    dataIndex: "settleCurrency",
    key: "settleCurrency",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "settleCurrency" }
  },
  {
    title: "账单金额",
    dataIndex: "billAmount",
    key: "billAmount",
    width: 110,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "billAmount" }
  },
  {
    title: "账单金额(CNY)",
    dataIndex: "billAmount1",
    key: "billAmount1",
    width: 150,
    align: "center",
    scopedSlots: { customRender: "billAmount1" }
  },
  {
    title: "投注金额",
    dataIndex: "betAmount",
    key: "betAmount",
    width: 110,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "betAmount" }
  },
  {
    title: "投注金额(CNY)",
    dataIndex: "betAmount1",
    key: "betAmount1",
    width: 150,
    align: "center",
    scopedSlots: { customRender: "betAmount1" }
  },
  {
    title: "盈利金额",
    dataIndex: "profitAmount",
    key: "profitAmount",
    width: 110,
    align: "center",
    sorter: true,
    scopedSlots: { customRender: "profitAmount" }
  },
  {
    title: "盈利金额(CNY)",
    dataIndex: "profitAmount1",
    key: "profitAmount1",
    width: 150,
    align: "center",
    scopedSlots: { customRender: "profitAmount1" }
  },
  {
    title: "分成方式",
    dataIndex: "splitType",
    key: "splitType",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "splitType" }
  },
  {
    title: "标准费率",
    dataIndex: "standardRate",
    key: "standardRate",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "standardRate" }
  },
  {
    title: "执行费率",
    dataIndex: "executionRate",
    key: "executionRate",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "executionRate" }
  },
  {
    title: "调整额",
    dataIndex: "adjustment",
    key: "adjustment",
    width: 90,
    align: "center",
    scopedSlots: { customRender: "adjustment" }
  },
  {
    title: "操作",
    key: "action",
    width: 100,
    fixed: "right",
    scopedSlots: { customRender: "action" },
    align: "center"
  },
  {
    title: "二级商户",
    dataIndex: "level",
    key: "level",
    width: 80,
    fixed: "right",
    scopedSlots: { customRender: "secondaryMerchant" },
    align: "center"
  }
];
