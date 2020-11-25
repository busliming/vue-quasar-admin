<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 21:49
 -->
<template>
  <div style="width: 600px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">编辑商户等级</div>
          <q-space></q-space>
          <q-btn
            flat
            dense
            icon="close"
            v-close-popup
            class="text-panda-dialog-close"
          />
        </div>
      </q-card-section>
      <!-- <q-separator></q-separator> -->
      <q-card-section class="fs14 mt20x">
        <a-form
          id="components-form-update"
          class="update"
          :form="form"
          @submit="handle_submit"
        >
          <a-form-item>
            <div class="flex" style="width:165px; position: relative">
              <div
                class="border-radius-4"
                :style="detailObj.logo ? 'border: 1px dashed #c1c1c1' : ''"
              >
                <img
                  :src="detailObjImg"
                  v-if="httpUrl_72"
                  class="border-radius-4"
                  alt
                  :style="
                    detailObj.logo
                      ? 'max-height: 160px; max-width: 160px; padding: 5px;'
                      : 'max-height: 165px; max-width: 165px;'
                  "
                />
              </div>

              <div
                class
                style="position: absolute; bottom: 0px; right: -200px;z-index: 2"
              >
                <input
                  style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:200px;"
                  type="file"
                  name="inputfile1"
                  @change="upload_avatar($event)"
                  ref="inputfile1"
                  accept="image/jpeg, image/gif, image/png, image/bmp"
                />
              </div>
              <div
                class
                style="position: absolute; bottom: 0; right: -130px; z-index: 1"
              >
                <q-btn class="panda-btn-upload mt9x" label="上传LOGO" />
              </div>
            </div>
          </a-form-item>
          <a-form-item>
            <div class="text-panda-text-7 fw_600">
              商户等级
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input w-170">
              <a-input
                placeholder="请输入商户等级"
                size="large"
                disabled
                v-decorator="['level']"
              />
            </div>
          </a-form-item>

          <div class="mt20x row">
            <div>
              <div class="text-panda-text-7 mb10x fw_600">
                平台费率
                <span class="panda-text-red">*</span>
              </div>
              <div
                class="append-handle-btn-input position-relative w-170"
                @click.stop="handle_rate_dialog"
              >
                <a-form-item>
                  <a-input
                    placeholder="请输入平台费率"
                    size="large"
                    addonAfter="%"
                    read-only
                    v-decorator="['terraceRate']"
                  />
                </a-form-item>
              </div>
            </div>
            <div class="ml25x">
              <div class="text-panda-text-7 mb10x fw_600">计算标准</div>
              <div class="append-handle-btn-input position-relative w-170">
                <a-form-item>
                  <a-select
                    placeholder="请选择计算标准"
                    size="large"
                    hasFeedback
                    disabled
                    v-decorator="['computingStandard']"
                  >
                    <a-select-option
                      :value="item.computingStandard"
                      v-for="(item, index) in computingStandardList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border3"></div>
                </a-form-item>
              </div>
            </div>
            <div class="ml25x">
              <div class="text-panda-text-7 mb10x fw_600">缴纳周期</div>
              <div class="append-handle-btn-input position-relative w-170">
                <a-form-item>
                  <a-select
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    disabled
                    v-decorator="['paymentCycle']"
                  >
                    <a-select-option
                      :value="item.paymentCycle"
                      v-for="(item, index) in paymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border3"></div>
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="row">
            <a-form-item>
              <div class="text-panda-text-7 fw_600">会员费 (万元)</div>
              <div class="no-left append-handle-btn-input position-relative">
                <a-input-number
                  placeholder="请输入会员费"
                  autocomplete="off"
                  size="large"
                  :min="0"
                  allowClear
                  :precision="2"
                  v-decorator="['vipAmount']"
                ></a-input-number>
              </div>
            </a-form-item>
            <div class="ml25x">
              <a-form-item>
                <div class="text-panda-text-7 fw_600">缴纳周期</div>
                <div class="append-handle-btn-input position-relative w-170">
                  <a-select
                    autocomplete
                    class="w-170"
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    v-decorator="['vipPaymentCycle']"
                  >
                    <a-select-option
                      :value="item.vipPaymentCycle"
                      v-for="(item, index) in vipPaymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="row">
            <a-form-item>
              <div class="text-panda-text-7 fw_600">技术服务费 (万元)</div>
              <div class="no-left append-handle-btn-input position-relative">
                <a-input-number
                  placeholder="请输入技术服务费"
                  autocomplete="off"
                  size="large"
                  :min="0"
                  :max="10000"
                  :precision="2"
                  v-decorator="['techniqueAmount']"
                />
              </div>
            </a-form-item>
            <div class="ml25x">
              <a-form-item>
                <div class="text-panda-text-7 fw_600">缴纳周期</div>
                <div class="append-handle-btn-input position-relative w-170">
                  <a-select
                    autocomplete
                    class="w-170"
                    placeholder="请选择缴纳周期"
                    size="large"
                    hasFeedback
                    v-decorator="['techniquePaymentCycle']"
                  >
                    <a-select-option
                      :value="item.techniquePaymentCycle"
                      v-for="(item, index) in techniquePaymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border4"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <div class="row mt10x mb20x">
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handle_submit"
              label="保存"
            />
            <q-btn
              class="panda-btn-white border-1px"
              style="width:80px;height:32px;"
              v-close-popup
              label="取消"
            />
          </div>
        </a-form>
      </q-card-section>
    </q-card>
    <!-- 选择费率等级 -->
    <q-dialog
      v-model="selectLevelShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-select-rate
        @closeSelectRate="handle_close_dialog_rate"
      ></dialog-select-rate>
    </q-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { api_public, api_base, api_merchant } from "src/api/index.js";
