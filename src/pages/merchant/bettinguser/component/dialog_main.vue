<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors  : Nice
 * @LastEditTime : 2020-01-14 15:12:31
 -->
<template>
  <div>
    <q-card class="bg-white text-black" style="width: 350px ; height:auto">
      <div class="row line-height-38px">
        <div style="padding-left:15px;" class="q-pr-sm">日志详情</div>
        <div class="vertical-middle">
          <span class="panda-icon-help-like vertical-middle">
            <q-tooltip>{{detail_obj.userCode}}日志详情</q-tooltip>
            <span class="text-white" style="">!</span>
          </span>
        </div>
        <q-space></q-space>
        <q-btn flat dense icon="close" v-close-popup />
      </div>
      <q-separator></q-separator>
      <q-card-section class="fs14">
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">登录编号</div>
          <div class="card-div-2">{{ detail_obj.loginCode }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">登录账号</div>
          <div class="card-div-2">{{ detail_obj.userCode }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">所属后台</div>
          <div class="card-div-2">{{ detail_obj.appId }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">角色</div>
          <div class="card-div-2">{{ detail_obj.roleId }}</div>
        </div>
        <q-separator class="mt20x mb20x"></q-separator>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">时间</div>
          <div class="card-div-2">{{ detail_obj.createTime }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">方式</div>

          <div class="card-div-2">   {{  compute_constant_value('loginType_arr',detail_obj.loginType) }} </div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">是否成功</div>
          <div class="card-div-2">{{ detail_obj.loginSuccess==1?'成功':'失败' }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">IP地址</div>
          <div class="card-div-2">{{ detail_obj.loginIp }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">登录地址</div>
          <div class="card-div-2">{{ detail_obj.loginAddress }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">状态</div>
          <!-- <div class="card-div-2">{{ detail_obj.loginStatus }}</div> -->
          <div class="card-div-2">    {{  compute_constant_value('loginStatus_arr', detail_obj.loginStatus) }}</div>
        </div>
        <div class="row line-height-30px justify-start">
          <div class="card-div-1 text-color">备注</div>
          <div class="card-div-2">{{ detail_obj.login_remark }}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import log_login_mixin from "src/pages/merchant/bettinguser/mixin/index.js"
export default {
  mixins:[log_login_mixin],
  data() {
    return {
      // key: value
    };
  },
  props: {
    detail_obj: ""
  }
};
</script>
<style lang="stylus" scoped>
.card-div-1{
   width: 80px;
}
.card-div-2{
  width: calc(100% - 80px)
}
.text-color{
  color: #999999;
  font-size: 14px;
}
</style>
