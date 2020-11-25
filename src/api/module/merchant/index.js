/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-18 14:58
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;
let prefix3 = process.env.API_PREFIX_3;
// let url_prefix =  process.env.API_PREFIX_URL_PREFIX+"/login";

// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params)
// export const get1 = (params, url) => axios.get(`${prefix}${url}`, { params: { ...params } })
//商户报表列表
export const query_merchantlist = (params, url = "/order/merchant/merchantList") =>
  axios.post(`${prefix3}${url}`, params);
//赛事投注统计
export const query_MatchStatisticList = (params, url = "/order/match/queryMatchStatisticList") =>
  axios.post(`${prefix3}${url}`, params);
// 玩法投注统计
export const query_PlayStatisticList = (
  params,
  url = "/order/match/queryPlayStatisticList"
) => axios.post(`${prefix3}${url}`, params);
//商户列表
export const get_manage_merchant_list = (
  params,
  url = "/manage/merchant/list"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//生成管理员密码
export const get_manage_merchant_getPassword = (
  params,
  url = "/manage/merchant/getPassword"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//查询key列表
export const get_manage_merchant_queryKeyList = (
  params,
  url = "/manage/merchant/queryKeyList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//生成KEY
export const get_manage_merchant_generateKey = (
  params,
  url = "/manage/merchant/generateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//设置管理员
export const post_manage_merchant_admin_create = (
  params,
  url = "/manage/merchant/admin/create"
) => axios.post(`${prefix}${url}`, params, { type: 1 });

//商户详情
export const get_manage_merchant_byid = (params, url = "/manage/merchant") =>
  axios.get(`${prefix}${url}/${params.id}`);

//修改商户
export const post_manage_merchant_update = (
  params,
  url = "/manage/merchant/update"
) => axios.post(`${prefix}${url}`, params);

//增加商户
export const post_manage_merchant_create = (
  params,
  url = "/manage/merchant/create"
) => axios.post(`${prefix}${url}`, params);

//修改管理员密码
export const post_manage_merchant_password_updates = (
  params,
  url = "/manage/merchant/password/update"
) => axios.post(`${prefix}${url}`, params, { type: 5 });

//修改商户状态
export const get_manage_merchant_updateMerchantStatus = (
  params,
  url = "/manage/merchant/updateMerchantStatus"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//修改KEY
export const get_manage_merchant_updateKey = (
  params,
  url = "/manage/merchant/updateKey"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//商户中心-投注用户管理-投注用户详情
export const get_order_user_getUserDetail = (params, url = "/order/user/getUserDetail") =>
  axios.get(`${prefix3}${url}`, { params: { ...params } });

//商户中心-投注用户管理-投注用户详情-账变记录
export const post_order_user_queryTransferList = (
  params,
  url = "/order/user/queryUserTransferList"
) => axios.post(`${prefix3}${url}`, params);


//数据中心-交易记录查询-账变记录
export const post_manage_account_findAccountHistory = (
  params,
  url = "/order/account/findAccountHistory"
) => axios.post(`${prefix3}${url}`, params);

//数据中心-交易记录查询-交易记录
export const post_manage_account_findRecord = (
  params,
  url = "/order/account/findRecord"
) => axios.post(`${prefix3}${url}`, params);


//商户中心-商户管理--ip设置
export const post_manage_merchant_update_ip = (
  params,
  url = "/manage/merchant/update/ip"
) => axios.post(`${prefix}${url}`, params);
