<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="商户中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户管理" class="text-panda-text-4" />
        <q-breadcrumbs-el label="新建二级商户" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3 border-radius-4" id="secondEdit">
      <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="row">
              <div class="left mt20x pl40x">
                <div class>
                  <div class="text-panda-text-7 mb10x fw_600">
                    商户编号
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input row">
                    <a-form-item class="w-300" has-feedback>
                      <a-input
                        placeholder="请输入商户编号"
                        maxlength="6"
                        v-decorator="[
                          'merchantCode',
                          { rules: [
                            {
                              validator: checkedMerchantCode,
                            }
                          ]}
                        ]"
                      />
                    </a-form-item>
                  </div>
                </div>
                <div>
                  <div class="text-panda-text-7 mb10x fw_600">
                    商户名称
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input row">
                    <a-form-item class="w-300" has-feedback>
                      <a-input
                        placeholder="请输入商户名称"
                        maxlength="12"
                        v-decorator="[
                          'merchantName',
                          { rules: [
                            { required: true, message: '商户名称不能为空！' },
                          ]}
                        ]"
                      />
                    </a-form-item>
                  </div>
                </div>
                <div class="flex">
                  <div class>
                    <div class="text-panda-text-7 mb10x fw_600">商户类型</div>
                    <div class="append-handle-btn-input row">
                      <span class="text-panda-text-3 mt10x">二级商户</span>
                    </div>
                  </div>
                  <div class="ml40x">
                    <div class="text-panda-text-7 mb10x fw_600">
                      渠道商户
                      <span class="panda-text-red">*</span>
                    </div>
                    <div class="append-handle-btn-input row" id="parentName">
                      <a-form-item class="w-130" has-feedback>
                        <a-input
                          placeholder="渠道商户"
                          read-only
                          v-decorator="[
                          'parentName',
                          { rules: [
                            { required: true, message: '渠道不能为空！' },
                          ]}
                        ]"
                        />
                      </a-form-item>
                      <q-btn
                        v-if="!channelToSecond.id"
                        class="panda-btn-upload mt5x ml20x"
                        style="width: 50px;"
                        flat
                        @click.stop="handleChannelDialog"
                        label="选择"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="right ml80x" style="margin-top: 60px;">
                <div class="flex" style="width:165px; position: relative">
                  <div
                    class="border-radius-4"
                    :style="formData.logo? 'border: 1px dashed #c1c1c1': ''"
                  >
                    <img
                      :src="httpUrl_72"
                      v-if="httpUrl_72"
                      class="border-radius-4"
                      alt
                      :style="formData.logo? 'max-height: 160px; max-width: 160px; padding: 5px;': 'max-height: 165px; max-width: 165px;'"
                    />
                  </div>
                  <div class="position-relative">
                    <input
                      style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:150px; z-index: 1; position: absolute;bottom: -40px;right:0px;"
                      type="file"
                      name="inputfile1"
                      @change="upload_avatar($event)"
                      ref="inputfile1"
                      accept="image/jpeg, image/gif, image/png, image/bmp, image/tif, image/jpg"
                    />
                    <q-btn
                      class="panda-btn-upload mt9x position-absolute"
                      style="bottom: -40px;right:0px; z-index: 0"
                      label="上传LOGO"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div style="clear: both"></div>
            <div class="ml40x w-300">
              <div class="text-panda-text-7 mb10x">
                <div class="flex justify-between">
                  <div class="email fw_600">
                    邮箱地址
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="msg fs12 text-panda-text-3">发送通知的主要邮箱地址</div>
                </div>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-300" has-feedback>
                  <a-input
                    placeholder="请输入邮箱地址"
                    maxlength="18"
                    v-decorator="[
                          'email',
                          { rules: [
                            {
                              type: 'email',
                              message: '邮箱格式不正确！',
                            },
                            {
                              required: true,
                              message: '邮箱地址不能为空！',
                            },
                          ]}
                        ]"
                  />
                </a-form-item>
              </div>
            </div>
            <div class="flex ml40x" v-for="(item, index) in users" :key="'contact' + index">
              <div :key="'contact' + index">
                <div class="text-panda-text-7 mb10x fw_600" v-if="index == 0">
                  商务联系人
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    maxlength="10"
                    outlined
                    :ref="'contact' + index"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="item.contact"
                    placeholder="请输入联系人名称"
                    lazy-rules
                    :rules="[
                      
                    ]"
                  ></q-input>
                </div>
              </div>
              <div v-if="index != 0" class="line-height-36px ml25x">
                <span
                  class="panda-icon panda-icon-qu-chu cursor-pointer"
                  @click="handle_remove_users(index)"
                ></span>
              </div>
              <div :class="index == 0 ? 'ml65x' : 'ml25x'">
                <div class="text-panda-text-7 mb10x fw_600" v-if="index == 0">
                  联系电话
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    maxlength="12"
                    outlined
                    :ref="'phone' + index"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="item.phone"
                    placeholder="请输入联系人电话"
                    lazy-rules
                    :rules="[
                      
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div>
              <q-space></q-space>
              <div style="margin-left: 485px;">
                <q-btn class="panda-btn-upload" @click="handle_add_users">+ 新增联系人</q-btn>
              </div>
            </div>
            <div class="flex ml40x mt10x">
              <div class>
                <div class="text-panda-text-7 mb10x fw_600">国家</div>
                <div class="append-handle-btn-input row">
                  <a-form-item class="w-240">
                    <a-input
                      placeholder="请输入国家名称"
                      maxlength="10"
                      v-decorator="[
                        'country',
                      ]"
                    />
                  </a-form-item>
                </div>
              </div>
              <div class="ml65x">
                <div class="text-panda-text-7 mb10x fw_600">省市地区</div>
                <div class="append-handle-btn-input row">
                  <a-form-item class="w-240">
                    <a-input
                      placeholder="请输入省市地区"
                      maxlength="10"
                      v-decorator="[
                        'province',
                      ]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="row" style="padding-bottom: 70px;">
              <div class="ml40x ">
                <div class="text-panda-text-7 mb12x fw_600">详细地址</div>
                <div class="append-handle-btn-input row">
                  <a-form-item class="w-542">
                    <a-input
                      placeholder="请输入详细地址"
                      maxlength="20"
                      v-decorator="[
                        'address',
                      ]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>
          <!-- 右边区域 -->
          <div class="col-lg-6 col-md-12">
            <!-- 商户钱包类型 -->
            <div class="row mt20x">
              <div class="pl40x">
                <div class="text-panda-text-7 mb10x fw_600">
                  商户钱包类型
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative w-180">
                  <a-form-item>
                    <a-select
                      autocomplete
                      class="w-240"
                      placeholder="请选择商户钱包类型"
                      :disabled="channelToSecond.childConnectMode === 2 || formData.childConnectMode === 2"
                      size="large"
                      @change="handleTransferModeChange"
                      v-decorator="[
                        'transferMode',
                        { rules: [{ required: true, message: '商户钱包类型不能为空！' }] },
                      ]"
                    >
                      <a-select-option
                        :value="item.value"
                        v-for="(item, index) in transferModeList"
                        :key="index"
                      >{{item.label}}</a-select-option>
                    </a-select>
                    <div class="position-absolute select-left-border5"></div>
                  </a-form-item>
                </div>
              </div>
            </div>
            <!-- <div class="row" v-if="formData.directSale == 1 && formData.transferMode == 1 && formData.childConnectMode == 2"> -->
            <div class="row" v-if="formData.transferMode == 1">
              <div class="ml40x">
                <div class="text-panda-text-7 mb10x fw_600">
                  加扣款接口URL
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <a-form-item style="width: 35vw" has-feedback>
                    <a-input
                      placeholder="请输入加扣款接口URL"
                      autocomplete="off"
                      :read-only="channelToSecond.childConnectMode === 2 || formData.childConnectMode === 2"
                      v-decorator="[
                          'url',
                          { rules: [
                            {
                              type: 'url',
                              message: '加扣款接口URL格式不正确！',
                            },
                            {
                              required: true,
                              message: '加扣款接口URL不能为空！',
                            },
                          ]}
                        ]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="row" v-if="formData.transferMode == 1">
              <div class="ml40x">
                <div class="text-panda-text-7 mb10x fw_600">
                  加扣款回调URL
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <a-form-item style="width: 35vw" has-feedback>
                    <a-input
                      placeholder="请输入加扣款回调URL"
                      autocomplete="off"
                      :read-only="channelToSecond.childConnectMode === 2 || formData.childConnectMode === 2"
                      v-decorator="[
                          'callbackUrl',
                          { rules: [
                            {
                              type: 'url',
                              message: '加扣款回调URL格式不正确！',
                            },
                            {
                              required: true,
                              message: '加扣款回调URL不能为空！',
                            },
                          ]}
                        ]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
            <!-- 商户有效期 -->
            <div class="row">
              <div class="col-6">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb10x fw_600">
                    商户有效期
                    <span class="panda-text-red">*</span>
                  </div>
                  <div id="time" class="append-handle-btn-input position-relative w-200">
                    <a-form-item>
                      <a-range-picker
                        size="large"
                        :placeholder="['开始时间', '结束时间']"
                        v-decorator="['range-picker', rangeConfig]"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
            </div>
            <!-- 白名单IP -->
            <div class="row">
              <div class="col-lg-10 col-md-6">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    IP白名单(多个IP白名单以英文“,”分割)
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="">
                    <a-form-item>
                      <a-textarea
                        allow-clear
                        placeholder="请输入IP白名单"
                        autocomplete="off"
                        size='large'
                        v-decorator="[
                          'whiteIp',
                          { rules: [
                            {validator: checkedWhiteIp}
                          ] },
                        ]"
                      />
                    </a-form-item>
                  </div>
                </div>
              </div>
            </div>
            <!-- 保存取消按钮 -->
            <div class="row mt20x pl40x mb20x">
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width:100px;height:32px; "
                @click="handleSubmit"
                :loading="ajaxLoading"
                flat
                label="保存"
              />
              <q-btn
                class="panda-btn-white border-1px"
                flat
                style="width:80px;height:32px;"
                @click="handle_cancel"
                label="取消"
              />
            </div>
          </div>
        </div>
        <!-- </form> -->
      </a-form>
    </div>
    <!-- 选择商户等级 -->
    <q-dialog
      v-model="selectChannelShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-select-channel @closeDialog="handleCloseDialog"></dialog-select-channel>
    </q-dialog>
  </div>
