<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Nice
 * @LastEditTime: 2020-02-25 14:56:53
 -->
<template>
  <div style="width: 600px ; height:auto;max-width:600px;overflow:hidden;">
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">新建商户等级</div>
          <q-space></q-space>
          <q-btn flat dense icon="close" v-close-popup />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <q-card-section class="fs14">
        <div>
          <div class="flex" style="width:165px; position: relative">
            <div style="height:165px;">
              <img
                :src="httpUrl_72"
                v-if="httpUrl_72"
                class="border-radius-4"
                alt
                width="165px"
                height="165px"
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
        </div>
        <div class="mt20x">
          <div class="text-panda-text-7 mb12x fw_600">
            商户等级
            <span class="panda-text-red">*</span>
          </div>
          <div class="append-handle-btn-input position-relative">
            <q-input
              style=" width:170px;"
              type="number"
              outlined
              dense
              disable
              color="panda-text-light"
              class="text-panda-text-dark panda-input-dense input-height-36px"
              v-model.trim="mostLevel"
              placeholder="请输入商户等级"
            ></q-input>
          </div>
        </div>

        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">
              平台费率
              <span class="panda-text-red">*</span>
            </div>
            <div
              class="no-left append-handle-btn-input position-relative"
              @click.stop="handle_level_dialog"
            >
              <q-input
                style=" width:170px;"
                outlined
                dense
                ref="terraceRate"
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.terraceRate"
                placeholder="请输入平台费率"
                readonly
                lazy-rules
                :rules="[
                  val => (val !== null && val !== '') || '平台费率不能为空！'
                ]"
                clearable
              ></q-input>
            </div>
          </div>

          <div class="ml25x">
            <div class="text-panda-text-7 mb12x fw_600">计算标准</div>
            <div class="append-handle-btn-input position-relative">
              <div
                class="text-panda-text-7 fs14 position-absolute"
                style="left: 12px; top: 9px;"
                v-if="!formData.computingStandard"
              >
                请选择计算标准
              </div>
              <q-select
                id="select"
                class="input-height-36px w-170"
                v-model="formData.computingStandard"
                :options="computingStandardList"
                outlined
                dense
                options-dense
                readonly
                emit-value
                map-options
                option-value="computingStandard"
                option-label="label"
                popup-content-class="text-panda-text-dark"
              ></q-select>
            </div>
          </div>

          <div class="ml25x">
            <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
            <div class="append-handle-btn-input position-relative">
              <div
                class="text-panda-text-7 fs14 position-absolute"
                style="left: 12px; top: 9px;"
                v-if="!formData.paymentCycle"
              >
                请选择缴纳周期
              </div>
              <q-select
                id="select"
                class="input-height-36px w-170"
                v-model="formData.paymentCycle"
                :options="techniquePaymentCycleList"
                outlined
                readonly
                dense
                options-dense
                emit-value
                map-options
                option-value="techniquePaymentCycle"
                option-label="label"
                popup-content-class="text-panda-text-dark"
              ></q-select>
            </div>
          </div>
        </div>
        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">会员费 (万元)</div>
            <div class="no-left append-handle-btn-input position-relative">
              <q-input
                style=" width:170px;"
                outlined
                dense
                type="number"
                ref="vipAmount"
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.vipAmount"
                lazy-rules
                :rules="[
                  val => !(/^\-[1-9][0-9]*$/).test(val) || '请输入正数！',
                  val => val >= 0 || '请输入正数！' , 
                ]"
                placeholder="请输入会费"
                clearable
              ></q-input>
            </div>
          </div>
          <div class="ml25x">
            <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
            <div class="append-handle-btn-input position-relative">
              <div
                class="text-panda-text-7 fs14 position-absolute"
                style="left: 12px; top: 9px;"
                v-if="!formData.vipPaymentCycle"
              >
                请选择缴纳周期
              </div>
              <q-select
                id="select"
                class="input-height-36px w-170"
                v-model="formData.vipPaymentCycle"
                :options="vipPaymentCycleList"
                ref="vipPaymentCycle"
                outlined
                dense
                options-dense
                emit-value
                map-options
                option-value="vipPaymentCycle"
                option-label="label"
                popup-content-class="text-panda-text-dark"
              ></q-select>
            </div>
          </div>
        </div>
        <div class="mt20x row">
          <div>
            <div class="text-panda-text-7 mb12x fw_600">
              技术服务费 (万元)
              <!-- <span class="panda-text-red">*</span> -->
            </div>
            <div class="no-left append-handle-btn-input position-relative">
              <q-input
                style=" width:170px;"
                outlined
                dense
                type="number"
                color="panda-text-light"
                class="text-panda-text-dark panda-input-dense input-height-36px"
                v-model.trim="formData.techniqueAmount"
                placeholder="请输入技术服务费"
                ref="techniqueAmount"
                lazy-rules
                :rules="[
                  val => !(/^\-[1-9][0-9]*$/).test(val) || '请输入正数！',
                  val => val >= 0 || '请输入正数！' , 
                ]"
                clearable
              ></q-input>
            </div>
          </div>
          <div class="ml25x">
            <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
            <div class="append-handle-btn-input position-relative">
              <div
                class="text-panda-text-7 fs14 position-absolute"
                style="left: 12px; top: 9px;"
                v-if="!formData.techniquePaymentCycle"
              >
                请选择缴纳周期
              </div>
              <q-select
                id="select"
                class="input-height-36px w-170"
                v-model="formData.techniquePaymentCycle"
                :options="techniquePaymentCycleList"
                ref="techniquePaymentCycle"
                outlined
                dense
                options-dense
                emit-value
                map-options
                option-value="techniquePaymentCycle"
                option-label="label"
                popup-content-class="text-panda-text-dark"
              ></q-select>
            </div>
          </div>
        </div>
        <div class="row mt40x mb20x">
          <q-btn
            class="panda-btn-primary-dense bg-primary mr20x"
            style="width:100px;height:32px; "
            @click="handleSave"
            label="保存"
          />
          <q-btn
            class="panda-btn-white"
            style="width:80px;height:32px; border: 1px solid #8A92A5;"
            v-close-popup
            label="取消"
          />
        </div>
      </q-card-section>
    </q-card>
    <!-- 选择商户等级 -->
    <q-dialog
      v-model="selectLevelShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-select-rate
        @closeSelectRate="handleCloseDialogRate"
      ></dialog-select-rate>
    </q-dialog>
  </div>
