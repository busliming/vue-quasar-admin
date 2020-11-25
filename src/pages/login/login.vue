<template>
  <div class="login" :class="showMsg? 'on': 'off'" @keyup.enter="onSubmit">
    <div class="absolute-center" id="login-common">
      <div class="text-center" style="padding-top: 40px;">
        <img src="~assets/logo.svg" height="80px" alt srcset />
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
            class="bg-white login-input-item login-input-shape input-height-40px"
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
            class="bg-white login-input-item login-input-shape input-height-40px"
            outlined
            dense
            :type="isPwd ? 'password' : 'text'"
            placeholder="登录密码"
            @input="loginForm.password = loginForm.password.replace(/[\u4e00-\u9fa5d]/g, '');"
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
            @input="loginForm.tokenCode = loginForm.tokenCode.replace(/[\u4e00-\u9fa5d]/g, '');"
            maxlength="10"
            required 
            autocomplete
            @focus="handleMsg"    
            @copy.native.capture.prevent = "handleCopy"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '口令不能为空！',
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
      <div class="row justify-center text-white q-mb-sm">
        <div class="row login-input-shape login-push">
          <q-btn @click="goToPassword">修改密码</q-btn>
          <q-space />
          <q-btn @click="goToNewpassword">忘记密码</q-btn>
        </div>
      </div>
      <div class="text-white row justify-center text-white mb40x">
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
import { api_login } from "src/api/index.js";
import { Cookies } from "quasar";
import md5 from 'js-md5';
export default {
  mixins: [...mixin],
  data() {
    return {
      loginForm: {
        userCode: "admin",
        password: "123456",
        tokenCode: "ABCD",
        // appId: 1
      },
      isPwd: true,
      isPwd2: true,
      showMsg: false,
      showMessage: "账号或密码错误，请重新输入！",
      loading: false //登录loading
    };
  },
  created() {
    // this.set_token(this.loginForm);
  },
  methods: {
    ...mapActions(["set_token", "set_user_info"]),
    // 表单验证
    validate() {
      this.$refs.userCode.validate();
      this.$refs.password.validate();
      this.$refs.tokenCode.validate();
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
       this.$router.push({ name: "merchantc" });
      // this.showMsg = false;
      // this.validate();
      // if (
      //   this.$refs.userCode.hasError ||
      //   this.$refs.password.hasError ||
      //   this.$refs.tokenCode.hasError
      // ) {
      //   this.formHasError = true;
      // } else {
      //   // 前后端联调代码
      //   let params = {
      //     userCode: this.loginForm.userCode,
      //     password: md5(this.loginForm.password),  // md5 加密
      //     tokenCode: this.loginForm.tokenCode,
      //     appId: 1
      //   };
      //   this.initLogin(params);
      // }
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
          let { appId,userId,userCode,adminApp} = res.data.data;
          let currentUser = {
            id: appId,
            userId,
            userCode
          }
          let userInfo = {
            user: currentUser,
            adminRoles: adminApp
          };
          // 存储到本地
          this.$q.sessionStorage.set("userInfo", userInfo);
          // 存储到vuex
          this.set_user_info(userInfo);
          // this.set_token(this.loginForm);
          // 进入内容页
          this.$router.push({ name: "merchantc" });
          this.$q.notify({
            icon: "done",
            color: "secondary",
            message: "登录成功！"
          });
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
  background: url('../../assets/img/bg.png') no-repeat center center;
  overflow: hidden;
  background-size: cover;
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
</style>

