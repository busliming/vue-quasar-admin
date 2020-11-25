/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-06 17:21
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_3;
let prefix1 = process.env.API_PREFIX_3;
let prefix2 = process.env.API_PREFIX_4;
//用户投注统计
export const query_userbetlist_byTime = (
  params,
  url = "/order/user/queryUserBetListByTime"
  ) => axios.post(`${prefix1}${url}`, params );

//用户注单列表
export const query_userorderlist = (
  params,
  url = "/order/user/queryUserOrderList"
  ) => axios.post(`${prefix}${url}`, params );

//注单查询--注单列表
export const post_order_user_queryTicketList = (
  params,
  url = "/order/user/queryTicketList"
  ) => axios.post(`${prefix}${url}`, params );

  
//用户信息  10711
export const get_order_user_detail = (params, url = "/order/user/detail") =>
  axios.get(`${prefix}${url}`, { params: { ...params } });
//注单中心统计接口
export const post_queryStatistics = (
  params,
  url = "/order/user/getStatistics"
) => axios.post(`${prefix}${url}`, params);

//用户投注管理查询(port:10711)]
export const post_order_user_queryUserBetList = (
  params,
  url = "/order/user/queryUserBetList"
) => axios.post(`${prefix}${url}`, params);

// 最近12个月的统计 10716
export const get_order_user_orderMonth = (params, url = "/order/user/orderMonth") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });

// 盈利率
export const get_order_user_profit = (params, url = "/order/user/profit") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });

// 某月的统计
export const get_order_user_orderMonth_days = (params, url = "/order/user/orderMonth/days") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });


// 联赛等级查询
export const get_order_user_queryTournamentList = (params, url = "/order/user/queryTournamentList") =>
  axios.get(`${prefix1}${url}`, { params: { ...params } });


//玩法列表
export const post_order_user_queryHotPlayName = (params, url = "/order/user/queryHotPlayName") =>
  axios.post(`${prefix}${url}`, params);

//商户名称
export const post_manage_merchant_queryMerchantList = (params, url = "/manage/merchant/queryMerchantList") =>
  axios.post(`${prefix2}${url}`, params);

//商户名称-树形结构
export const post_manage_merchant_queryMerchantListTree = (params, url = "/manage/merchant/queryMerchantListTree") =>
  axios.post(`${prefix2}${url}`, params);