<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-27 20:57:11
 -->
<template>
  <div
    style="width: 340px ; height:auto;max-width:340px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">设置管理员</div>
          <q-space></q-space>
          <q-btn
            class="mr5x text-panda-dialog-close"
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="row pl20x pt20x">
        <div>
          <div class="text-panda-text-7 mb12x fw_600">
            商户管理员用户名
            <span class="panda-text-red">*</span>
          </div>
          <div class="append-handle-btn-input row">
            <q-input
              style=" width:300px;"
              outlined
              ref="username"
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-36px"
              v-model.trim="formData.merchantAdmin"
              placeholder="请输入管理员用户名"
              lazy-rules
              maxlength="30"
              :rules="[
                val => (val && val.length > 0) || '管理员用户名不能为空！',
                val => val.length >= 4 || '管理员用户名最少4位！',
                val =>
                  /^[a-zA-Z]([_a-zA-Z0-9]{3,20})$/.test(val) ||
                  '用户名只能由字母、数字和下划线组成，且必须以字母开头！',
                val =>
                  !noKeysWord.includes(val) ||
                  '不得使用该关键词作为管理员用户名'
              ]"
              :disable="detailObj.merchantAdmin ? true : false"
              :clearable="detailObj.merchantAdmin ? true : false"
            ></q-input>
          </div>
        </div>
      </div>
      <div class="row pl20x mt15x pt20x">
        <div>
          <div class="row flex just-between">
            <div class="text-panda-text-7 mb12x fw_600">
              登录密码
              <span class="panda-text-red">*</span>
            </div>
            <q-btn
              @click="handleGeneratePassword"
              class="panda-btn-upload fs12"
              style="width: 70px; margin-top: -10px; box-sizing: content-box"
              >生成密码</q-btn
            >
          </div>
          <div class="append-handle-btn-input row">
            <q-input
              style=" width:300px;"
              outlined
              ref="password"
              dense
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-36px"
              v-model.trim="detailObj.adminPassword"
              placeholder="请输入登录密码"
              lazy-rules
              :rules="[
                val =>
                  (val !== null && val !== '') ||
                  '生成密码不能为空！请点击生成密码！'
              ]"
              disable
            ></q-input>
          </div>
        </div>
      </div>
      <q-card-section class="fs14">
        <div class="row mt10x">
          <q-space></q-space>
          <div class="row mb10x mr5x">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handleSave"
              label="保存"
            />
            <q-btn
              class="panda-btn-white border-1px"
              style="width:80px;height:32px; "
              v-close-popup
              label="取消"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import log_login_mixin from "src/pages/set/merchantlevel/mixin/index.js";
import { api_merchant } from "src/api/index.js";
export default {
  mixins: [log_login_mixin],
  data() {
    return {
      // httpUrl_72: imgSrc
      httpUrl_72: require("../../../../assets/img/bg.png"),
      formData: {
        // level: ''
        merchantAdmin: "",
        adminPassword: ""
      },
      noKeysWord: [
        "root",
        "admin",
        "administrator",
        "shutdown",
        "apache",
        "tomcat",
        "operator",
        "mail",
        "sync",
        "halt",
        "mysql",
        "nobody",
        "nfsnobody",
        "sshd",
        "rpcuser",
        "hdus",
        "hsqldb"
      ]
    };
  },
  created() {
    this.formData.merchantAdmin = this.detailObj.merchantAdmin;
  },
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  methods: {
    // 保存按钮
    handleSave() {
      this.validate();
      if (this.$refs.username.hasError || this.$refs.password.hasError) {
        this.formHasError = true;
      } else {
        // 前后端联调代码
        if (this.detailObj.merchantAdmin) {
          let params = {
            id: this.detailObj.id,
            adminNewPassword: this.detailObj.adminPassword
          };
          this.initChangePwd(params);
        } else {
          let params = {
            id: this.detailObj.id,
            adminName: this.detailObj.merchantAdmin
              ? this.detailObj.merchantAdmin
              : this.formData.merchantAdmin,
            adminPassword: this.detailObj.adminPassword
          };
          this.initSaveUserInfo(params);
        }
      }
    },
    initChangePwd(params) {
      api_merchant.post_manage_merchant_password_updates(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("修改密码成功");
          this.$emit("closeDialogSetShow");
        } else {
          this.$message.error(msg, 5);
        }
      });
    },
    // 接口代码
    initSaveUserInfo(params) {
      api_merchant.post_manage_merchant_admin_create(params).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.$message.success("设置管理员成功");
          this.$emit("closeDialogSetShow");
        } else {
          this.$message.error(msg + ",请重新输入管理员用户名！", 5);
        }
      });
    },
    validate() {
      this.$refs.username.validate();
      this.$refs.password.validate();
    },
    // 生成密码
    handleGeneratePassword() {
      api_merchant.get_manage_merchant_getPassword({}).then(res => {
        let { code, msg, data } = res.data;
        if (code == "0000000") {
          this.detailObj.adminPassword = res.data.data;
        }
        this.$message.success("生成密码" + msg);
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
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
  font-size: 14px;
}

>>>.q-field__append {
  border-left: 0px;
}
</style>
