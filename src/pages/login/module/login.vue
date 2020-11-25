<template>
  <div class="login" :class="showMsg? 'on': 'off'">
    <div class="absolute-center" id="login-common">
      <div class="text-left" style="padding-top: 60px; padding-left: 75px;">
        <img :src="logo" height="80px" alt srcset />
      </div>
      <div class="text-left pl100x login-title mt20x mb70x">
        <img width="350" src="~assets/img/font.svg" alt srcset />
      </div>
      <div class="row justify-start text-white mt6x pl100x" v-if="showMsg">
        <div class="login-input-item login-input-message bg-white text-left text-tishi fs16">
          <span class="mr10x">
            <img src="~assets/img/tishi.svg" width="18" height="18" alt />
          </span>
          <span class="fs15">{{showMessage}}</span>
        </div>
      </div>
      <!-- 账号   -->
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit.prevent="handleSubmit"
      >
        <a-form-item
          :validate-status="userNameError() ? 'error' : ''"
          :help="userNameError() || ''"
        >
          <a-input
            @focus="handleMsg"
            v-decorator="[
              'username',
              { rules: [{ required: true, message: '用户名不能为空！' }] },
            ]"
            placeholder="请输入用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.6)" />
          </a-input>
        </a-form-item>
        <a-form-item
          :validate-status="passwordError() ? 'error' : ''"
          :help="passwordError() || ''"
        >
          <a-input-password
            v-decorator="[
              'password',
              { rules: [{ required: true, message: '密码不能为空！' }] },
            ]"
            placeholder="请输入密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,0.6)" />
          </a-input-password>
        </a-form-item>
        <a-form-item
          :validate-status="tokenCodeError() ? 'error' : ''"
          :help="tokenCodeError() || ''"
        >
          <a-input-password
            v-decorator="[
              'tokenCode',            
              { rules: [{ validator: checkTokenCode }] },
            ]"
            placeholder="请输入口令"
          >
            <!-- { rules: [{ required: true, message: '口令不能为空！' }] }, -->
            <a-icon slot="prefix" type="key" style="color: rgba(0,0,0,0.6)" />
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button
            :loading="loading"
            type="primary"
            :disabled="hasErrors(form.getFieldsError())"
            html-type="submit"
            class="login-form-button mt40x"
          >登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import logomixin from 'src/mixins/common/logomixin.js'
import { api_login } from "src/api/index.js";
import { Cookies } from "quasar";
import md5 from 'js-md5';
import Browser from 'src/util/module/browser.js' 
export default {
  mixins: [logomixin],
  data() {
    const // 验证btn是否禁用
      hasErrors = fieldsError => {
        return Object.keys(fieldsError).some(field => fieldsError[field]);
      };
    return {
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
      loading: false, //登录loading
      hasErrors
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "login" });
  },
  created() {
    this.initLogo();
    console.warn(Browser.client.name+":"+Browser.client.version)
  },
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
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
    checkTokenCode(rule, value, callback){
      if(value === ''){
        callback('口令不能为空！')
        return
      }else if(!(/^\+?[0-9][0-9]*$/.test(value))){
        callback('口令只能为数字！')
        return
      }else{
        callback()
      }
    },
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
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    tokenCodeError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("tokenCode") && getFieldError("tokenCode");
    },
    //修改密码
    goToPassword() {
      this.$router.push({ name: "password" });
    },
    //忘记密码
    goToNewpassword() {
      this.$router.push({ name: "newpassword" });
    },
    handleSubmit() {
      this.showMsg = false;
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = {
            userCode: values.username,
            password: md5(values.password), // md5 加密
            tokenCode: values.tokenCode,
            appId: 10008
          };
          this.initLogin(params);
        }
      });
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
          let { appId,userId,userCode,permissions,loginCode,module} = res.data.data;
          let userInfo = {
            appId,
            userId,
            userCode,
            permissions,
            loginCode,
            module
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

.text-tishi {
  color: #FFBF00;
}

#login-common {
  width: 1084px;
  height: 680px;
  opacity: 0.9;
  background: url('../../../assets/img/bgc.png') no-repeat center center;
  overflow: hidden;
  border-radius: 4px;
  border-radius: 4px;
  background-size: cover;
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

#components-form-demo-normal-login {
  width: 350px;
  // margin: 0 auto;
  margin-left: 100px;
  color: #000000;
}

>>>.ant-input-affix-wrapper {
  color: #000000;
  height: 40px;
  line-height: 40px;
  font-size: 16px;
  margin-bottom: 10px;
}

>>>.ant-input-suffix i {
  color: #000000 !important;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}


>>>.ant-input-affix-wrapper .ant-input {
  // border-bottom: 1px solid #CCCCCC;
  // border-top: 1px solid transparent;
  // border-left: 1px solid transparent;
  // border-right: 1px solid transparent;
  outline: none !important;
  // font-size 15px;
  box-sizing border-box;
  box-shadow: none;
}

>>>.ant-input-affix-wrapper .ant-input:focus {
  // border-top: 1px solid transparent;
  // border-left: 1px solid transparent;
  // border-right: 1px solid transparent;
  // border-bottom: 1px solid #1890ff  !important;
  box-shadow: none;
  color: #1890ff
  -webkit-text-fill-color: #1890ff;
  outline: none !important;
}

.panda-icon-hover:hover {
  color: $panda-bg-2;
  -webkit-text-fill-color: $panda-bg-2;
}

>>>.ant-input-affix-wrapper .ant-input:hover {
  color: #1890ff
  -webkit-text-fill-color: #1890ff;
  // border: none;
  // border-bottom: 1px solid #1890ff  !important;
  box-shadow: none !important;
  // outline: none !important;
}
>>>.ant-input-affix-wrapper .ant-input-suffix i:hover{
  border: none;
  // border-bottom: 1px solid #1890ff  !important;
  box-shadow: none;
  outline: none !important;
}

#components-form-demo-normal-login .not-login {
  background: #CCCCCC;
  border-radius: 6px;
  border-radius: 6px;
}

#components-form-demo-normal-login .ant-btn[disabled] {
  background: #CCCCCC;
  color: #ffffff;
  border-radius: 6px;
  box-shadow: none;
}

#components-form-demo-normal-login .login-form-forgot {
  float: right;
}

#components-form-demo-normal-login .login-form-button {
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  margin-bottom: 20px;
  border-radius: 6px;
  box-shadow: 0 6px 16px 0 rgba(50, 99, 255, 0.4);
}

>>>input::-webkit-input-placeholder { /* WebKit browsers 适配谷歌 */
  color: #CCCCCC;
  // font-size 16px;
}

>>>.ant-input {
  font-style: 16px !important;
}

>>>.ant-input-affix-wrapper .ant-input:not(:first-child) {
  padding-left: 40px;
}
</style>

