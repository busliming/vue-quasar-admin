/*
 * @Author: Nice
 * @Date: 2020-05-29 17:29
 * @Description: 本月入驻商户信息-二级商户表格配置
 * @FilePath: /pandaToB端商户后台/src/pages/home/config/secondConfig.js
 */

const POSITION = 'left';
export const secondConfig = [
  {
    title: "序号",
    width: 80,
    dataIndex: "_index",
    key: "_index",
    align: "center"
  },
  {
    title: "商户名称",
    width: 120,
    dataIndex: "merchantName",
    key: "merchantName",
    align: POSITION,
    scopedSlots: { customRender: 'merchantName' },
  },
  {
    title: "上级商户",
    dataIndex: "parentName",
    width: 120,
    key: "parentName",
    align: POSITION,
    scopedSlots: { customRender: 'parentName' },
  },
  {
    title: "入驻时间",
    dataIndex: "createTime",
    key: "3",
    width: 130,
    align: POSITION,
    scopedSlots: { customRender: 'createTime' },
  },
  {
    title: "证书状态",
    dataIndex: "status",
    key: "4",
    width: 120,
    align: POSITION,
    scopedSlots: { customRender: 'status' },
  },
  {
    title: "管理员设置",
    dataIndex: "merchantAdmin",
    key: "5",
    width: 120,
    align: "center",
    scopedSlots: { customRender: 'merchantAdmin' },
  },
];

