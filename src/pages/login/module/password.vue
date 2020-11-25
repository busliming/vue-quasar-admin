<template>
  <div class="full-width full-height bg-white login"
    @click="showhide">
    <div class="absolute-center" style="width 583px;height:550px;">
      <div class="text-center password-title fw_600" style="margin-bottom:30px; ">修改密码</div>
      <div class="row justify-center text-white mt6x">
        <div
          class="pwd-input-item pwd-input-message bg-white text-center text-tishi fs16"
          v-if="showMsg"
        >
          <span class="mr10x">
            <img src="~assets/tishi.svg" width="14" height="14" alt />
          </span>
          <span>{{showMessage}}</span>
        </div>
      </div>
      <form @submit.prevent.stop="onSubmit" @reset.prevent.stop="onReset">
        <!-- 账号   -->
        <div class="row justify-center">
          <q-input
            ref="userCode"
            v-model.trim="pwdForm.userCode"
            class="bg-white password-input-item password-input-shape input-height-40px"
            autofocus
            autocomplete
            outlined
            dense
            type="text"
            placeholder="请输入账号"
            maxlength="20"
            :hint="successMsg"
            @blur="validateUserCode"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '账号不能为空！',
            ]"
          >
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-zhanghu" />
            </template>
          </q-input>
        </div>
        <!-- 账号   -->
 
      <div class="row justify-center text-grey q-mb-sm">
        <div class="row password-input-item password-input-shape  input-height-40px mt20x">
          <q-btn @click="downloadapp">口令APP下载</q-btn>
          <q-space />
          <q-btn  @click="getUserTokenByUserCode" v-bind:class="[showimg?'text-green':'']">获取口令二维码
          <div>
            <q-tooltip  v-model="showimg" anchor="center right" content-class="ml20x  pad0x bg-none"  self="center left" :offset="[5, 5]">
              <!-- test -->
            <div v-if="LOCAL_TEST&&codemsg" class="white-bg"><img  :src="codemsg" v-bind:class="[(codemsg!=''&&codemsg!=null&&codemsg)?'imgcode float-right':'']"> </div>
              <!-- 生产环境 -->
            <div v-else-if="codemsg" v-bind:class="[(codemsg!=''&&codemsg!=null&&codemsg)?'codemsg-bg':'']">{{codemsg}}</div>
          </q-tooltip>
          </div>
          </q-btn>
        </div>
      </div>
        <!-- 口令   -->
        <div class="row justify-center">
          <q-input
            ref="tokenCode"
            v-model="pwdForm.tokenCode"
            outlined
            dense
            class="bg-white password-input-item password-input-shape input-height-40px mt1x"
            :type="kouling_isPwd ? 'password' : 'text'"
            @input="pwdForm.tokenCode = pwdForm.tokenCode.replace(/[\u4e00-\u9fa5]/g, '');"
            placeholder="请输入口令"
            @copy.native.capture.prevent = "handleCopy"
            maxlength="10"
            autocomplete
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '口令不能为空！',
            ]"
          >
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-kouling" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="kouling_isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="kouling_isPwd = !kouling_isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- 口令    -->

        <!-- 原密码   -->
        <div class="row justify-center">
          <q-input
            ref="password"
            v-model.trim="pwdForm.password"
            outlined
            autocomplete
            dense
            class="bg-white password-input-item password-input-shape input-height-40px"
            :type="old_password_isPwd ? 'password' : 'text'"
            maxlength="20"
            style="ime-mode:disabled"
            placeholder="请输入原密码"
            @input="pwdForm.password = pwdForm.password.replace(/[\u4e00-\u9fa5]/g, '');"
            @copy.native.capture.prevent = "handleCopy"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '原密码不能为空！',
              val => /^[_a-zA-Z0-9]+$/.test(val) || '密码格式错误，请使用：a-z、A-Z、0-9、和下划线！',
            ]"
          >
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-denglu-mima" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="old_password_isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="old_password_isPwd = !old_password_isPwd"
              />
            </template>
          </q-input>
        </div>
        <div class="row justify-center text-white">
          <div class="bg-white text-center text-red"></div>
        </div>
        <!-- 原密码   -->
        <!-- 新密码   -->
        <div class="row justify-center">
          <q-input
            ref="newPassword"
            v-model.trim="pwdForm.newPassword"
            outlined
            autocomplete
            dense
            class="bg-white password-input-item password-input-shape input-height-40px"
            :type="new_password_isPwd ? 'password' : 'text'"
            @input="pwdForm.newPassword = pwdForm.newPassword.replace(/[\u4e00-\u9fa5]/g, '');"
            @copy.native.capture.prevent = "handleCopy"
            placeholder="请输入新密码"
            maxlength="20"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '新密码不能为空！',
              val => /^[_a-zA-Z0-9]+$/.test(val) || '密码格式错误，请使用：a-z、A-Z、0-9、和下划线！',
              val => pwdForm.newPassword !== pwdForm.password || '新密码与原密码不能相同,请重新输入！',
              val => val.length>=6 && val.length <=20 || '请输入6-20位英文字母、数字或者符号（除空格）！',
            ]"
          >
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-denglu-mima" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="new_password_isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="new_password_isPwd = !new_password_isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- 新密码    -->

        <!-- 密码   -->
        <!-- 再次输入新密码   -->
        <div class="row justify-center">
          <q-input
            ref="confirmNewPassword"
            v-model="pwdForm.confirmNewPassword"
            outlined
            autocomplete
            dense
            maxlength="20"
            class="bg-white password-input-item password-input-shape input-height-40px"
            :type="new_password_r_isPwd ? 'password' : 'text'"
            @input="pwdForm.confirmNewPassword = pwdForm.confirmNewPassword.replace(/[\u4e00-\u9fa5]/g, '');"
            @copy.native.capture.prevent = "handleCopy"
            :rules="[
              val => val !== null && val !== '' || '再次输入新密码不能为空！',
              val => /^[_a-zA-Z0-9]+$/.test(val) || '密码格式错误，请使用：a-z、A-Z、0-9、和下划线！',
              val => !(pwdForm.newPassword != val) || '两次新密码输入不一致,请重新输入！',
            ]"
            placeholder="请再次输入新密码"
          >
            <!-- @paste.native.capture.prevent="handlePaste" -->
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-denglu-mima" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="new_password_r_isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="new_password_r_isPwd = !new_password_r_isPwd"
              />
            </template>
          </q-input>
        </div>
        <!-- 再次输入新密码    -->

        <div class="row justify-center mt20x" style="height:40px;">
          <div class="row text-white password-input-item password-input-shape mt20x">
            <q-btn @click="onSubmit" class="bg-panda-bg-2" style="width:122px;height:40px;">确定</q-btn>
            <q-space />

            <q-btn @click="goToLogin" class="bg-panda-bg-8" style="width:122px;height:40px;">取消</q-btn>
          </div>
        </div>
      </form>
    </div>

    <q-dialog class="bg-white" v-model="confirm" persistent>
      <pwd-dialog @goToMain="goToMain"></pwd-dialog>
    </q-dialog>
    <!-- <q-dialog v-model="confirm" persistent>
      <dialog-main></dialog-main>
    </q-dialog>-->
  </div>
