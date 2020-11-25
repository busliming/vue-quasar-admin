<template>
  <div class="edit-user-info-second">
    <a-form class="edit" :form="form" @submit="handleUserSubmit">
      <div class="col-lg-6 col-md-12">
        <div class="row">
          <div class="left pl20x">
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
          </div>
          <div class="right ml80x" style="margin-top: 25px;">
            <div class="flex" style="width:165px; position: relative">
              <div class="border-radius-4" :style="formData.logo? 'border: 1px dashed #c1c1c1': ''">
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
        <div class="ml20x w-300">
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
        <div class="flex ml20x" v-for="(item, index) in users" :key="'contact' + index">
          <div :key="'contact' + index">
            <div class="text-panda-text-7 mb12x fw_600" v-if="index == 0">
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
            <div class="text-panda-text-7 mb12x fw_600" v-if="index == 0">
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
          <div style="margin-left: 465px;">
            <q-btn class="panda-btn-upload" @click="handle_add_users">+ 新增联系人</q-btn>
          </div>
        </div>
        <div class="flex ml20x mt10x">
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
        <div class="row">
          <div class="ml20x">
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
        <!-- 商户有效期 -->
          <div class="row">
            <div class="ml20x">
              <div class="text-panda-text-7 mb10x fw_600">
                渠道商户
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input row">
                <a-form-item class="w-130" has-feedback>
                  <a-input
                    placeholder="渠道商户"
                    read-only
                    disabled
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
            <div class="col-3 ml65x" style="margin-left: 86px;">
              <div class="pl20x">
                <div class="text-panda-text-7 mb10x fw_600">
                  商户有效期
                  <span class="panda-text-red">*</span>
                </div>
                <div id="time" class="append-handle-btn-input position-relative w-200">
                  <a-form-item v-if="channelToSecond.id">
                    <a-range-picker
                      disabled
                      v-if="channelToSecond.startTime !== undefined && channelToSecond.endTime !== undefined"
                      :value="[
                        moment(channelToSecond.startTime, dateFormat),
                        moment(channelToSecond.endTime, dateFormat)
                      ]"
                      size="large"
                      :placeholder="['开始时间', '结束时间']"
                    />
                  </a-form-item>
                  <a-form-item  v-else-if="formData.parentId">
                    <a-range-picker
                      disabled
                      v-if="formData.startTime !== undefined && formData.endTime !== undefined"
                      size="large"
                      :value="[
                        moment(formData.startTime, dateFormat),
                        moment(formData.endTime, dateFormat)
                      ]"
                      :placeholder="['开始时间', '结束时间']"
                    />
                  </a-form-item>
                  <a-form-item v-else>
                    <a-range-picker
                      disabled
                      size="large"
                      :placeholder="['开始时间', '结束时间']"
                      v-decorator="['range-picker', rangeConfig]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>
          </div>
        <!-- Panda PC域名 -->
        <div class="row">
          <div class="col-11 ml20x">
            <div class="text-panda-text-7 mb10x fw_600">Panda PC域名</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 39vw" has-feedback>
                <a-input
                  placeholder="请输入Panda PC域名"
                  autocomplete="off"
                  v-decorator="[
                    'pcDomain'
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- Panda H5域名 -->
        <div class="row">
          <div class="col-11 ml20x">
            <div class="text-panda-text-7 mb10x fw_600">Panda H5域名</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 39vw" has-feedback>
                <a-input
                  placeholder="请输入Panda H5域名"
                  autocomplete="off"
                  v-decorator="[
                    'h5Domain'
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- Panda App域名 -->
        <div class="row">
          <div class="col-11 ml20x">
            <div class="text-panda-text-7 mb10x fw_600">Panda App域名</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 39vw" has-feedback>
                <a-input
                  placeholder="Panda App域名"
                  autocomplete="off"
                  v-decorator="[
                    'appDomain'
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- 保存取消按钮 -->
        <div class="row flex justify-center mb20x">
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handleUserSubmit"
            :loading="ajaxLoading" 
            label="保存"
          />
          <q-btn
            class="panda-btn-white"
            style="width:80px;height:32px;border: 1px solid #8A92A5; "
            @click="handle_cancel"
            label="取消"
          />
        </div>
      </div>
    </a-form>
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
import { mapActions } from 'vuex';
import { api_merchant } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
import dialogSelectChannel from "src/pages/merchant/merchantc/component/dialogSelectChannel.vue";
import moment from 'moment'
export default {
  mixins: [editOrUpdateMixin,commontoolmixin],
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  components: {
    dialogSelectChannel
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png")
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-user-info-second" });
  },
  created(){
    this.init_random_number();
  },
  mounted(){
    this.channelToSecond.id && this.initChannelMerchant();
  },
  computed: {
    channelToSecond() {
      return this.$q.sessionStorage.getItem('channelToSecond') || {};
    }
  },
  methods: {
    moment,
    ...mapActions(["set_channel"]),
    // 选择渠道商户弹窗
    handleChannelDialog() {
      this.selectChannelShow = true;
    },
    // 处理点击设置二级商户进来初始化数据
    initChannelMerchant() {
      if(this.channelToSecond){
        this.formData.parentId = this.channelToSecond.id
        this.formData.transferMode = this.channelToSecond.transferMode;
        this.formData.url = this.channelToSecond.url;
        this.formData.callbackUrl = this.channelToSecond.callbackUrl; 
        this.formData.balanceUrl = this.channelToSecond.balanceUrl;
        this.formData.whiteIp = this.channelToSecond.whiteIp; 
        this.$nextTick(() => {       
          this.form.setFieldsValue({
            parentName: this.channelToSecond.merchantName,
          });
        });
      }
    },
    // 关闭选择渠道弹窗
    handleCloseDialog(record) {
      console.log(record)
      this.selectChannelShow = false;
      this.formData.transferMode = record.transferMode;
      this.formData.parentId = record.id;
      this.formData.childConnectMode = record.childConnectMode; //渠道商户对接模式=> 1 对接panda 2 对接渠道 控制是否显示只读
      this.formData.startTime = record.startTime;
      this.formData.endTime = record.endTime;
      this.formData.url = record.url;
      this.formData.callbackUrl = record.callbackUrl;
      this.formData.balanceUrl = record.balanceUrl;
      this.formData.whiteIp = record.whiteIp;
      this.$message.success(`您选择了渠道商户： ${record.merchantName}`);
      console.log(record.transferMode,record.url,record.callbackUrl,record.balanceUrl,record.whiteIp);
      let initValues = '';
        // 对接渠道
        let channelValues = ''
        if(record.transferMode === 1){
          channelValues = {
            transferMode: record.transferMode,
            url: record.url,
            callbackUrl: record.callbackUrl,
            balanceUrl: record.balanceUrl,
            whiteIp: record.whiteIp
          }
        }else{
          channelValues = {
            transferMode: record.transferMode,
            whiteIp: record.whiteIp
          }
        }
        this.set_channel(channelValues);
        initValues = {
          parentName: record.merchantName,
        }
      this.$nextTick(() => {       
        this.form.setFieldsValue(initValues);
      });
    },
    handleUserSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.logo = this.formData.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          values.startTime = this.channelToSecond.startTime?this.channelToSecond.startTime: this.formData.startTime;
          values.endTime = this.channelToSecond.endTime?this.channelToSecond.endTime: this.formData.endTime;
          values.parentId = this.formData.parentId;
          values.transferMode = this.formData.transferMode;
          values.whiteIp = this.formData.whiteIp;
          values.pageMode = this.channelToSecond.pageMode?this.channelToSecond.pageMode: '';
          if(values.transferMode === 1){
            values.url = this.formData.url;
            values.callbackUrl = this.formData.callbackUrl;
            values.balanceUrl = this.formData.balanceUrl;
          }
          if(this.handleNeedValues(values)){
            console.log(values, "values");
            values.agentLevel = '2'; //商户类型
            let params = this.delete_empty_property_with_exclude(values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_create(params).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                let message = '新建二级商户'
                this.$message.success(`${message}成功！`);
                this.$emit('closeDialog', true);
                // 处理页面回旋问题
                // this.handleRouteParams();
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
  }
};
</script>

<style lang="stylus" scoped>
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
  height: 30px;
  line-height: 30px;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 30px;
}

>>>.ant-input {
  min-height: 30px;
  line-height: 30px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-select-selection--single {
  height: 30px;
  line-height: 30px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 30px;
}

>>>.ant-select-selection__placeholder, .ant-select-search__field__placeholder {
  font-size: 12px;
  margin-top: -12px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 34px;
  // margin-top: 5px;
}

>>>.ant-input-number {
  width: 180px;
  height: 30px;
  font-size: 12px;
  line-height: 30px;
}

>>>#time .ant-input {
  height: 30px;
  line-height: 30px;
  font-size: 12px;
  padding: 0 11px;
}


// 复写input框
>>>.q-field--dense .q-field__control, .q-field--dense .q-field__marginal {
  height: 30px;
}

>>>.q-field--dense .q-field__marginal {
  height: 30px;
}

>>>.q-field--auto-height.q-field--dense .q-field__control {
  min-height: 30px;
}

>>>.q-field--auto-height.q-field--dense .q-field__native {
  min-height: 30px;
}

</style>