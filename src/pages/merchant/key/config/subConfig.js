/*
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 子级弹窗表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/merchant/key/config/subConfig.js
 */

export const subConfig = [
  {
    
    title: "序号",
    width: 50,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "商户名称",
    width: 180,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots: { customRender: "merchantName" },
  },
  {
    title: "渠道商户",
    width: 180,
    dataIndex: "parentName",
    key: "parentName",
    align: "left",
    scopedSlots: { customRender: "parentName" },
  },
  {
    title: "商户有效期",
    dataIndex: "startTime",
    key: "startTime",
    width: 190,
    align: "left",
    scopedSlots: { customRender: "startTime" },
  },
  {
    title: "证书状态",
    dataIndex: "status",
    key: "status",
    width: 90,
    align: "left",
    scopedSlots: { customRender: "status" },
  },
  {
    title: "证书信息",
    dataIndex: "key",
    key: "key",
    width: 300,
    align: "left"
  },
  {
    title: "更新人",
    dataIndex: "updatedBy",
    key: "updatedBy",
    width: 80,
    align: "left"
  },
  {
    title: "最后更新时间",
    dataIndex: "updateTime",
    key: "updateTime",
    width: 150,
    align: "left"
  },
  {
    title: "操作",
    key: "operation",
    fixed: "right",
    width: 70,
    scopedSlots: { customRender: "action" },
    align: "center"
  }
];

