/*
 * @Desc: 
 * @Date: 2020-02-25 16:10:38
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-08 20:14:29
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_4;

//商户费率设置-新增//
export const post_manage_merchantRate_add = (
  params,
  url = "/manage/merchantRate/add"
) => axios.post(`${prefix}${url}`, params);

//商户费率设置-修改//
export const post_manage_merchantRate_update = (
  params,
  url = "/manage/merchantRate/update"
) => axios.post(`${prefix}${url}`, params);

//商户费率设置--查询列表//
export const post_set_merchantrate_query = (
  params,
  url = "/manage/merchantRate/queryList"
) => axios.post(`${prefix}${url}`, params);

//商户等级查询--下拉列表无分页//
export const get_manage_merchantLevel_queryLevelList = (
  params,
  url = "/manage/merchantLevel/queryLevelList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//查询费率列表无分页(port:10712)//
export const get_manage_merchantRate_queryRateList = (
  params,
  url = "/manage/merchantRate/queryRateList"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//商户等级设置--查询费率对象//
export const get_manage_merchantLevel_getMerchantLevel = (
  params,
  url = "/manage/merchantLevel/getMerchantLevel"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//商户等级设置--查询//
export const post_manage_merchantLevel_queryList = (
  params,
  url = "/manage/merchantLevel/queryList"
) => axios.post(`${prefix}${url}`, params);

//商户等级设置--修改//
export const post_manage_merchantLevel_update = (
  params,
  url = "/manage/merchantLevel/update"
) => axios.post(`${prefix}${url}`, params);

//商户等级设置--新增//
export const post_manage_merchantLevel_add = (
  params,
  url = "/manage/merchantLevel/add"
) => axios.post(`${prefix}${url}`, params);

// 商务列表  3-12
export const get_manage_merchant_admin_list = (
  params,
  url = "/manage/merchant/admin/list"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//商户等级设置--详情查询
export const post_manage_merchantLevel_byid = (params, url = "/manage/merchantLevel") =>
  axios.post(`${prefix}${url}/${params.id}`);


//日志查询
export const post_manage_log_findLog = (
  params,
  url = "/manage/log/findLog"
) => axios.post(`${prefix}${url}`, params);

//日志查询-日志页面下拉查询接口
export const get_manage_log_getLogPages = (
  params,
  url = "/manage/log/getLogPages"
) => axios.get(`${prefix}${url}`, { params: { ...params } });

//日志查询-日志页面操作类型查询接口
export const get_manage_log_getLogTypes = (
  params,
  url = "/manage/log/getLogTypes"
) => axios.get(`${prefix}${url}`, { params: { ...params } });


