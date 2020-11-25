<template>
  <div class="login" :class="showMsg? 'off': 'on'" @keyup.enter="onSubmit"
    @click="showhide">
    <div class="absolute-center" id="login-common">
      <div class="text-center" style="padding-top: 40px;">
        <img :src="logo" height="80px" alt srcset />
      </div>
      <div class="text-center login-title mt30x mb40x">商户管理平台</div>
      <div class="row justify-center text-white mt6x" v-if="showMsg">
        <div class="login-input-item login-input-message bg-white text-center text-tishi fs16">
          <span class="mr10x">
            <img src="~assets/tishi.svg" width="12" height="12" alt />
          </span>
          <span class="fs15">{{showMessage}}</span>
        </div>
      </div>
      <!-- 账号   -->
      <form @submit.prevent.stop="onSubmit">
        <div class="row justify-center">
          <q-input
            ref="userCode"
            v-model.trim="loginForm.userCode"
            class="bg-white login-input-item login-input-shape input-height-40px field-mb"
            autofocus
            outlined
            dense
            type="text"
            placeholder="请输入账号"
            @focus="handleMsg"

            required
            autocomplete
            lazy-rules
            :rules="[ val => val && val.length > 0 || '账号不能为空！']"
          >
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-zhanghu" />
            </template>
          </q-input>
        </div>
        <!-- 账号   -->
        <!-- 密码   -->
        <div class="row justify-center">
          <q-input
            ref="password"
            v-model.trim="loginForm.password"
            class="bg-white login-input-item login-input-shape input-height-40px pwd"
            outlined
            dense
            :type="isPwd ? 'password' : 'text'"
            placeholder="登录密码"
            @input="loginForm.password = loginForm.password.replace(/[\u4e00-\u9fa5]/g, '');"
            @focus="handleMsg"
            @copy.native.capture.prevent = "handleCopy"
            required
            autocomplete
            maxlength="20"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '密码不能为空！',
            ]"
          >
            <!-- @paste.native.capture.prevent="handlePaste"
            @copy.native.capture.prevent = "handleCopy" -->
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-denglu-mima" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- 密码   -->

        <!-- 口令   -->
        <div class="row justify-center">
          <q-input
            ref="tokenCode"
            v-model.trim="loginForm.tokenCode"
            class="bg-white login-input-item login-input-shape input-height-40px"
            outlined
            dense
            :type="isPwd2 ? 'password' : 'text'"
            placeholder="请输入口令"
            @input="loginForm.tokenCode = loginForm.tokenCode.replace(/[\u4e00-\u9fa5]/g, '');"
            maxlength="10"
            required
            autocomplete
            @focus="handleMsg"
            @copy.native.capture.prevent = "handleCopy"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '口令不能为空！',
              val => /^[0-9]*$/.test(val) || '口令必须为数字！',
            ]"
          >
            <!-- @paste.native.capture.prevent="handlePaste" -->
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-kouling" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </div>
        <!-- 口令    -->
      </form>
      <div class="text-white row justify-center text-white mb40x mt20x">
        <div class="login-input-shape">
          <q-btn
            @click="onSubmit"
            :loading="loading"
            class="login-input-shape fs16 bg-panda-bg-2"
            style=" height: 40px; letter-spacing:10px"
          >登录</q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import mixin from "src/mixins/index.js";
import logomixin from 'src/mixins/common/logomixin.js'
import { api_login } from "src/api/index.js";
import { Cookies } from "quasar";
import md5 from 'js-md5';
let  app_prefix=process.env.API_PREFIX_APP_PREFIX+process.env.API_PREFIX_URL_PREFIX
 if(process.env.NODE_ENV=="development"){
   app_prefix="/"+process.env.API_PREFIX_1+process.env.API_PREFIX_URL_PREFIX
 }
 let  API_PREFIX_CURRENT_ENV  = process.env.API_PREFIX_CURRENT_ENV
 let  LOCAL_TEST=(API_PREFIX_CURRENT_ENV==='local_dev'||API_PREFIX_CURRENT_ENV==='local_test')