</template>

<script>
import { api_public, api_base, api_merchant,FILE_PREFIX } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
import dialogSelectChannel from "src/pages/merchant/merchantc/component/dialogSelectChannel.vue";

export default {
  mixins: [commontoolmixin, editOrUpdateMixin],
  components: {
    dialogSelectChannel
  },
  data() {
    return {
      httpUrl_72: require("../../../assets/img/bg1.png")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "secondEdit" });
  },
  computed: {
    channelName() {
      return this.$route.query.channelName || "";
    },
    channelToSecond() {
      return this.$q.sessionStorage.getItem('channelToSecond') || {};
    }
  },
  created() {
    this.init_random_number();
    this.initChannelMerchant();
  },
  destroyed(){
    if(this.channelToSecond){
      this.$q.sessionStorage.remove('channelToSecond')
    }
  },
  methods: {
    initChannelMerchant() {
      console.log(this.$route.query.channelName, "initChannelMerchant");
      console.warn(this.channelToSecond,'channelToSecond')
      if(this.channelToSecond){
        this.formData.transferMode = this.channelToSecond.transferMode; //控制url是否显示
        this.$nextTick(() => {       
          this.form.setFieldsValue({
            parentName: this.channelToSecond.merchantName,
            transferMode: this.channelToSecond.transferMode,
            url: this.channelToSecond.url,
            callbackUrl: this.channelToSecond.callbackUrl
          });
        });
      }
    },
    // 关闭选择渠道弹窗
    handleCloseDialog(record) {
      console.log(record.transferMode,record.childConnectMode,record.directSale)
      this.selectChannelShow = false;
      this.formData.transferMode = record.transferMode;
      this.formData.parentId = record.id;
      this.formData.childConnectMode = record.childConnectMode; //渠道商户对接模式=> 1 对接panda 2 对接渠道 控制是否显示只读
      // this.formData.transferMode = record.childConnectMode === 2 ? 1 : ""; //控制url是否显示
      this.$message.success(`您选择了渠道商户： ${record.merchantName}`);
      console.table(record);
      this.$nextTick(() => {
        // 对接渠道商户时，url带出来，并且只能为只读！
        let initValues = '';
        if(record.childConnectMode === 2){
          // 对接渠道
          if(record.transferMode === 1){
            initValues = {
              parentName: record.merchantName,
              transferMode: record.transferMode,
              url: record.url,
              callbackUrl: record.callbackUrl
            }
          }else{
            initValues = {
              parentName: record.merchantName,
              transferMode: record.transferMode
            }
          }  
        }else{
          // 对接panda
          if (record.transferMode === 1) {
            initValues = {
              parentName: record.merchantName,
              transferMode: record.transferMode,
              url: '',
              callbackUrl: ''
            };
          } else {
            initValues = {
              parentName: record.merchantName,
              transferMode: record.transferMode === undefined? '请选择商户钱包类型':record.transferMode
            };
          }
        }
        this.form.setFieldsValue(initValues);
        // if (record.childConnectMode === 2) {
        //   this.form.setFieldsValue({
        //     parentName: record.merchantName,
        //     transferMode: record.transferMode,
        //     url: record.url,
        //     callbackUrl: record.callbackUrl
        //   });
        // }else{
        //   this.form.setFieldsValue({
        //     parentName: record.merchantName
        //   });
        // }
      });
    },
    // 选择渠道商户弹窗
    handleChannelDialog() {
      this.selectChannelShow = true;
    },
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if(values.transferMode === '请选择商户钱包类型'){
            this.$message.warn('钱包类型不能为空！')
            return;
          }
          values.agentLevel = 2; //商户类型
          values.logo = this.formData.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          values.parentId = this.channelToSecond.id? this.channelToSecond.id: this.formData.parentId;
          const rangeValue = values["range-picker"];
          values = {
            ...values,
            startTime: rangeValue[0].format("YYYY-MM-DD"),
            endTime: rangeValue[1].format("YYYY-MM-DD")
          };
          console.log(values, "values");
          if (this.handleNeedValues(values)) {
            let params = this.delete_empty_property_with_exclude(values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_create(params).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("新建二级商户成功！");
                this.$router.go(-1);
                this.handleRouteParams();
              } else {
                this.$message.error(msg);
                this.ajaxLoading = false;
              }
            });
          }
        }
      });
    },
    handleNeedValues(values) {
      if (!values.contact && !values.phone) {
        this.$message.warn("商务联系人或者联系电话不能为空！");
        return false;
      } else {
        return true;
      }
    },
    // 验证商户编号
    checkedMerchantCode(rule, value, callback) {
      const form = this.form;
      if (!/^\d{6}$/.test(value)) {
        callback("商户编号只能为6位数字！");
      } else {
        callback();
      }
    },
    // 钱包类型
    handleTransferModeChange(val) {
      this.formData.transferMode = val;
    },
    //生成随机6位数字
    init_random_number() {
      let merchantCode = Math.random()
        .toString()
        .slice(-6);
      this.$nextTick(() => {
        this.form.setFieldsValue({ merchantCode });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>#secondEdit .ant-input {
  min-height: 36px;
  line-height: 36px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>#secondEdit .ant-select-selection--single {
  height: 36px;
  line-height: 36px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 36px;
}

>>>#secondEdit .ant-select-selection__placeholder, .ant-select-search__field__placeholder {
  font-size: 12px;
  margin-top: -12px;
}

>>>#secondEdit .ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 34px;
  // margin-top: 5px;
}

>>>#secondEdit .ant-input-number {
  width: 180px;
  height: 36px;
  font-size: 12px;
  line-height: 36px;
}

>>>#number .ant-input-number {
  width: 300px;
}

>>>#time .ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  padding: 0px;
}

>>>#parentName .ant-input {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 11px;
}

// 复写input框
>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--dense .q-field__marginal {
  height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__control {
  min-height: 36px;
}

>>>.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 36px;
}

// form表单input样式重写
>>>.q-field__bottom--animated {
  bottom: 6px;
}

>>>.q-field__marginal {
  font-size: 14px;
}

>>>.q-field__native, .q-field__prefix, .q-field__suffix {
  font-size: 12px;
}

>>>.ant-upload-list {
  display: none;
}

>>>.ant-upload.ant-upload-select {
  height: 36px;
  line-height: 36px;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 36px;
}

>>>.ant-select-disabled .ant-select-selection{
  background: #fff;
  color: #666;
}
</style>
