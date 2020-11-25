/*
 * @Author: Nice
 * @Date: 2020-09-04 11:20:31
 * @Description: 交易记录表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/data/recordquery/config/user_record_config copy.js
 */

export const userRecordConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "交易时间",
    dataIndex: "createTime",
    key: "5",
    width: 150,
    align: "left",
    sorter: true, 
    scopedSlots:{customRender:"createTime"},
  },
  {
    title: "交易号",
    width: 130,
    dataIndex: "transferId",
    key: "transferId",
    align: "left",
    scopedSlots:{customRender:"transferId"},
  },
  {
    title: "用户名",
    width: 100,
    dataIndex: "userName",
    key: "userName",
    align: "left",
    scopedSlots:{customRender:"userName"},
  },
  {
    title: "用户ID",
    width: 150,
    dataIndex: "userId",
    key: "userId",
    align: "left",
    scopedSlots:{customRender:"userId"},
  },
  {
    title: "所属商户",
    width: 100,
    dataIndex: "merchantName",
    key: "merchantName",
    align: "left",
    scopedSlots:{customRender:"merchantName"},
  },
  {
    title: "交易类型",
    width: 100,
    dataIndex: "bizType",
    key: "bizType",
    align: "center",
    scopedSlots:{customRender:"bizType"},
  },
  {
    title: "交易金额",
    dataIndex: "changeAmount",
    key: "changeAmount",
    width: 160,
    align: "right",
    scopedSlots:{customRender:"changeAmount"},
  },
  {
    title: "交易前余额",
    dataIndex: "beforeTransfer",
    key: "beforeTransfer",
    width: 160,
    align: "right",
    scopedSlots:{customRender:"beforeTransfer"},
  },
  {
    title: "交易后余额",
    dataIndex: "afterTransfer",
    key: "afterTransfer",
    width: 160,
    scopedSlots:{customRender:"afterTransfer"},
    align: "right",
  },
  {
    title: "注单号",
    dataIndex: "orderNo",
    key: "orderNo",
    width: 130,
    align: "right",
    scopedSlots:{customRender:"orderNo"},
  },
  {
    title: "交易结果",
    dataIndex: "delFlag",
    key: "delFlag",
    width: 150,
    align: "right",
    scopedSlots:{customRender:"delFlag"},
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
    width: 100,
    align: "center",
    scopedSlots:{customRender:"action"},
  }
];

