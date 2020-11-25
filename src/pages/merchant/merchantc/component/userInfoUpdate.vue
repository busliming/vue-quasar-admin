<template>
  <a-form class="edit" :form="form" @submit="handle_user_submit">
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
        <div class="right ml80x" style="margin-top: 25px;" v-if="detailObjImg">
          <div class="flex" style="width:165px;position: relative">
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
      <!-- 保存取消按钮 -->
      <div class="row flex justify-center mb20x">
        <q-btn
          class="panda-btn-primary-dense bg-primary mr20x"
          style="width:100px;height:32px; "
          @click="handle_user_submit"
          label="下一步"
        />
        <q-btn
          class="panda-btn-primary-dense bg-primary mr20x"
          style="width:100px;height:32px; "
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
</template>

<script>
import { api_public,api_merchant  } from "src/api/index.js";
import { mapGetters, mapActions } from 'vuex'
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
export default {
  mixins: [editOrUpdateMixin],
  props: {
    
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png"),
      detailObjImg: ''
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-user-info-update" });
  },
  computed: {
    ...mapGetters(['get_detail']),
    // detailObjImg() { 
    //   console.log(this.get_detail)
    //   return this.get_detail.logo? "data:image/jpg;base64," + this.get_detail.logo: this.httpUrl_72;
    // }
  },
  deactivated () {
      console.log('收集信息！！！')
  },
  watch: {
    get_detail(val){
      val && (this.get_init_values(),this.init_users(),this.detailObjImg = this.get_detail.logo?"data:image/jpg;base64," + this.get_detail.logo: this.httpUrl_72);
    },
    "get_detail.filePath"(val) {
      if (val) {
        let arr = val.split(";");
        let arr1 = [];
        if (this.get_detail.fileName) {
          arr1 = this.get_detail.fileName.split(";");
        }
        let newArr = [];
        if (arr.length > 0) {
          arr.map((item, i) => {
            newArr.push({
              name: arr1[i] || item.slice(item.indexOf("d/") + 2),
              file: item
            });
          });
        }
        this.files = newArr;
      }
    },
  },
  methods: {
    ...mapActions(['set_detail']),
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
          // values.status = 1
          if(this.handle_need_values(values)){
            console.log(values, "values");
            // this.$emit('collect_user_info', values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("修改商户基本信息成功！");
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
          // 更新vuex里面存储的图片信息
          this.set_detail(newObj)
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
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
    /**
     * @description 编辑时初始化数据赋值
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        merchantCode: this.get_detail.merchantCode,
        merchantName: this.get_detail.merchantName,
        email: this.get_detail.email,
        country: this.get_detail.country,
        province: this.get_detail.province,
        address: this.get_detail.address,
        parentName: this.get_detail.parentName,
      };
      console.log(initValues,'initValues')
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    /**
     * @description 下一步按钮
     * @param  {Object} e 点击保存事件对象
     * @return {undefined} undefined
     */
    handle_user_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.agentLevel = this.get_detail.agentLevel; //商户类型
          values.logo = this.formData.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          if(this.handle_need_values(values)){
            console.log(values, "values");
            this.$emit('collect_user_info', values);
          }
        }
      });
    },
    /**
     * @description 验证当前商务信息数据
     * @param  {Object} values 提交商务信息数据
     * @return {Boolean} false 验证不通过 true 验证通过
     */
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