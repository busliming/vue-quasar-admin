/**
 *
 * 修改人：@Nati
 * 注释时间:2020-01-06 17:37:34
 *
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_1;
let url_prefix = process.env.API_PREFIX_URL_PREFIX

// export const post1 = (params, url) => axios.post(`${prefix}${url}`, params);
// export const get1 = (params, url) =>
//   axios.get(`${prefix}${url}`, { params: { ...params } });


// 登录/登出日志记录
export const post_sysLoginLog_saveLog = (
  params,
  url = "/sysLoginLog/saveLog"
) => axios.post(`${prefix}${url}`, params);

// 登录/登出日志 带条件的分页查询
export const post_sysLoginLog_findListByPage = (
  params,
  url = "/sysLoginLog/findListByPage"
) => axios.post(`${prefix}${url_prefix}${url}`, params, {type: 5});

//   根据id检索登陆日志详情
export const get_sysLoginLog_findById = (
  params,
  url = "/sysLoginLog/findById"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });



// 操作日志记录
export const post_sysOperationLog_saveLog = (
  params,
  url = "/sysOperationLog/saveLog"
) => axios.post(`${prefix}${url_prefix}${url}`, params);

// 操作类型
export const getOperationTypes = (
  params,
  url = "/sysOperationLog/getOperationTypes"
  ) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 操作日志   带条件的分页查询
export const post_sysOperationLog_findListByPage = (
  params,
  url = "/sysOperationLog/findListByPage"
) => axios.post(`${prefix}${url_prefix}${url}`, params, {type: 5});

//  根据id检索操作日志详情
export const get_sysOperationLog_findById = (
  params,
  url = "/sysOperationLog/findById"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });
