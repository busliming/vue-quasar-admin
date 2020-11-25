<template>
  <div class="busniess-info">
    <a-form class="edit" :form="form" @submit="handle_tech_second_submit">
      <div class="col-12">
        <div class="row">
          <div class="pl20x">
            <div class="text-panda-text-7 mb10x fw_600">
              商户钱包类型111{{channelToSecond.transferMode}}
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-160">
              <a-form-item>
                <a-select
                  autocomplete
                  class="w-240"
                  placeholder="请选择商户钱包类型"
                  disabled
                  size="large"
                  @change="handleTransfeiModeChange"
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
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">
              加扣款接口URL
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入加扣款接口URL"
                  read-only
                  disabled
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
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">
              加扣款回调URL
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入加扣款回调URL"
                  autocomplete="off"
                  read-only
                  disabled
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
          <div class="ml20x">
            <div class="text-panda-text-7 mb10x fw_600">余额回调URL</div>
            <div class="append-handle-btn-input row">
              <a-form-item style="width: 35vw" has-feedback>
                <a-input
                  placeholder="请输入余额回调URL"
                  autocomplete="off"
                  read-only
                  disabled
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
                    read-only
                    disabled
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
            @click="handle_tech_second_submit"
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
    <q-dialog v-model="selectLevelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-select-level @closeSelectDialog="handle_close_dialog_select"></dialog-select-level>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
    }
  },
  components: {
    dialogSelectLevel
  },
  computed: {
    ...mapGetters(['get_channel','get_detail']),
    channelToSecond() {
      return this.$q.sessionStorage.getItem('channelToSecond') || {};
    }
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-tech-info-second" });
  },
  created(){
    this.init_channel_merchant();
  },
  mounted(){   
    this.get_detail !== null && this.get_init_values()
  },
  watch: {
    get_channel: {
      handler(val){
        this.formData = {...val}
        this.$nextTick(() => {
          this.form.setFieldsValue(val);    
        })
      },
      immediate: true,
    }
  },
  methods: {
    /**
     * @description 渠道商户处理点击设置二级商户进来初始化数据
     * @return {undefined} undefined
     */
    init_channel_merchant() {
      if(this.channelToSecond.id){
        this.formData.transferMode = this.channelToSecond.transferMode; //控制url是否显示
        let initValues = ''
        if(this.channelToSecond.transferMode == 1){
          initValues = {
            transferMode: this.channelToSecond.transferMode,
            url: this.channelToSecond.url,
            callbackUrl: this.channelToSecond.callbackUrl,
            balanceUrl: this.channelToSecond.balanceUrl,
            whiteIp: this.channelToSecond.whiteIp
          }     
          if(!this.channelToSecond.balanceUrl){
            delete initValues.balanceUrl;
          }
        }else{
          initValues = {
            transferMode: this.channelToSecond.transferMode,
            whiteIp: this.channelToSecond.whiteIp
          }
        }
        console.error(initValues,'initValues')
        this.$nextTick(() => {       
          this.form.setFieldsValue(initValues);
        });
      }
    },
    /**
     * @description 
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        whiteIp: this.get_detail.whiteIp
      };
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    handle_previous() {
      this.$emit("handle_previous",'techInfoSecond');
    },
    handleTransfeiModeChange(val) {
      this.formData.transferMode = val;
    },
    handle_tech_second_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log(values, "values");
          values.status = 1
          this.$emit("collect_tech_info", values);
        }
      });
    },
    handleNeedValues(values) {
      if (values.vipAmount && !values.vipPaymentCycle) {
        this.$message.warn("会员费缴纳周期不能为空！");
        return false;
      } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
        this.$message.warn("技术服务费缴纳周期不能为空！");
        return false;
      } else {
        return true;
      }
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