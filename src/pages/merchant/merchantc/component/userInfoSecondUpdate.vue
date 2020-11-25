<template>
  <div class="edit-user-info-second">
    <a-form class="edit" :form="form" @submit="handle_save_submit">
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
                          validator: checked_merchant_code,
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
            <div class="flex" style="width:165px; position: relative" v-if="detailObjImg">
              <div class="border-radius-4" :style="detailObjImg? 'border: 1px dashed #c1c1c1': ''">
                <img
                  :src="detailObjImg"
                  v-if="httpUrl_72"
                  class="border-radius-4"
                  alt
                  :style="detailObjImg? 'max-height: 160px; max-width: 160px; padding: 5px;': 'max-height: 165px; max-width: 165px;'"
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
                    v-decorator="[
                    'parentName',
                    { rules: [
                      { required: true, message: '渠道不能为空！' },
                    ]}
                  ]"
                  />
                </a-form-item>
                <!-- v-if="!channelToSecond.id" -->
                <q-btn              
                  class="panda-btn-upload mt5x ml20x"
                  style="width: 50px;"
                  flat
                  @click.stop="handle_channel_dialog"
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
                  <a-form-item v-if="get_detail">
                    <a-range-picker
                      disabled
                      v-if="get_detail.startTime !== undefined && get_detail.endTime !== undefined"
                      :value="[
                        moment(get_detail.startTime, dateFormat),
                        moment(get_detail.endTime, dateFormat)
                      ]"
                      size="large"
                      :placeholder="['开始时间', '结束时间']"
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
          <!-- <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handle_save_submit"
            label="下一步"
          /> -->
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:80px;height:32px; "
            @click="handle_save"
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
      <dialog-select-channel @closeDialog="handle_close_dialog"></dialog-select-channel>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters,mapActions } from 'vuex';