import dialogSelectRate from "src/pages/set/merchantlevel/component/dialogSelectRate.vue";
export default {
  data() {
    return {
      httpUrl_72: require("../../../../assets/img/bg1.png"),
      formData: {
        id: "", // 当前行数据的id
        level: "", //级别
        logo: "", // 商户logo
        rateId: "", //费率ID
        vipAmount: "", // 会员费
        vipPaymentCycle: "",  // 会员费缴纳周期
        techniqueAmount: "", // 技术费
        techniquePaymentCycle: "" // 技术费缴纳周期
      },
      selectLevelShow: false, // 选择费率弹窗阀值
    };
  },
  props: {
    detailObj: ""
  },
  components: {
    dialogSelectRate
  },
  computed: {
    ...mapGetters(['get_user_info']),
    detailObjImg() {
      return this.detailObj.logo
        ? "data:image/jpg;base64," + this.detailObj.logo
        : this.httpUrl_72;
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "update" });
  },
  created() {
    this.init_merchant_by_id();
    this.handle_function(this.detailObj);
  },
  mounted() {
    this.init_form_values();
  },
  methods: {
    /**
     * @description 拉取对应等级的数据详情
     * @return {undefined} undefined
     */
    async init_merchant_by_id(){
      let params = {
        id: this.detailObj.id
      }
      let res = await api_base.post_manage_merchantLevel_byid(params)
      let {code} = res.data;
      if(code == '0000000'){
        this.detailObj.logo = res.data.data.logo;
      }
    },
    /**
     * @description 初始化数据-给input框赋值
     * @return {undefined} undefined
     */
    init_form_values() {
      let initValues = {
        level: this.detailObj.level,
        terraceRate: this.formData.terraceRate,
        computingStandard: this.formData.computingStandard,
        paymentCycle: this.formData.paymentCycle,
        vipAmount: this.detailObj.vipAmount / 10000 || 0,
        vipPaymentCycle: this.detailObj.vipPaymentCycle,
        techniqueAmount: this.detailObj.techniqueAmount / 10000 || 0,
        techniquePaymentCycle: this.detailObj.techniquePaymentCycle,
        remarks: this.detailObj.remarks
      };
      !this.detailObj.vipPaymentCycle && delete initValues.vipPaymentCycle;
      !this.detailObj.techniquePaymentCycle &&
        delete initValues.techniquePaymentCycle;
      this.form.setFieldsValue(initValues);
    },
    /**
     * @description 保存按钮
     * @return {undefined} undefined
     */
    handle_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          if (!values.terraceRate) {
            this.$message.warn("平台费率不能为空！");
            return;
          } else if (values.vipAmount && !values.vipPaymentCycle) {
            this.$message.warn("会员费缴纳周期不能为空！");
            return;
          } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
            this.$message.warn("技术服务费缴纳周期不能为空！");
            return;
          }
          values.vipAmount = values.vipAmount * 10000;
          values.techniqueAmount = values.techniqueAmount * 10000;
          values.terraceRate = this.formData.terraceRate;
          values.computingStandard = this.formData.computingStandard;
          values.paymentCycle = this.formData.paymentCycle;
          values.rangeAmountBegin = this.formData.rangeAmountBegin;
          values.rangeAmountEnd = this.formData.rangeAmountEnd;
          values.rateId = this.formData.rateId;
          values.id = this.detailObj.id;
          values.logo = this.detailObj.logo;
          values.modifyUser = this.get_user_info.userCode;
          console.log("Received values of form: ", values);
          api_base.post_manage_merchantLevel_update(values).then(res => {
            let { code, msg, data } = res.data;
            if (code == "0000000") {
              this.$emit("closeDialogShow");
              this.$message.success("编辑商户等级成功！");
            } else {
              this.$message.error(msg);
            }
          });
        }
      });
    },
    /**
     * @description 上传图片
     * @return {undefined} undefined
     */
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
          this.detailObj.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    /**
     * @description 点击平台费率弹出弹窗
     * @return {undefined} undefined
     */
    handle_rate_dialog() {
      this.selectLevelShow = true;
    },
    /**
     * @description 关闭费率选择弹窗
     * @return {undefined} undefined
     */
    handle_close_dialog_rate(record) {
      console.log(record);
      this.handle_function(record);
      this.selectLevelShow = false;
    },
    /**
     * @description 根据选择平台费率赋值给input框
     * @return {undefined} undefined
     */
    handle_function(item) {
      this.$nextTick(() => {
        this.form.setFieldsValue({
          terraceRate: item.terraceRate,
          computingStandard: item.computingStandard,
          paymentCycle: item.paymentCycle,
        });
      });
      this.formData.terraceRate = item.terraceRate;
      this.formData.computingStandard = item.computingStandard;
      this.formData.paymentCycle = item.paymentCycle;
      this.formData.rangeAmountBegin = item.rangeAmountBegin;
      this.formData.rangeAmountEnd = item.rangeAmountEnd;
      this.formData.rateId = item.rateId || item.id;
    }
  }
};
</script>
<style lang="stylus" scoped>
// antd-design-vue
>>>.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}

>>>.ant-input-lg {
  font-size: 14px;
}

>>>.ant-select-lg {
  font-size: 14px;
}

>>>.ant-input-number-lg {
  width: 170px;
  font-size: 14px;
}

>>>.ant-form-explain {
  font-size: 12px;
  width: 170px;
}

>>>.ant-input-disabled {
  background: #fff;
  color: rgba(0, 0, 0, 0.65);
}

>>>.ant-select-disabled .ant-select-selection {
  background: #fff;
  // color: rgba(0, 0, 0, 0.65);
}

>>>.ant-form-item-control {
  line-height: 36px;
}

>>>.ant-form-item {
  margin-bottom: 20px;
}
</style>