</template>

<script>
import pwdDialog from "src/components/dialog/pwdDialog.vue";
import mixin from "src/mixins/index.js";
import { api_login } from "src/api/index.js";
import md5 from 'js-md5';
let  app_prefix=process.env.API_PREFIX_APP_PREFIX+process.env.API_PREFIX_URL_PREFIX
 if(process.env.NODE_ENV=="development"){
   app_prefix="/"+process.env.API_PREFIX_1+process.env.API_PREFIX_URL_PREFIX
 }
 let  API_PREFIX_CURRENT_ENV  = process.env.API_PREFIX_CURRENT_ENV
 let  LOCAL_TEST=(API_PREFIX_CURRENT_ENV==='local_dev'||API_PREFIX_CURRENT_ENV==='local_test')
export default {
  mixin: [...mixin],
  components: {
    pwdDialog
  },
  data() {
    return {
      LOCAL_TEST:LOCAL_TEST,
      timer:0,
      showimg:false,
      codemsg:"",
      confirm: false, // 密码修改成功弹窗
      //修改密码表单
      pwdForm: {
        userCode: "",
        tokenCode: "",
        password: "",
        newPassword: "",
        confirmNewPassword: ""
      },
      showMsg: "", //接口请求回来控制msg的阀值
      showMessage: '账号码错误，请重新输入！',
      successMsg: "", // 验证成功提示信息
      validateSuccess: false, // 账户是否验证成功  成功才可提交
      kouling_isPwd: true,
      old_password_isPwd: true,
      new_password_isPwd: true,
      new_password_r_isPwd: true
    };
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  created() {},
  watch: {
    'pwdForm.userCode':function(val, oldVal){
      this.codemsg=""
    },
    'pwdForm.password':function(val, oldVal){
      this.codemsg=""
    },
  },
  methods: {
    showhide(){
      if(this.showimg){
        this.showimg=false
      }
    },
    downloadapp(){
    window.open(app_prefix+"/file/login/download?fileName=base.apk" )
    },
    getUserTokenByUserCode(){
      this.$refs.userCode.validate();
     if (!(this.$refs.userCode.hasError ||this.$refs.password.hasError  )) {
      api_login.getUserTokenByUserCode({userCode:this.pwdForm.userCode,password: md5(this.pwdForm.password)}).then(res => {
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
    // 确定按钮 提交表单
    onSubmit() {
      this.validate();
      if (
        this.$refs.userCode.hasError ||
        this.$refs.tokenCode.hasError ||
        this.$refs.password.hasError ||
        this.$refs.newPassword.hasError ||
        this.$refs.confirmNewPassword.hasError
      ) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          userCode: this.pwdForm.userCode,
          tokenCode: this.pwdForm.tokenCode,
          password: md5(this.pwdForm.password),
          newPassword: md5(this.pwdForm.newPassword),
          confirmNewPassword: md5(this.pwdForm.confirmNewPassword)
        };
        if(this.validateSuccess){
          this.initChangePwd(params);
        }
      }
    },
    // 请求处理
    initChangePwd(params) {
      api_login.postChangePwd(params).then(res => {
        let { code, message,data } = res.data;
        console.log(code,message,data);
        if (code == "00000000") {
          this.confirm = true;
        }else{
          this.showMsg = true;
          if(Array.isArray(data)){
            data = message
          }
          this.showMessage = data;
        }
      });
    },
    //账户验证
    validateUserCode(){
      if(this.pwdForm.userCode){
        this.successMsg = ''
        this.showMsg = false;
        let params = {
          userCode: this.pwdForm.userCode
        }
        api_login.postValidCode(params).then(res => {
          let {code,data,message } = res.data;
          if(code == "00000000"){
            // 暂定不处理
            this.successMsg = '该账号可以使用，请进行下一步操作！'
            this.validateSuccess = true;
          }else{         
            if(code == '00400600') {
              this.showMessage = data;
              this.showMsg = false;
            }else if(code == '00400014'){
              this.showMessage = message;
              this.showMsg = true;
            }         
          }
        })
      }
    },
    // 表单验证
    validate() {
      this.$refs.userCode.validate();
      this.$refs.tokenCode.validate();
      this.$refs.password.validate();
      this.$refs.newPassword.validate();
      this.$refs.confirmNewPassword.validate();
    },
    // 验证重置  本期暂不做，后期在拓展
    reset() {
      this.$refs.userCode.resetValidation();
      this.$refs.tokenCode.resetValidation();
      this.$refs.password.resetValidation();
      this.$refs.newPassword.resetValidation();
      this.$refs.confirmNewPassword.resetValidation();
    },
    goToLogin() {
      // this.reset();
      this.$router.push({ name: "login" });
    },
    confirm_change_password() {
      this.confirm = true;
    },
    goToMain() {
      // this.reset();
      this.$router.push({ name: "login" });
    },
    // 粘贴时触发的事件
    handlePaste(){
      return false;
    },
    // 实现拷贝,复制
    handleCopy(){
      return false;
    }
  }
};
</script>

<style lang="stylus" scoped>
.login {
  width: 100vw;
  height: 100vh;
  min-width: 1200px;
  min-height: 600px;
  opacity: 0.96;
  overflow: hidden;
}
.codemsg-bg{
  background: url('../../../assets/codemsg.png') no-repeat center center;    
  background-size: 285px 54px;
  width: 285px;
  height: 54px;
  font-size:15px;
  line-height :54px;
  padding-left:10px;
  text-align :center;
}
 .white-bg{  
  background: url('../../../assets/grey.png') no-repeat center center;    
  background-size: 161px 152px;
  width: 161px;
  height: 152px;
  padding: 6px;
 }
 .imgcode{
  width:140px
}
.panda-icon-red {
  color: red;
  -webkit-text-fill-color: red;
}

.pwd-input-message {
  width: 406px;
  height: 34px;
  line-height: 34px;
}

.password-title {
  font-family: PingFangSC-Semibold;
  font-size: 35px;
  line-height: 40px;
  margin-bottom: 60px;
}

.password-input-shape {
  width: 406px;
}

.password-input-item {
  background: #fff;
  border-radius: 4px;
  border-radius: 4px;
  margin-top: 40px;
}

.text-tishi {
  color: #D06263;
}

// form表单input样式重写
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
.mt1x{
  margin-top :1px;
}
.mt20x{
  margin-top :20px;
}
</style>