import { api_public,api_merchant  } from "src/api/index.js";
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
import dialogSelectChannel from "src/pages/merchant/merchantc/component/dialogSelectChannel.vue";
import moment from 'moment'
export default {
  mixins: [editOrUpdateMixin],
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),  // 默认图片
      detailObjImg: ''  //图片存储
    }
  },
  components: {
    dialogSelectChannel
  },
  computed: {
    ...mapGetters(['get_detail'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-user-info-second-update" });
  },
  watch: {
    get_detail(val){
      val && (this.get_init_values(),this.init_users(),this.detailObjImg = this.get_detail.logo?"data:image/jpg;base64," + this.get_detail.logo: this.httpUrl_72);
    },
  },
  methods: {
    moment,
    ...mapActions(["set_channel","set_detail"]),
    upload_avatar(event, num) {
      let inputFile = event.target.files[0];
      const isLt2M = inputFile.size / 1024 / 1024 < 5;
      const isWantImage =
        inputFile.type === "image/jpeg" ||
        inputFile.type === "image/png" ||
        inputFile.type === "image/gif" ||
        inputFile.type === "image/tif" ||
        inputFile.type === "image/bmp";
      if (!isWantImage) {
        this.$message.error("只支持上传png/jpeg/tif/gif/bmp,请重新上传！");
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传的图片大小不超过5M,请重新上传");
        return;
      }
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("imageFile", inputFile);
      console.log(event);
      // 清空触发change时间
      event.target.value = "";
      api_public.put_manage_merchant_img_upload(formData).then(res => {
        let code = this.$lodash.get(res, "data.code");
        let data = this.$lodash.get(res, "data");
        if (code == "0000000") {
          let newObj = { ...this.get_detail};
          console.log(newObj)
          newObj.logo = data.data;
          this.set_detail(newObj)
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    /**
     * @description 编辑时初始化数据赋值
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        merchantCode: this.get_detail.merchantCode,
        merchantName: this.get_detail.merchantName,
        parentName: this.get_detail.parentName,
        email: this.get_detail.email,
        country: this.get_detail.country,
        province: this.get_detail.province,
        address: this.get_detail.address,
        pcDomain: this.get_detail.pcDomain,
        h5Domain: this.get_detail.h5Domain,
        appDomain: this.get_detail.appDomain,
      };
      let channelValues = ''
      if(this.get_detail.transferMode === 1){
        channelValues = {
          transferMode: this.get_detail.transferMode,
          url: this.get_detail.url,
          callbackUrl: this.get_detail.callbackUrl,
          balanceUrl: this.get_detail.balanceUrl,
          whiteIp: this.get_detail.whiteIp
        }
      }else{
        channelValues = {
          transferMode: this.get_detail.transferMode,
          whiteIp: this.get_detail.whiteIp
        }
      }
      this.formData.parentId = this.get_detail.parentId;
      this.formData.transferMode = this.get_detail.transferMode;
      this.formData.url = this.get_detail.url;
      this.formData.callbackUrl = this.get_detail.callbackUrl;
      this.formData.balanceUrl = this.get_detail.balanceUrl;
      this.formData.whiteIp = this.get_detail.whiteIp;
      this.set_channel(channelValues);
      console.log(initValues,'initValues')
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    // 选择渠道商户弹窗
    handle_channel_dialog() {
      this.selectChannelShow = true;
    },
    /**
     * @description 关闭选择渠道商户弹窗
     * @param  {Object} record 选择某一个渠道商户的数据
     * @return {undefined} undefined
     */
    handle_close_dialog(record) {
      console.log(record.transferMode,record.childConnectMode,record.directSale)
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
      let initValues = '';
      // 对接渠道
      let channelValues = ''
      if(record.transferMode === 1){
        channelValues = {
          // parentName: record.merchantName,
          transferMode: record.transferMode,
          url: record.url,
          callbackUrl: record.callbackUrl,
          balanceUrl: record.balanceUrl,
          whiteIp: record.whiteIp
        }
      }else{
        channelValues = {
          // parentName: record.merchantName,
          transferMode: record.transferMode,
          whiteIp: record.whiteIp
        }
      }
      this.set_channel(channelValues);
      initValues = {
        parentName: record.merchantName,
      }
      console.table(record);
      this.$nextTick(() => {
        // 对接渠道商户时，url带出来，并且只能为只读！
        this.form.setFieldsValue(initValues);
      });
    },
    /**
     * @description 保存按钮
     * @param  {Object} e 点击保存事件对象
     * @return {undefined} undefined
     */
    handle_save(e){
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.id = this.get_detail.id;
          values.agentLevel = this.get_detail.agentLevel; //商户类型
          values.logo = this.get_detail.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          values.startTime = this.formData.startTime?this.formData.startTime:this.get_detail.startTime;
          values.endTime = this.formData.endTime?this.formData.endTime:this.get_detail.endTime;
          values.parentId = this.formData.parentId;
          values.transferMode = this.formData.transferMode;
          values.whiteIp = this.formData.whiteIp;
          if(values.transferMode === 1){
            values.url = this.formData.url;
            values.callbackUrl = this.formData.callbackUrl;
            values.balanceUrl = this.formData.balanceUrl;
          }
          if(this.handle_need_values(values)){
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("编辑二级商户成功！");
                this.$emit('closeDialog', true)
                // this.$router.go(-1);
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
    /**
     * @description 保存按钮
     * @param  {Object} e 点击保存事件对象
     * @return {undefined} undefined
     */
    handle_save_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.agentLevel = this.detail.agentLevel; //商户类型
          values.logo = this.formData.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          values.startTime = this.formData.startTime?this.formData.startTime:this.get_detail.startTime;
          values.endTime = this.formData.endTime?this.formData.endTime:this.get_detail.endTime;
          values.parentId = this.formData.parentId;
          if(this.handle_need_values(values)){
            console.log(values, "values");
            this.$emit('collect_user_info', values, true);
          }
        }
      });
    },
    handle_need_values(values) {
      if (!values.contact && !values.phone) {
        this.$message.warn("商务联系人或者联系电话不能为空！");
        return false;
      } else {
        return true;
      }
    },
    // 验证商户编号
    checked_merchant_code(rule, value, callback) {
      const form = this.form;
      if (!/^\d{6}$/.test(value)) {
        callback("商户编号只能为6位数字！");
      } else {
        callback();
      }
    },
    /**
     * @description 初始化联系方式
     * @return {undefined} undefined
     */
    init_users() {
      if (this.get_detail.contact) {
        let contacts = this.get_detail.contact.split(",");
        let phones = this.get_detail.phone.split(",");
        let newUsers = [];
        for (let i = 0; i < contacts.length; i++) {
          newUsers.push({
            contact: contacts[i],
            phone: phones[i]
          });
        }
        this.users = newUsers;
      } else {
        this.users = this.users;
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