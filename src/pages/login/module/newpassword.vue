<template>
  <div class="bg-white login"
    @click="showhide">
    <div class="absolute-center" style="width 583px;height:550px;">
      <div class="text-center password-title fw_600" style="margin-bottom:30px; ">设置新密码</div>
      <div class="row justify-center text-white mt6x">
        <div
          class="pwd-input-item pwd-input-message bg-white text-center text-tishi fs16"
          v-if="showMsg"
        >
          <span class="mr10x">
            <img src="~assets/tishi.svg" width="14" height="14" alt />
          </span>
          <span class="fs14x">{{showMessage}}</span>
        </div>
      </div>
      <q-form @submit.prevent.stop="onSubmit">
        <!-- 账号   -->
        <div class="row justify-center">
          <q-input
            ref="userCode"
            v-model.trim="pwdForm.userCode"
            class="bg-white password-input-item password-input-shape input-height-40px"
            outlined
            autofocus
            autocomplete
            maxlength="20"
            dense
            type="text"
            placeholder="请输入账号"
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
            autocomplete
            @input="pwdForm.tokenCode = pwdForm.tokenCode.replace(/[\u4e00-\u9fa5]/g, '');"
            @copy.native.capture.prevent = "handleCopy"
            dense
            class="bg-white password-input-item password-input-shape input-height-40px mt1x"
            :type="kouling_isPwd ? 'password' : 'text'"
            placeholder="请输入口令"
            maxlength="10"
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
        <!-- 新密码   -->
        <div class="row justify-center">
          <q-input
            ref="newPassword"
            v-model="pwdForm.newPassword"
            outlined
            dense
            class="bg-white password-input-item password-input-shape input-height-40px"
            :type="new_password_isPwd ? 'password' : 'text'"
            placeholder="请输入新密码"
            @input="pwdForm.newPassword = pwdForm.newPassword.replace(/[\u4e00-\u9fa5]/g, '');"
            @copy.native.capture.prevent = "handleCopy"
            autocomplete
            minlength="6"
            maxlength="20"
            lazy-rules
            :rules="[
              val => val !== null && val !== '' || '新密码不能为空！',
              val => /^[_a-zA-Z0-9]+$/.test(val) || '密码格式错误，请使用：a-z、A-Z、0-9、和下划线！最小长度为6！',
              val => val.length>=6&&val.length<=20 || '密码格式错误，请使用：a-z、A-Z、0-9、和下划线！最小长度为6！',
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
        <div class="row justify-center text-white">
          <div class="bg-white text-center text-red"></div>
        </div>
        <!-- 新密码   -->
        
        <!-- 邮箱    -->
        <div class="row justify-center" style="width: 406px;">
          <div class="col-6">
            <q-input
              ref="email"
              v-model.trim="pwdForm.email"
              outlined
              autocomplete
              dense
              class="bg-white password-input-item input-height-40px"
              type="text"
              placeholder="工作邮箱"
                maxlength="30"
                lazy-rules
                @keyup="validateEmail"
                :rules="[
                  val => val !== null && val !== '' || '邮箱不能为空！',
                  val => /^[a-zA-Z0-9_]+$/.test(val) ||'格式错误，请使用：a-z、A-Z、0-9、和下划线！',
                  val => (val.length >=2&&val.length<=30) || '长度不能小于2大于30！',
                  val => val.toUpperCase().includes(pwdForm.userCode.toUpperCase( )) || '请输入本人的邮箱！',
                  val => emailError || '邮箱不存在！',
                ]"
            ></q-input>
          </div>
          <q-space />
          <div class="col-5">
            <q-input
              v-model.trim="pwdForm.emailend"
              outlined
              autocomplete
              dense
              class="bg-white password-input-item input-height-40px"
              type="text"
              :disable="true"
            ></q-input>
          </div>
        </div>
        <!-- 邮箱  -->
        <!--  验证码   -->
        <div class="row justify-center">
          <q-input
            ref="verificationCode"
            v-model.trim="pwdForm.verificationCode"
            outlined
            dense
            class="bg-white password-input-item password-input-shape input-height-40px"
            type="text"
            autocomplete
            maxlength="6"
            placeholder="请输入6位数字验证码"
            @input="pwdForm.verificationCode = pwdForm.verificationCode.replace(/[\u4e00-\u9fa5]/g, '');"
            :rules="[    
              val => val !== null && val !== '' || '数字验证码不能为空！',
              val => /^[0-9]*$/.test(val) || '验证码必须为数字！',
              val => codeError || '验证码错误，请重新输入！',
            ]"
          >
            <!-- val => val !== null && val !== '' || '数字验证码不能为空！', -->
            <!-- val => /^\d{6}$/.test(val)|| '验证码错误，请重新输入！', -->
            <template v-slot:prepend>
              <q-icon class="panda-icon-login-yanzhengma" />
            </template>
            <template v-slot:append>
              <q-btn
                v-if="codeShow"
                flat
                class="bg-white text-panda-text-2 fs16"
                style="height:38px"
                @click.native.stop="getAuthCode"
              >获取验证码</q-btn>
              <span v-else>{{codeTime}} 秒后重发</span>
            </template>
          </q-input>
        </div>
        <!-- 验证码    -->
        <div class="row justify-center" style="height:40px  ;">
          <div
            class="row text-white password-input-item password-input-shape"
            style="height:40px  ;"
          >
            <q-btn @click="onSubmit"
              :disable="add"
              :label="addlabel"
               class="bg-panda-bg-2" style="width:122px;height:40px;"></q-btn>
            <q-space />

            <q-btn @click="goToLogin" class="bg-panda-bg-8" style="width:122px;height:40px;">取消</q-btn>
          </div>
        </div>
      </q-form>
    </div>
    <q-dialog class="bg-white" v-model="dialog.show" persistent>
      <pwd-dialog @goToMain="goToMain" :title="dialog.title"></pwd-dialog>
    </q-dialog>
  </div>
