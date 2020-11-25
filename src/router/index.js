/*
 * @Desc: 
 * @Date: 2020-01-27 15:42:23
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-11-04 19:26
 */
import Vue from "vue";
import VueRouter from "vue-router";
import { SessionStorage } from 'quasar'

import routes from "./routes";

import htmlToPdf  from 'src/util/module/htmlToPdf.js'

Vue.use(VueRouter);
//下载PDF插件
Vue.use(htmlToPdf)
/**
 * 重写路由的push方法,解决2次跳转同路由报错问题！
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

Vue.filter('filterAmount', function (value) {
  if (!value) return '0' + '人民币'
  value = value + ''
  return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '人民币'
})

/** 
 * 将数值四舍五入(保留2位小数)后格式化成金额形式 
 * 
 * @param value 数值(Number或者String) 
 * @return 金额格式的字符串,如'1,234,567.45' 
 * @type String 
 */ 
Vue.filter('moneyFormat', function (value) {
  if(!value) return 0;
  value = value.toString().replace(/\$|,/g,'');  
    if(isNaN(value))  
        value = "0";  
  let sign = (value == (value = Math.abs(value)));  
    value = Math.floor(value*100+0.50000000001);  
  let cents = value%100;  
    value = Math.floor(value/100).toString();  
    if(cents<10)  
    cents = "0" + cents;  
    for (var i = 0; i < Math.floor((value.length-(1+i))/3); i++)  
    value = value.substring(0,value.length-(4*i+3))+','+  
    value.substring(value.length-(4*i+3));  
    return (((sign)?'':'-') + value + '.' + cents);  
})

Vue.filter('amount', function (value) {
  if (value === null || value === undefined ) return '-'
  value = value + ''
  let result = '';//存储格式化的结果
  let j = 0;//控制每3位加一个逗号
  let floatIndex = value.indexOf('.');
  if (floatIndex >= 1) {
    if (Number(value) >= 0) {
      for (let i = value.length - 1; i >= 0; i--) {//从末尾开始遍历到第一个
        j++;
        if (i >= floatIndex) { // 小数部分不用添加分隔符
          j = 0;
        }
        result = value[i] + result;
        if (j == 3) {
          //金额的最后一个数字正好满足3位时，其前面不用加逗号，例:500.00
          if (i != 0) {
            result = ',' + result;
          }
          j = 0;
        }

      }
      return result;
    } else {
      value = value.substr(1);
      for (let i = value.length - 1; i >= 0; i--) {//从末尾开始遍历到第一个
        j++;
        if (i >= floatIndex) { // 小数部分不用添加分隔符
          j = 0;
        }
        result = value[i] + result;
        if (j == 4) {
          //金额的最后一个数字正好满足3位时，其前面不用加逗号，例:500.00
          if (i != 0) {
            result = ',' + result;
          }
          j = 0;
        }
      }
      return '-' + result;
    }
  } else {
    return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
  }
})

// import Antd from 'ant-design-vue';
// import Antd from 'ant-design-vue'
import 'src/css/antd/index.less'

import { Button, Table, Menu, Icon, Layout, Col, Row, Dropdown, LocaleProvider, Tooltip, Progress, Tabs, Radio, DatePicker, Select, Upload, message, Badge, Popconfirm, Input, InputNumber, Form, Checkbox, Modal, Popover, TreeSelect, Pagination, Spin } from 'ant-design-vue';

export const MyIcon = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1635903_j37ig5pjmxe.js', // 在 iconfont.cn 上生成
});

// Vue.use(Antd);
Vue.component('my-icon', MyIcon)

Vue.use(Button)
Vue.use(Table)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Layout)
Vue.use(Dropdown)
Vue.use(LocaleProvider)
Vue.use(Tooltip)
Vue.use(Progress)
Vue.use(Tabs)
Vue.use(Radio)
Vue.use(DatePicker)
Vue.use(Select)
Vue.use(Upload)
Vue.use(message)
Vue.use(Badge)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Form)
Vue.use(Checkbox)
Vue.use(Col)
Vue.use(Row)
Vue.use(Modal)
Vue.use(Popover)
Vue.use(TreeSelect)
Vue.use(Pagination)
Vue.use(Spin)

Vue.prototype.$message = message;
Vue.prototype.$modal = Modal;


export default function (/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  });

  
  // 路由守卫  登录才能访问
  Router.beforeEach((to, from, next) => {
    console.log('路由拦截')
    let value = SessionStorage.getItem('userInfo');
    if (to.path === '/login' || to.path === '/password' || to.path === '/newpassword') {
      if(value){
        // 白名单路由 在登录状态下重定向
        next('/main/home')
      }else{
        next();
      }
    }else{
      value ? next() : next('/login');
    }
  })

  return Router;
}
