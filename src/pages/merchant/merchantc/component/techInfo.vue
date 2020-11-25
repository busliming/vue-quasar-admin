<template>
  <div class="busniess-info">
    <a-form class="edit" :form="form" @submit="handle_tech_submit">
      <div class="col-12">
        <div class="row">
          <div class="pl20x">
            <div class="text-panda-text-7 mb10x fw_600">
              商户钱包类型
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  autocomplete
                  class="w-240"
                  placeholder="请选择商户钱包类型"
                  size="large"
                  @change="handle_transfer_mode_change"
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
                <!-- <div class="position-absolute select-left-border-new"></div> -->
              </a-form-item>
            </div>
          </div>
        </div>
        <div class="row" v-if="formData.transferMode == 1">
          <div class="ml20x col-11">
            <div class="text-panda-text-7 mb10x fw_600">
              加扣款接口URL
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入加扣款接口URL"
                  autocomplete="off"
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
          <div class="ml20x col-11">
            <div class="text-panda-text-7 mb10x fw_600">
              加扣款回调URL
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入加扣款回调URL"
                  autocomplete="off"
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
        <div class="row" v-if="formData.transferMode == 1">
          <div class="ml20x col-11">
            <div class="text-panda-text-7 mb10x fw_600">余额回调URL</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入余额回调URL"
                  autocomplete="off"
                  v-decorator="[
                    'balanceUrl'
                  ]"
                />
              </a-form-item>
            </div>
          </div>
        </div>
        <!-- 白名单IP -->
        <div class="row">
          <div class="col-11">
            <div class="pl20x">
              <div class="text-panda-text-7 mb12x fw_600">
                IP白名单(多个IP白名单以英文“,”分割)
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input">
                <a-form-item>
                  <a-textarea
                    allow-clear
                    placeholder="请输入IP白名单"
                    autocomplete="off"
                    size="large"
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
            class="panda-btn-white mr20x"
            style="width:100px;height:32px;border: 1px solid #8A92A5; "
            @click="handle_previous"
            label="上一步"
          />
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handle_tech_submit"
            :loading="isUpdate? ajaxLoading: ajaxLoading1"
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
    <q-dialog v-model="selectLevelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-select-level @closeSelectDialog="handle_close_dialog_select"></dialog-select-level>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { api_merchant } from "src/api/index.js";
import dialogSelectLevel from "src/pages/merchant/merchantc/component/dialogSelectLevel.vue";
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
export default {
  mixins: [editOrUpdateMixin],
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    },
    ajaxLoading1: '',
    isUpdate: ''
  },
  data(){
    return {
      ajaxLoading: ''
    }
  },
  components: {
    dialogSelectLevel
  },
  computed: {
    ...mapGetters(['get_channel','get_detail'])
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-tech-info" });
  },
  mounted(){
    this.get_detail && this.get_init_values()
  },
  methods: {
    /**
     * @description 编辑时初始化数据显示
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        url: this.get_detail.url,
        callbackUrl: this.get_detail.callbackUrl,
        balanceUrl: this.get_detail.balanceUrl,
        transferMode: this.get_detail.transferMode,
        whiteIp: this.get_detail.whiteIp,
        pcDomain: this.get_detail.pcDomain,
        h5Domain: this.get_detail.h5Domain,
        appDomain: this.get_detail.appDomain,
      };
      this.formData.transferMode = this.get_detail.transferMode;
      if (this.get_detail.transferMode === 2) {
        delete initValues.url;
        !this.get_detail.balanceUrl && delete initValues.callbackUrl;
        delete initValues.balanceUrl;
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    /**
     * @description 上一步按钮
     * @return {undefined} undefined
     */
    handle_previous() {
      this.$emit("handle_previous",'techInfo');
    },
    /**
     * @description 钱包类型选择
     * @return {undefined} undefined
     */
    handle_transfer_mode_change(val) {
      this.formData.transferMode = val;
    },
    /**
     * @description 保存按钮
     * @param  {Object} e 点击保存事件对象
     * @return {undefined} undefined
     */
    handle_tech_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values,this.isUpdate, "values");
          values.id = this.detail.id
          // values.status = 1;
          if(this.isUpdate){
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading1 = false;
                this.$message.success("修改商户技术参数成功！");
                this.$emit('closeDialog', true)
              } else {
                this.$message.error(msg);
                this.ajaxLoading = false;
              }
            });
          }else{
            this.$emit("collect_tech_info", values);
          }
        }
      });
    }
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
  margin-top: -10px;
}

>>>.ant-select-selection-selected-value {
  font-size: 12px;
  line-height: 28px;
  margin-top: 0px;
}

>>>.ant-input-number {
  width: 160px;
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

>>>.ant-form-explain, .ant-form-extra {
  margin-top: -3px;
}

>>>.ant-select-lg .ant-select-selection__rendered {
  line-height: 30px;
}
</style>