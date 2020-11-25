/*
 * @Desc: 
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-09-05 15:46:02
 */
import Vue from "vue";
import Vuex from "vuex";

// style
import windowResize from "src/store/module/style/windowResize.js";

//userInfo
import userInfoStore from 'src/store/module/common/userInfoStore.js'

//message 跑马灯跳转
import messageStore from 'src/store/module/marquee/messageStore.js'

//amount 红点是否显示
import amountStore from 'src/store/module/message/amountStore.js'

//data 信息中心 点击链接跳转详情
import dataStore from 'src/store/module/data/dataStore.js'

//home 从首页赛事跳转赛事详情页
import boolStore from 'src/store/module/data/boolStore.js'

// 商户中心 二级商户 勾选渠道商户 带出的条件
import channelStore from 'src/store/module/merchant/channelStore.js'

//商户中心商户详情信息
import detailStore from 'src/store/module/merchant/detailStore.js'

//数据中心 注单查询 控制引导第一次显示 获取dom
import domStore from 'src/store/module/data/domStore.js'

Vue.use(Vuex);
/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */
export default function(/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      windowResize,
      userInfoStore,
      messageStore,
      dataStore,
      amountStore,
      boolStore,
      channelStore,
      detailStore,
      domStore
    },
    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  });
  return Store;
}