export default {
  mixins: [...mixin,logomixin],
  data() {
    return {
      LOCAL_TEST:LOCAL_TEST,
      timer:0,
      showimg:false,
      codemsg:"",
      loginForm: {
        userCode: "",
        password: "",
        tokenCode: "",
        appId: 10008
      },
      isPwd: true,
      isPwd2: true,
      showMsg: false,
      showMessage: "账号或密码错误，请重新输入！",
      loading: false //登录loading
    };
  },
  created() {
    this.initLogo();
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  watch:{
    'loginForm.userCode':function(val, oldVal){
      this.codemsg=""
    },
    'loginForm.password':function(val, oldVal){
      this.codemsg=""
    },
  },
  methods: {
    ...mapActions(["set_token", "set_user_info"]),
    // 表单验证
    validate() {
      this.$refs.userCode.validate();
      this.$refs.password.validate();
      this.$refs.tokenCode.validate();
    },
    showhide(){
      if(this.showimg){
        this.showimg=false
      }
    },
    //修改密码
    goToPassword() {
      this.$router.push({ name: "password" });
    },
    //忘记密码
    goToNewpassword() {
      this.$router.push({ name: "newpassword" });
    },
    onSubmit() {
      this.showMsg = false;
      this.validate();
      if (
        this.$refs.userCode.hasError ||
        this.$refs.password.hasError ||
        this.$refs.tokenCode.hasError
      ) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          userCode: this.loginForm.userCode,
          password: md5(this.loginForm.password),  // md5 加密
          tokenCode: this.loginForm.tokenCode,
          appId: 10008
        };
        this.initLogin(params);
      }
    },
    downloadapp(){
    window.open(app_prefix+"/file/login/download?fileName=base.apk" )
    },
    getUserTokenByUserCode(){
      this.$refs.userCode.validate();
      this.$refs.password.validate();
      if (!(this.$refs.userCode.hasError ||this.$refs.password.hasError  )) {
      api_login.getUserTokenByUserCode({userCode:this.loginForm.userCode,password: md5(this.loginForm.password)}).then(res => {
        let { code, message } = res.data;
          this.showimg=true
          this.codemsg = this.$lodash.get(res, "data.data.userQrcode");
        // 成功
        if (code == "00000000") {
          if(LOCAL_TEST){// test
            if(this.codemsg){
                  this.$q.notify({
                    icon: "done",
                    color: "secondary",
                    message: "获取成功"
                  });
            }
          }else{  //生产环境
            if(this.codemsg){
              this.codemsg = "口令二维码已发送到邮箱，请查看";
            }
          }
        } else {
          if(LOCAL_TEST){
          this.$q.notify({
            icon: "warning",
            color: "negative",
            message: message
          });
          }else{
              this.codemsg =message;
          }
        }
      }).catch(err => {
        this.$q.notify({
          icon: "warning",
          color: "negative",
          message: "网络异常,请联系相关技术人员！"
        });
      })
      }
    },
    // 请求处理
    initLogin(params) {
      this.loading = true;
      api_login.postLogin(params).then(res => {
        let { code, message, adminRoles } = res.data;
        console.log(code, message);
        // 成功
        if (code == "00000000") {
          this.loading = false;
          // Cookies.set("login", this.loginForm);
          let { appId,userId,userCode,permissions,loginCode} = res.data.data;
          let userInfo = {
            appId,
            userId,
            userCode,
            permissions,
            loginCode
          };
          console.log(userInfo)
          // 存储到本地
          this.$q.sessionStorage.set("userInfo", userInfo);
          // 存储到vuex
          this.set_user_info(userInfo);
          // this.set_token(this.loginForm);
          // 进入内容页
          if(userCode.includes('BW')){
            this.$router.push({name: 'bet_slip'})
          }else{
            this.$router.push({ name: "home" });
          }        
          this.$message.success('登录成功！')
        } else {
          // 错误
          this.loading = false;
          this.showMsg = true;
          this.showMessage = message;
        }
      }).catch(err => {
        this.loading = false;
        this.$q.notify({
          icon: "warning",
          color: "negative",
          message: "网络异常,请联系相关技术人员！"
        });
      })
    },
    handleMsg(){
      this.showMsg = false;
    },
    //
    handlePaste(){
      return false;
      // this.isPwd = true;
    },
    handleCopy(){
      return false;
      // this.isPwd = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.panda-icon-red {
  color: red;
  -webkit-text-fill-color: red;
}

.login {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  opacity: 0.96;
  background: url('../../../assets/img/bg.png') no-repeat center center;
  overflow: hidden;
  background-size: cover;
}
 .white-bg{
  background: url('../../../assets/qipao.png') no-repeat center center;
  background-size: 160px 150px;
  width: 159px;
  height: 150px;
  padding: 6px;
 }
 .imgcode{
  width:140px
}
.codemsg-bg{
  background: url('../../../assets/codemsg.png') no-repeat center center;
  background-size: 280px 54px;
  width: 280px;
  height: 54px;
  font-size:15px;
  line-height :54px;
  padding-left:10px;
  text-align :center;
}
#login-common {
  width: 583px;
  height: auto;
  opacity: 0.9;
  background: #141F29;
  box-shadow: 0 0 25px 4px rgba(0, 15, 38, 0.5);
  border-radius: 4px;
  border-radius: 4px;
}

.login-title {
  font-family: PingFangSC-Semibold;
  font-size: 35px;
  color: #FFFFFF;
  line-height: 40px;
}

.login-input-message {
  width: 406px;
  height: 34px;
  line-height: 34px;
}

.login-input-shape {
  width: 406px;
  // height: 40px;
  // line-height: 40px;
}

.login-input-item {
  background: rgba(255, 255, 255, 0.9);
  // border: 1px solid #D06263;
  border-radius: 4px;
  border-radius: 4px;
  margin-bottom: 25px;
}

.text-tishi {
  color: #D06263;
}

>>>.q-field--with-bottom {
  padding-bottom: 0;
}

>>>.q-field__bottom--animated {
  bottom: 4px;
}

>>>.q-field__marginal {
  font-size: 16px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 16px;
}

>>>.q-field--dense .q-field__bottom{
  font-size: 15px;
}
.login-push {
  color: #BCCFD3;
}
.on{
  font-family:Microsoft yahei;
}
.off{
  font-family: 'Roboto', '-apple-system', 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

input[type=password] {
    ime-mode: disabled;
}
.field-mb{
  margin-bottom: 30px;
}
>>>.q-field--error .q-field__bottom{
  color: #D06263;
}
</style>

