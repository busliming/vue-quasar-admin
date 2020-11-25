/*
 * @Desc:
 * @Date: 2019-12-28 20:59:34
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-10 12:17:20
 */
import axios from "src/api/common/axioswarpper.js";

let prefix = process.env.API_PREFIX_1;
let url_prefix = process.env.API_PREFIX_URL_PREFIX+"/sysUser";


//查询账号列表
export const getFindListByPage = (
  params,
  url = "/findListByPage"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 查询部门列表
export const getShowOrgList = (
  params,
  url = "/showOrgList1"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 查询后台列表
export const getShowAppList = (
  params,
  url = "/showAppList"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } } );

// 添加账号信息
export const postAddAccount = (
  params,
  url = "/save"
) => axios.post(`${prefix}${url_prefix}${url}`, params );

// 验证用户账号是否存在
export const getByUserCode = (
  params,
  url = "/getByUserCode"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 查询账号信息
export const getUserInfo = (
  params,
  url = "/findById"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

// 修改账号信息
export const postUpdateAccount = (
  params,
  url = "/update"
) => axios.post(`${prefix}${url_prefix}${url}`, params );

// 账号启用/停用
export const postUpdateByEnabled = (
  params,
  url = "/updateByEnabled"
) => axios.post(`${prefix}${url_prefix}${url}`, params );

//查询平台所有角色信息
export const getAllAppRole = (
  params,
  url = "/showAppRole"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

//查询用户当前平台角色信息
export const getCurrentUserAppRole = (
  params,
  url = "/showUserRole"
) => axios.get(`${prefix}${url_prefix}${url}`, { params: { ...params } });

//账号绑定角色
export const postUpdateUserRole = (
  params,
  url = "/updateUserRole"
) => axios.post(`${prefix}${url_prefix}${url}`, params );
