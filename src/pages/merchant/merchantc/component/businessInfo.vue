<template>
  <div class="busniess-info">
    <a-form class="edit" :form="form" @submit="handle_busniess_submit">
      <div class="col-12">
        <div class="row">
          <div class="pl20x">
            <div class="text-panda-text-7 mb12x fw_600">
              商户等级
              <span class="panda-text-red">*</span>
            </div>
            <div
              class="no-left append-handle-btn-input position-relative"
              @click.stop="handle_level_dialog"
            >
              <a-form-item class="w-160" has-feedback>
                <a-input
                  placeholder="请选择商户等级"
                  autocomplete="off"
                  read-only
                  v-decorator="[
                    'levelName',
                    { rules: [
                      {
                        required: true,
                        message: '商户等级不能为空！',
                      },
                    ]}
                  ]"
                />
              </a-form-item>
            </div>
          </div>
          <div class="flex mb20x ml30x">
            <div class>
              <div class="text-panda-text-7 mb10x fw_600">商户类型</div>
              <div class="append-handle-btn-input row">
                <span
                  class="text-panda-text-7 mt10x"
                >{{detail.agentLevel === "0"? '直营商户': detail.agentLevel == '1'? '渠道商户': '二级商户'}}</span>
              </div>
            </div>
          </div>
          <div class="w-170" style="margin-left: 125px;" v-if="detail.agentLevel === '1'">
              <div class="text-panda-text-7 mb10x">
                <div class="flex justify-between">
                  <div class="email fw_600">
                    二级商户数量限制（家）
                    <span class="panda-text-red">*</span>
                  </div>
                </div>
              </div>
              <div class="append-handle-btn-input row" id="number">
                <a-form-item class="w-170" has-feedback>
                  <a-input-number
                    placeholder="二级商户数量限制"
                    :min="1"
                    :max="1000"
                    v-decorator="[
                      'childMaxAmount',
                      { rules: [
                        {
                          required: true,
                          message: '二级商户数量限制不能为空！',
                        }
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
        </div>
        <!-- 平台费率 -->
        <div class="row">
          <div class="col-3">
            <div class="pl20x">
              <div class="text-panda-text-7 fw_600 mb10x">
                平台费率(%)
                <span class="panda-text-red">*</span>
              </div>
              <div class="no-left append-handle-btn-input position-relative">
                <a-form-item has-feedback class="w-160" >
                  <a-input-number
                    placeholder="请输入平台费率"
                    autocomplete="off"
                    :min="0"
                    :max="100"
                    v-decorator="[
                      'terraceRate',
                      { rules: [
                        {
                          required: true,
                          message: '平台费率不能为空！',
                        },
                      ]}
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                计算标准
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input position-relative w-160">
                <a-form-item>
                  <a-select
                    autocomplete
                    class="w-240"
                    placeholder="请选择计算标准"
                    size="large"
                    v-decorator="[
                      'computingStandard',
                      { rules: [{ required: true, message: '计算标准不能为空！' }] },
                    ]"
                  >
                    <a-select-option
                      :value="item.computingStandard"
                      v-for="(item, index) in computingStandardList"
                      :key="index"
                    >{{item.label}}</a-select-option>
                  </a-select>
                  <!-- <div class="position-absolute select-left-border-new"></div> -->
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                缴纳周期
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input position-relative w-160">
                <a-form-item>
                  <a-select
                    autocomplete
                    placeholder="请选择缴纳周期"
                    size="large"
                    v-decorator="[
                      'paymentCycle',
                      { rules: [{ required: true, message: '缴纳周期不能为空！' }] },
                    ]"
                  >
                    <a-select-option
                      :value="item.paymentCycle"
                      v-for="(item, index) in paymentCycleList"
                      :key="index"
                    >{{item.label}}</a-select-option>
                  </a-select>
                  <!-- <div class="position-absolute select-left-border-new"></div> -->
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 会员费 -->
        <div class="row">
          <div class="col-3">
            <div class="pl20x">
              <div class="text-panda-text-7 fw_600 mb10x">会员费（CNY）</div>
              <div class="append-handle-btn-input">
                <a-form-item>
                  <a-input-number
                    placeholder="请输入会费"
                    autocomplete="off"
                    :min="0"
                    :precision="2"
                    v-decorator="[
                      'vipAmount',
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">缴纳周期</div>
              <div class="append-handle-btn-input position-relative w-160">
                <a-form-item>
                  <a-select
                    autocomplete
                    placeholder="请选择缴纳周期"
                    size="large"
                    v-decorator="[
                      'vipPaymentCycle',
                    ]"
                  >
                    <a-select-option
                      :value="item.vipPaymentCycle"
                      v-for="(item, index) in vipPaymentCycleList"
                      :key="index"
                    >{{item.label}}</a-select-option>
                  </a-select>
                  <!-- <div class="position-absolute select-left-border-new"></div> -->
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 技术服务费 -->
        <div class="row">
          <div class="col-3">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">技术服务费（CNY）</div>
              <div class="append-handle-btn-input">
                <a-form-item>
                  <a-input-number
                    placeholder="请输入技术服务费"
                    autocomplete="off"
                    :min="0"
                    :precision="2"
                    v-decorator="[
                      'techniqueAmount',
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">缴纳周期</div>
              <div class="append-handle-btn-input position-relative w-160">
                <a-form-item>
                  <a-select
                    autocomplete
                    placeholder="请选择缴纳周期"
                    size="large"
                    v-decorator="[
                      'techniquePaymentCycle',
                    ]"
                  >
                    <a-select-option
                      :value="item.techniquePaymentCycle"
                      v-for="(item, index) in techniquePaymentCycleList"
                      :key="index"
                    >{{item.label}}</a-select-option>
                  </a-select>
                  <!-- <div class="position-absolute select-left-border-new"></div> -->
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                结算币种
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input position-relative w-160">
                <a-form-item>
                  <a-select
                    autocomplete
                    class="w-240"
                    placeholder="请选择结算币种"
                    size="large"
                    v-decorator="[
                      'currency',
                      { rules: [{ required: true, message: '结算币种不能为空！' }] },
                    ]"
                  >
                    <a-select-option
                      :value="item.value"
                      v-for="(item, index) in currencyBusList"
                      :key="index"
                    >{{item.label}}</a-select-option>
                  </a-select>
                  <!-- <div class="position-absolute select-left-border-new"></div> -->
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 商户有效期 -->
        <div class="row">
          <div class="col-3">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                Panda商务
                <span class="panda-text-red">*</span>
              </div>
              <div class="append-handle-btn-input position-relative w-160" id="commerce">
                <a-form-item>
                  <a-select
                    showSearch
                    placeholder="请选择Panda商务"
                    optionFilterProp="children"
                    v-decorator="[
                      'commerce',
                      { rules: [
                        {
                          required: true,
                          message: 'Panda商务不能为空！',
                        },
                      ]}
                    ]"
                    :filterOption="filterOption"
                  >
                    <a-select-option
                      v-for="(item, index) in commerceList"
                      :key="index"
                      :value="item.name"
                    >{{item.name}}</a-select-option>
                  </a-select>
                </a-form-item>
                <div class="position-absolute"></div>
              </div>
            </div>
          </div>
          <div class="col-3 ml40x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                商户有效期
                <span class="panda-text-red">*</span>
              </div>
              <div id="time" class="append-handle-btn-input position-relative w-200">
                <a-form-item v-if="isUpdate">
                  <a-range-picker
                    v-if="get_detail.startTime !== undefined && get_detail.endTime !== undefined"
                    @change="on_change"
                    :value="[
                      moment(get_detail.startTime, dateFormat),
                      moment(get_detail.endTime, dateFormat)
                    ]"
                    size="large"
                    :placeholder="['开始时间', '结束时间']"
                  />
                </a-form-item>
                <a-form-item v-else>
                  <a-form-item>
                    <a-range-picker
                      size="large"
                      :placeholder="['开始时间', '结束时间']"
                      v-decorator="['range-picker', rangeConfig]"
                    />
                  </a-form-item>
                </a-form-item>
              </div>
            </div>
          </div>
        </div>
        <!-- 合作协议文件 -->
        <div class="row">
          <div class="col-12 mb20x">
            <div class="pl20x">
              <div class="text-panda-text-7 mb10x fw_600">
                合作协议文件
                <!-- <span class="panda-text-red">*</span> -->
              </div>
              <div class="append-handle-btn-input">
                <div>
                  <div
                    class="text-panda-text-3 cursor-pointer mb10x"
                    v-for="(item, index) in files"
                    :key="index"
                  >
                    <span @click="handle_download(item)">{{item.name}}</span>
                    <span
                      @click="handle_remove(item,index)"
                      class="panda-icon panda-icon-shijian-zujian-shanchu ml10x"
                    ></span>
                  </div>
                </div>
                <a-upload
                  name="file"
                  :multiple="true"
                  :custom-request="custom_upload"
                  :before-upload="before_upload"
                >
                  <a-button>
                    <a-icon type="plus" />
                  </a-button>
                </a-upload>
              </div>
            </div>
          </div>
        </div>
        <!-- 保存取消按钮 -->
        <div class="row flex justify-center mb20x">
          <q-btn
            class="panda-btn-white mr20x"
            style="width:100px;height:32px;border: 1px solid #8A92A5; "
            @click="handlePrevious"
            label="上一步"
          />
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handle_busniess_submit"
            :loading="ajaxLoading"
            label="下一步"
          />
          <q-btn
            v-if="isUpdate"
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:80px;height:32px; "
            @click="handle_busniess_save"
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
import {api_merchant } from "src/api/index.js";
import { mapGetters,mapActions } from 'vuex'
import dialogSelectLevel from "src/pages/merchant/merchantc/component/dialogSelectLevel.vue";
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
import moment from 'moment'
export default {
  mixins: [editOrUpdateMixin],
  props: {
    detail: {
      type: Object,
      default() {
        return {};
      }
    },
    isUpdate: ''
  },
  components: {
    dialogSelectLevel
  },
  computed: {
    ...mapGetters(['get_detail'])
  },
  data() {
    return {
      httpUrl_72: require("src/assets/img/bg1.png")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit-bussiness-info" });
  },
  created(){
    this.commerceList.length == 0  && this.init_commerce_list();
  },
  mounted(){
    this.get_detail && this.get_init_values();
  },
  methods: {
    ...mapActions(['set_detail']),
    moment,
    /**
     * @description 保存按钮
     * @param  {Object} e 点击保存事件对象
     * @return {undefined} undefined
     */
    handle_busniess_save(e){
       e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let filePath = "";
          let fileName = "";
          this.files.map(item => {
            item.file && (filePath += item.file + ";");
            item.name && (fileName += item.name + ";");
          });
          values.fileName = fileName.slice(0, fileName.lastIndexOf(";"));
          values.filePath = filePath.slice(0, filePath.lastIndexOf(";"));
          values.startTime = this.get_detail.startTime;
          values.endTime = this.get_detail.endTime;
          values.level = this.get_detail.level;
          values.id = this.get_detail.id;
          values.vipPaymentCycle =values.vipPaymentCycle === "请选择缴纳周期"? "": values.vipPaymentCycle;
          values.techniquePaymentCycle =values.techniquePaymentCycle === "请选择缴纳周期"? "": values.techniquePaymentCycle;
          // values.status = 1
          if (this.handle_need_values(values)) {
            console.log("Received values of form: ", values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_update(values).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("修改商户商务信息成功！");
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
     * @description 选择日期
     * @param  {Array} value moment时间数组
     * @param  {Array} dateString 格式化时间数组
     * @return {undefined} undefined
     */
    on_change(value, dateString) {
      console.log(value,dateString)
      let detailObj = {...this.get_detail};
      detailObj.startTime = dateString[0];
      detailObj.endTime = dateString[1];
      this.set_detail(detailObj);
    },
    /**
     * @description 编辑时初始化数据赋值
     * @return {undefined} undefined
     */
    get_init_values(){
      let initValues = {
        childMaxAmount: this.get_detail.childMaxAmount,
        currency: this.get_detail.currency,
        commerce: this.get_detail.commerce, //panda商务
        levelName: this.get_detail.levelName,
        terraceRate: this.get_detail.terraceRate,
        computingStandard: this.get_detail.computingStandard,
        paymentCycle: this.get_detail.paymentCycle,
        vipAmount: this.get_detail.vipAmount,
        vipPaymentCycle: this.get_detail.vipPaymentCycle,
        techniqueAmount: this.get_detail.techniqueAmount,
        techniquePaymentCycle: this.get_detail.techniquePaymentCycle
      };
      if(this.detail.agentLevel !== '1'){
        delete initValues.childMaxAmount
      }
      if (this.get_detail.transferMode === 2) {
        delete initValues.url;
        delete initValues.callbackUrl;
        delete initValues.balanceUrl;
      }
      if (!this.get_detail.vipPaymentCycle) {
        delete initValues.vipPaymentCycle;
      }
      if (!this.get_detail.techniquePaymentCycle) {
        delete initValues.techniquePaymentCycle;
      }
      this.$nextTick(() => {
        this.form.setFieldsValue(initValues);
      });
    },
    /**
     * @description 上一步/下一步
     * @return {undefined} undefined
     */
    handlePrevious(){
      this.isUpdate?this.$emit('handlePrevious','businessUpdate'): this.$emit('handlePrevious','business');
    },
    /**
     * @description 编辑时下一步提交逻辑
     * @return {undefined} undefined
     */
    handle_busniess_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          let filePath = "";
          let fileName = "";
          this.files.map(item => {
            item.file && (filePath += item.file + ";");
            item.name && (fileName += item.name + ";");
          });
          values.fileName = fileName.slice(0, fileName.lastIndexOf(";"));
          values.filePath = filePath.slice(0, filePath.lastIndexOf(";"));
          values.level = this.formData.level?this.formData.level: this.get_detail.level;
          // console.log(values, "values");
          if(this.isUpdate){
            values.startTime = this.get_detail.startTime
            values.endTime = this.get_detail.endTime
          }else{
            const rangeValue = values["range-picker"];
            values = {
              ...values,
              startTime: rangeValue[0].format("YYYY-MM-DD"),
              endTime: rangeValue[1].format("YYYY-MM-DD")
            };
          }
          
          console.log(values, "values");
          this.$emit("collect_bus_info", values);
        }
      });
    },
    /**
     * @description 验证当前商务信息数据
     * @param  {Object} values 提交商务信息数据
     * @return {Boolean} false 验证不通过 true 验证通过
     */
    handle_need_values(values) {
      if (values.vipAmount && !values.vipPaymentCycle) {
        this.$message.warn("会员费缴纳周期不能为空！");
        return false;
      } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
        this.$message.warn("技术服务费缴纳周期不能为空！");
        return false;
      } else if (!values.startTime || !values.endTime) {
        this.$message.warn("商户有效期不能为空！");
        return false;
      } else {
        return true;
      }
    }
  },
  watch: {
    "get_detail.filePath": {
      handler(val){
        console.log(val,'文件')
          if (val) {
          let arr = val.split(";");
          let arr1 = [];
          if (this.detail.fileName) {
            arr1 = this.detail.fileName.split(";");
          }
          console.log(arr,arr1,'图片数组')
          let newArr = [];
          if (arr.length > 0) {
            arr.map((item, i) => {
              newArr.push({
                name: arr1[i] || item.slice(item.indexOf("d/") + 2),
                file: item
              });
            });
          }
          console.log(newArr, '新的图片数组')
          this.files = newArr;
        }
      },
      immediate: true
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
>>>.ant-form-explain, .ant-form-extra{
  margin-top: -3px;
}

>>>.ant-select-lg .ant-select-selection__rendered{
  line-height: 30px;
}
</style>