</template>
<script>
import { api_public, api_base, api_merchant } from "src/api/index.js";
import dialogSelectRate from "src/pages/set/merchantlevel/component/dialogSelectRate.vue";
import commonmixin from "src/mixins/common/commontoolmixin.js";

export default {
  mixins: [commonmixin],
  data() {
    return {
      previewVisible: false,
      previewImage: "",
      fileList: [],
      // httpUrl_72: imgSrc
      httpUrl_72: require("../../../../assets/img/bg1.png"),
      formData: {
        level: "", //级别
        levelName: "", //商户等级名称
        logo: "", // 商户logo
        rateId: "", //费率ID
        vipAmount: "",
        vipPaymentCycle: "",
        techniqueAmount: "",
        techniquePaymentCycle: "",
        computingStandard: "" //计算标准
      },
      terraceRateList: [], // 平台费率

      merchantLevelList: [], //商户等级
      terraceRateObj: {}, //当前下拉框选中汇率包含的对象
      //

      computingStandardList: [
        //计算标准
        { label: "盈利金额", computingStandard: "1" },
        { label: "投注金额", computingStandard: "2" }
      ],
      paymentCycleList: [
        //缴纳周期
        { label: "每月", paymentCycle: 1 },
        { label: "每季度", paymentCycle: 2 },
        { label: "每半年", paymentCycle: 3 },
        { label: "每年", paymentCycle: 4 }
      ],
      vipPaymentCycleList: [
        //缴纳周期
        { label: "每月", vipPaymentCycle: 1 },
        { label: "每季度", vipPaymentCycle: 2 },
        { label: "每半年", vipPaymentCycle: 3 },
        { label: "每年", vipPaymentCycle: 4 }
      ],
      techniquePaymentCycleList: [
        //缴纳周期
        { label: "每月", techniquePaymentCycle: 1 },
        { label: "每季度", techniquePaymentCycle: 2 },
        { label: "每半年", techniquePaymentCycle: 3 },
        { label: "每年", techniquePaymentCycle: 4 }
      ],
      selectLevelShow: false //选择平台费率弹窗
    };
  },
  computed: {
    mostLevelObj() {
      return (
        this.merchantLevelList.length > 0 &&
        this.$lodash.last(this.merchantLevelList)
      );
    },
    mostLevel() {
      return this.mostLevelObj ? this.mostLevelObj.level + 1 : 1;
    }
  },
  components: {
    dialogSelectRate
  },
  props: {
    detailObj: ""
  },
  created() {
    this.initMerchantLevel();
    this.initTerraceRateList();
  },
  methods: {
    // 表单验证
    validate() {
      this.$refs.vipAmount.validate();
      this.$refs.techniqueAmount.validate();
    },
    // 上传图片
    upload_avatar(event) {
      let inputFile = event.target.files[0];
      const isLt2M = inputFile && inputFile.size / 1024 / 1024 < 5;
      const isWantImage = inputFile.type === "image/jpeg" || inputFile.type === "image/png" || inputFile.type === "image/gif" || inputFile.type === "image/tif" || inputFile.type === "image/bmp";
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
          this.formData.logo = data.data;
          this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    // 保存按钮
    handleSave() {
      this.validate();
      if (
        this.$refs.vipAmount.hasError ||
        this.$refs.techniqueAmount.hasError
      ) {
        this.formHasError = true;
      } else {
        if (!this.formData.terraceRate) {
          this.$message.error("平台费率不能为空！");
          return;
        } else if (
          this.formData.vipAmount &&
          !this.formData.vipPaymentCycle
        ) {
          this.$message.error("会员费缴纳周期不能为空！");
          return;
        } else if (
          this.formData.techniqueAmount &&
          !this.formData.techniquePaymentCycle
        ) {
          this.$message.error("技术服务费缴纳周期不能为空！");
          return;
        }
        this.formData.level = this.mostLevel;
        this.formData.vipAmount = this.formData.vipAmount * 10000;
        this.formData.techniqueAmount = this.formData.techniqueAmount * 10000;
        let params = this.delete_empty_property_with_exclude(this.formData);
        api_base.post_manage_merchantLevel_add(params).then(res => {
          let { code, msg, data } = res.data;
          if (code == "0000000") {
            this.$emit("closeDialogSetShow");
            this.$message.success("新建商户等级成功！");
          } else {
            this.$message.error(msg);
          }
        });
      }
    },
    // 商户等级
    async initMerchantLevel() {
      let res = await api_base.get_manage_merchantLevel_queryLevelList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        this.merchantLevelList = data;
      }
    },
    // 费率请求
    async initTerraceRateList() {
      let res = await api_base.get_manage_merchantRate_queryRateList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        console.log(data, "terraceRateList");
        this.terraceRateList = data;
      }
    },
    // 点击商户等级弹出弹窗
    handle_level_dialog() {
      this.selectLevelShow = true;
    },
    handleCloseDialogRate(record) {
      console.log(record);
      this.handle_function(record);
      this.selectLevelShow = false;
    },
    handle_function(item) {
      this.formData.terraceRate = item.terraceRate;
      this.formData.computingStandard = item.computingStandard;
      this.formData.paymentCycle = item.paymentCycle;
      this.formData.rateId = item.id;
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

.no-left >>> .q-field__append {
  border-left: none;
}
</style>