</template>
<script>
import pwdDialog from "src/components/dialog/pwdDialog.vue";
import mixin from "src/mixins/index.js";
import { api_login,api_account } from "src/api/index.js";
import md5 from "js-md5";
let  app_prefix=process.env.API_PREFIX_APP_PREFIX+process.env.API_PREFIX_URL_PREFIX
 if(process.env.NODE_ENV=="development"){
   app_prefix="/"+process.env.API_PREFIX_1+process.env.API_PREFIX_URL_PREFIX
 }
 let  API_PREFIX_CURRENT_ENV  = process.env.API_PREFIX_CURRENT_ENV
 let  LOCAL_TEST=(API_PREFIX_CURRENT_ENV==='local_dev'||API_PREFIX_CURRENT_ENV==='local_test')
export default {
  mixin: [...mixin],
  data() {
    return {
      addlabel:"确定",
      add:false,
      LOCAL_TEST:LOCAL_TEST,
      timer:0,
      showimg:false,
      codemsg:"",
      codeError:true,
      emailError:true,
      oldVerificationCode:"",
      dialog: {
        show: false,
        title: "恭喜你，新密码设置成功！"
      },
      confirm: false,
      showMsg: false, // 新密码设置是否成功信息提示
      successMsg: "", //验证账号是否可用提示信息
      validateSuccess: false, // 验证账号成功与否， 成功可提交
      pwdForm: {
        userCode: "",
        tokenCode: "",
        newPassword: "",
        emailend:"@itcom888.com",
        email:"",
        verificationCode: ""
      },
      codeShow: true, //获取验证码字段显示
      codeTime: 60, //倒计时时间
      timer: null, //定时器
      kouling_isPwd: true, //是否可看文本
      new_password_isPwd: true // 是否明文
    };
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  created() {},
  
  watch: {
    'pwdForm.verificationCode':function (val) {
      if(!this.codeError&&val!=this.oldVerificationCode){
        this.codeError=true
      }else if(val==this.oldVerificationCode){
        this.codeError=false
      }
    },
    'pwdForm.userCode':function(val, oldVal){
      this.codemsg=""
    },
    pwdForm: {
      handler: function(val) {
          this.showMessage = "";
          this.showMsg = false;
      },
      deep: true
    },
  },
  methods: {
    
    //验证用户邮箱是否存在
    validateEmail() {
      this.$refs.email.validate();
      this.$refs.userCode.validate();
      if (this.pwdForm.email&&!this.$refs.email.hasErro&&!this.$refs.userCode.hasError) {
        let params = {
          userEmail: this.pwdForm.email+"@itcom888.com",
          userCode:this.pwdForm.userCode
        };
        api_account.checkByEmail(params).then(res => {
          let { code, data, message } = res.data;
          if (code == "00000000") {
             this.emailError=true;
          }else {
             this.emailError=false;
            }
          this.$refs.email.validate();
        });
      }
    },
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
      if (!(this.$refs.userCode.hasError)) {
      api_login.getUserTokenByUserCode({userCode:this.pwdForm.userCode}).then(res => {
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
    // 取消按钮点击去登录页
    goToLogin() {
      this.$router.push({ name: "login" });
    },
    // 弹窗中的立即登录按钮点击去登录页
    goToMain() {
      this.$router.push({ name: "login" });
    },
    // 获取验证码
    getAuthCode() {
      this.$refs.userCode.validate();
      this.$refs.email.validate();
      if (!(this.$refs.email.hasError||this.$refs.userCode.hasError)&&this.validateSuccess) {
      this.sendCode();
      this.codeShow = false;
      this.timer = setInterval(() => {
        this.codeTime--;
        if (this.codeTime <= 0) {
          this.codeShow = true;
          clearInterval(this.timer);
          this.codeTime = 60;
        }
      }, 1000);
      }
    },
    // 获取验证码接口
    sendCode(){
        this.showMsg = false;
        let params = {
          userCode: this.pwdForm.userCode,
	        toAddress:this.pwdForm.email+this.pwdForm.emailend,
        };
        api_login.sendCode(params)
    },
    //账户验证
    validateUserCode() {
      if (this.pwdForm.userCode) {
        this.showMsg = false;
        let params = {
          userCode: this.pwdForm.userCode
        };
        api_login.postValidCode(params).then(res => {
          // console.log(res.data)
          let { code, data, message } = res.data;
          if (code == "00000000") {
            // 暂定不处理
            this.successMsg = "该账号输入正确，请进行下一步操作！";
            this.validateSuccess = true;
          } else {
            if (code == "00400600") {
              this.showMessage = data;
              this.showMsg = false;
            } else if (code == "00400014") {
              this.showMessage = message;
              this.showMsg = true;
            } else {
              this.showMessage = message;
              this.showMsg = true;
            }
            
            this.successMsg = "";
            this.validateSuccess = false;
          }
        });
      }
    },
    // 表单验证
    validate() {
      this.$refs.userCode.validate();
      this.$refs.tokenCode.validate();
      this.$refs.newPassword.validate();
      this.$refs.verificationCode.validate();
      this.$refs.email.validate();
    },
    // 确定按钮
    onSubmit() {
      this.validate();
      if (
        this.$refs.userCode.hasError ||
        this.$refs.tokenCode.hasError ||
        this.$refs.newPassword.hasError ||
        this.$refs.verificationCode.hasError||
        this.$refs.email.hasError
      ) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        let params = {
          userCode: this.pwdForm.userCode,
          tokenCode: this.pwdForm.tokenCode,
          newPassword: md5(this.pwdForm.newPassword),
          verificationCode: this.pwdForm.verificationCode,
          email: this.pwdForm.email+this.pwdForm.emailend
        };
        if (this.validateSuccess) {
          this.initSetPwd(params);
        } else {
          this.$q.notify({
            icon: "warning",
            color: "negative",
            message: "账号码错误，请重新输入！"
          });
        }
      }
    },
    // 请求处理
    initSetPwd(params) {
      this.add=true;
      this.addlabel="提交中"
      api_login.postSetPwd(params).then(res => {
        let { code, message, data } = res.data;
        console.log(code, message, data);
        if (code == "00000000") {
          this.dialog.show = true;
        } else {
          if (Array.isArray(data)) {
            data = message;
          }
          if(code=="00401010"){
            this.oldVerificationCode=this.pwdForm.verificationCode;
            this.codeError=false;
            this.$refs.verificationCode.validate();
          }else{
          this.showMessage = data;
          this.showMsg = true;     
          }
        }
        this.add=false;
        this.addlabel="确定"
      });
    },
    // 粘贴时触发的事件
    handlePaste(){
      return false;
    },
    // 实现拷贝,复制
    handleCopy(){
      return false;
    }
  },
  components: {
    pwdDialog
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
.password-title {
  font-family: PingFangSC-Semibold;
  font-size: 35px;
  line-height: 40px;
  margin-bottom: 60px;
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
.password-input-shape {
  width: 406px;
}

.password-input-item {
  background: #fff;
  border-radius: 4px;
  border-radius: 4px;
  margin-top: 40px;
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

.text-tishi {
  color: #D06263;
}
.mt1x{
  margin-top :1px;
}
.mt20x{
  margin-top :20px;
}
</style>
