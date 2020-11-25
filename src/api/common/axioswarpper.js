/*
 * @Desc:
 * @Date: 2019-12-28 20:55:00
 * @LastEditors: Nice
 * @LastEditTime: 2020-08-27 10:29:46
 */
/**
 * http配置
 */
import axios from "axios";
import { uid,Notify } from "quasar";
import { SessionStorage } from 'quasar'
import lodash from 'lodash'

/// 此段代码 目的 输出 HTTP 根域名 + WS 根域名  （两个都不带最后的斜线）
//  HTTP根域名（本地会走proxy代理，再转API域名）： axios.defaults.baseURL
//  HTTP根域名（本地不走proxy代理，直接API域名）： axios.prototype.HTTP_ROOT_DOMAIN
//  WS 根域名 ：axios.prototype.WS_ROOT_DOMAIN

if (process.env.NODE_ENV != "development") {
  // 生产环境 走   axios.defaults.baseURL 请求
  let api_prefix = process.env.API_DOMAIN_PREFIX;
  let arr = location.host.split(".");
  let api_domain = `${location.protocol}//${api_prefix}.${
    arr[arr.length - 2]
  }.${arr[arr.length - 1]}`;
  axios.defaults.baseURL = api_domain;
  axios.prototype.HTTP_ROOT_DOMAIN = api_domain;
  axios.prototype.WS_ROOT_DOMAIN = api_domain.replace("http", "ws");
} else {
  // 本地开发  走当前域名 + proxy 代理  axios.defaults.baseURL 使用默认配置
  axios.prototype.HTTP_ROOT_DOMAIN =process.env.CURRENT_REQUEST_DOMAIN;
  axios.prototype.WS_ROOT_DOMAIN = process.env.CURRENT_REQUEST_DOMAIN.replace(
    "http",
    "ws"
  );
}

/**
  * 在目前的所有场景下 以上代码输出 :
  *  axios.defaults.baseURL    :   http://api.aaa.com   或者  https://api.aaa.com
  * axios.prototype.WS_ROOT_DOMAIN   :  ws://api.aaa.com   或者  wss://api.aaa.com
  */

//  两个WS 服务
/**
 * 只能做参照，不要直接复制就用了
 * 线上环境  和 本地开发   process.env.API_PREFIX_7  拿到的 是  "fengkongws"
 * process.env.API_PREFIX_7:  fengkongws
 * process.env.API_PREFIX_3:   ronghews
 *
 */

// axios.prototype.WS_DOMAIN_FRNGKONG_1= axios.prototype.WS_ROOT_DOMAIN+'/'+process.env.API_PREFIX_7+'/rcsWebSockets'
// axios.prototype.WS_DOMAIN_RONGHE_1=axios.prototype.WS_ROOT_DOMAIN+'/'+process.env.API_PREFIX_3+'/realData/'
// 或者:  这里我推荐写死 减少 理解困难  （ 根本原因 ： 本地开发的时候 WS 没有走proxy代理,直接连接目标环境）
// 因为接口服务已基本稳定，前缀代理不会随便更改，
// 这里直接写死，在这个文件内维护也可以 ，其他地方使用 url: axios.prototype.WS_DOMAIN_FRNGKONG_1
// axios.prototype.WS_DOMAIN_FRNGKONG_1= axios.prototype.WS_ROOT_DOMAIN+'/'+'fengkongws'+'/rcsWebSockets'
// axios.prototype.WS_DOMAIN_RONGHE_1=axios.prototype.WS_ROOT_DOMAIN+'/'+'ronghews'+'/realData/'
// axios.prototype.WS_DOMAIN_YEWU_1=axios.prototype.WS_ROOT_DOMAIN+'/'+'yewuws'+'/push/'
// axios.prototype.WS_DOMAIN_YEWU_2=axios.prototype.WS_ROOT_DOMAIN+'/'+'yewuws2'+'/push/'
// axios.prototype.WS_DOMAIN_YEWU_3=axios.prototype.WS_ROOT_DOMAIN+'/'+'yewuws3'

//  和文件服务相关  不推荐写死（根本原因： 文件服务实际上走了本地proxy代理，方便联调）
//  关于 文件服务代码内部需要计算文件请求前缀的 使用 方式 (后面不带斜杠)
// axios.prototype.API_PREFIX_FILE_REAL=axios.defaults.baseURL+'/' +  process.env.API_PREFIX_FILE
//或者
// axios.prototype.API_PREFIX_FILE_REAL_RONGHE=axios.defaults.baseURL+'/' +  'file'

axios.prototype.API_PREFIX_FILE_REAL_YEWU=axios.prototype.HTTP_ROOT_DOMAIN+'/' +  'yewu9'+ "/manage/merchant/file/download?fileName=";
axios.prototype.API_PREFIX_FILE_FINANCE =axios.prototype.HTTP_ROOT_DOMAIN+'/' +  'yewu8'+ "/order/financeMonth/financeDayExport?financeDayId=";

// 后台项目的 登录谷歌身份验证器 APP 下载
// axios.prototype.API_PREFIX_APP_PREFIX =axios.defaults.baseURL+'/' + "yewu5"+'/v1/admin'
console.log(axios.defaults.baseURL,'aaa')
console.log(axios.prototype.HTTP_ROOT_DOMAIN,'bbb')

