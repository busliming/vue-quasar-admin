/*
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-04-04 14:04:46
 */
import * as api_home from "src/api/module/home/index.js"
import * as api_log from "src/api/module/log/index.js"
import * as api_login from "src/api/module/login/index.js"
import * as api_account from "src/api/module/account/index.js"
import * as api_merchant from "src/api/module/merchant/index.js"
import * as api_public from "src/api/module/public/index.js"
import * as api_base from "src/api/module/base/index.js"
import * as api_user from "src/api/module/user/index.js"
import * as api_finance from "src/api/module/finance/index.js"
import * as api_export from "src/api/module/export/index.js"
import * as api_message from "src/api/module/message/index.js"

import axios from 'src/api/common/axioswarpper.js'
const FILE_PREFIX =axios.prototype.API_PREFIX_FILE_REAL_YEWU
const FILE_PREFIX_FINANCE =  axios.prototype.API_PREFIX_FILE_FINANCE

export  {
   api_home,  //首页模块
   api_login,  //登录模块
   api_log,   //日志模块
   api_account,  //账号管理模块
   api_merchant,// 商户模块
   api_public,//公共模块
   api_base,// 基础
   api_user,// 用户
   api_finance,// 财务中心
   api_export,// 报表导出
   api_message, //消息中心
   FILE_PREFIX,
   FILE_PREFIX_FINANCE
};