/**
 *  WS使用方式：
 *  参考这个示例
 *  import axios from 'src/api/common/axioswarpper.js'
 *  url: axios.prototype.WS_DOMAIN_FRNGKONG_1
 *
 *
 *  文件相关服务使用方式：
 *  非API 相关的JS  文件内---使用：
 *  import axios from 'src/api/common/axioswarpper.js'
 *  url: axios.prototype.API_PREFIX_FILE_REAL
 *  必须是api JS 文件内----使用：
 *  文件服务的axios 请求  不用区分 开发环境 以前的写法需要去掉 （注意必须是api JS 文件内）
 *  import axios from 'src/api/common/axioswarpper.js'
 *  api文件内之前写法（必须删除）： let prefix= process.env.NODE_ENV ==
 *                        "development" ?process.env.API_PREFIX_FILE :process.env.API_PREFIX_FILE_REAL
 *  api文件内现在写法：
 *  'file'没有写死： let prefix= process.env.API_PREFIX_FILE
 *  'file'写死写法： let prefix=  axios.prototype.API_PREFIX_FILE_REAL
 *
 *
 *  谷歌身份APP验证器 本质是也是 文件服务 只是代理不同 使用方式：
 *  import axios from 'src/api/common/axioswarpper.js'
 *  url: axios.prototype.API_PREFIX_APP_PREFIX
 *  其他常规HTTP 请求使用规则不变，同以前
 */


let uuid = uid();
// 超时时间
axios.defaults.timeout = 1500000;

// http请求拦截器

// 在向后端请求时，如果上传的数据里存在file文件对象，需要用到表单提交，这时候我们需要将JSON对象，转成formData对象，具体见代码

// const formData = new FormData();
// Object.keys(params).forEach((key) => {
// formData.append(key, params[key]);
// });

// 下面也有可能需要formData转JSON，代码如下：

// var jsonData = {};
// formData.forEach((value, key) => jsonData[key] = value);

axios.interceptors.request.use(
  config => {
    // console.log(
    //   "=====================================axios.interceptors.request.use============================================"
    // );
    // console.log(config);
    // 自定义参数 说明  type  1 formdata 2 json 3 file   默认 json

    switch (config.type) {
      case 1: {
        const formData = new FormData();
        //   let data = JSON.parse(config.data);
        let data = config.data;
        Object.keys(data).forEach(key => {
          formData.append(key, data[key]);
        });
        config.data = formData;
        config.headers["Content-Type"] =
          "application/x-www-form-urlencoded; charset=UTF-8";
      }
        break;
      case 3: {
        config.headers["Content-Type"] = "multipart/form-data";
      }
        break;
      case 4: {
        config.headers["Content-Disposition"] = "attachment";
        config.headers["Content-Type"] = "application/octet-stream";
      }
        break;
      case 5: {
        let { data } = config
        if (data && typeof data === 'object') {
          let { id, adminNewPassword } = data
          if (id !== undefined && adminNewPassword !== undefined) {
            let url = new URLSearchParams({ id, adminNewPassword })
            config.url += '?' + url.toString()
          }
        }
        break;
      }
      case 8 : {
        let { data } = config;
        console.log(data);
        break;
      }
      case 10: {
        config.headers["Content-Type"] = "application/json";
      }
        break;
    }
    let merchantName = lodash.get(SessionStorage.getItem('userInfo'),'userCode')
    let userId = lodash.get(SessionStorage.getItem('userInfo'),'userId')
    let appId = lodash.get(SessionStorage.getItem('userInfo'),'appId')
    // 用户id
    if(merchantName) config.headers['merchantName'] = merchantName;
    if(userId) config.headers['user-id'] = userId;
    if(appId) config.headers['app-id'] = appId;
    config.headers['request-id'] = `${uuid.replace(/-/g, '')}-${Date.now()}`
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 节流
const Throttle = (fn, t) =>{
  let last;
  let timer;
  let interval = t || 500;
  return function () {
      let args = arguments;
      let now = Date.now();
      if (last && (now - last < interval)) {
          clearTimeout(timer);
          timer = null
          timer = setTimeout(() => {
              last = now;
              fn.apply(this, args);
          }, interval);
      } else {
          last = now;
          fn.apply(this, args);
      }
  }
};
function handle(message) {
  Notify.create({
    icon: "warning",
    color: "negative",
    message
  });
}

let handleSuccuss = Throttle(handle, 800);
// http响应拦截器
axios.interceptors.response.use(
  res => {
     // session 过期处理
     let code = res.data.code;
     // 00400800
     if(code == '00400800' || code == '00400111'){
       // 处理函数
       // 节流函数，防止多次出现提示框！
      handleSuccuss('会话过期或已在其它地方登录，请重新登录！')
      SessionStorage.remove('userInfo');
      // 2020-1-28  注释
      setTimeout(() => {
        window.location.reload();
      },3000)
     }else if(code=="00400430"){
      // handleSuccuss('');
      window.$router.push('/no_auth');
    }
    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

export default axios;
