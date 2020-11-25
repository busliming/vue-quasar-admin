<!--
 * @Desc:
 * @Date: 2019-12-25 15:49:45
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-09-25 21:58
 -->
<template>
  <div
    style="width: 600px ; height:auto;max-width:600px;overflow:hidden;"
    class="text-panda-text-7"
  >
    <q-card class="bg-white text-black">
      <q-card-section class="no-padding">
        <div
          class="row line-height-40px fs14 bg-panda-dialog text-panda-text-7 pr10x"
        >
          <div class="pl20x fw_600">编辑平台费率</div>
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
      <q-card-section class="fs14 mt10x">
        <a-form
          id="components-form-bullentin-edit"
          class="edit"
          :form="form"
          @submit="handle_submit"
        >
          <a-form-item>
            <div class="text-panda-text-7 fw_600">
              计算标准
              <span class="panda-text-red">*</span>
            </div>
            <div class="append-handle-btn-input position-relative w-170">
              <a-select
                autocomplete
                class="w-170"
                placeholder="请选择计算标准"
                size="large"
                hasFeedback
                v-decorator="[
                  'computingStandard',
                  { rules: [{ required: true, message: '计算标准不能为空！' }] }
                ]"
              >
                <a-select-option
                  :value="item.computingStandard"
                  v-for="(item, index) in computingStandardList"
                  :key="index"
                  >{{ item.label }}</a-select-option
                >
              </a-select>
              <div class="position-absolute select-left-border2"></div>
            </div>
          </a-form-item>
          <div>
            <div class="text-panda-text-7 fw_600 mb10x">
              金额范围 (万元)
              <span class="panda-text-red">*</span>
            </div>
            <div class="row">
              <div class="w-170">
                <!-- <a-input-number v-decorator="['input-number', { initialValue: 3 }]" :min="1"  /> -->
                <a-form-item>
                  <a-input-number
                    placeholder="请输入最小值"
                    autocomplete="off"
                    size="large"
                    :min="0"
                    :precision="2"
                    v-decorator="[
                      'rangeAmountBegin',
                      {
                        rules: [{ required: true, message: '最小值不能为空！' }]
                      }
                    ]"
                  />
                </a-form-item>
              </div>
              <div class="text-panda-text-7 ml10x mr10x fs12 line-height-40px">
                至
              </div>
              <div class="w-130">
                <a-form-item>
                  <a-input-number
                    placeholder="请输入最大值"
                    size="large"
                    :precision="2"
                    :min="1"
                    v-decorator="[
                      'rangeAmountEnd',
                      {
                        rules: [
                          { required: true, message: '最大值不能为空！' },
                          {
                            validator: compare_tp_range_amount_begin
                          }
                        ]
                      }
                    ]"
                  />
                </a-form-item>
              </div>
            </div>
          </div>
          <div class="row">
            <a-form-item>
              <div class="text-panda-text-7 fw_600">
                平台费率（%）
                <span class="panda-text-red">*</span>
              </div>
              <div class="row">
                <div class="w-170">
                  <!-- <a-input-number v-decorator="['input-number', { initialValue: 3 }]" :min="1"  /> -->
                  <a-input-number
                    placeholder="请输入平台费率"
                    size="large"
                    :min="0"
                    :max="100"
                    :precision="2"
                    v-decorator="[
                      'terraceRate',
                      {
                        rules: [
                          { required: true, message: '平台费率不能为空！' }
                        ]
                      }
                    ]"
                  />
                </div>
              </div>
            </a-form-item>
            <div class="ml30x">
              <a-form-item>
                <div class="text-panda-text-7 fw_600">
                  缴纳周期
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative w-170">
                  <a-select
                    autocomplete
                    class="w-170"
                    placeholder="请选择缴纳周期"
                    size="large"
                    v-decorator="[
                      'paymentCycle',
                      {
                        rules: [
                          { required: true, message: '缴纳周期不能为空！' }
                        ]
                      }
                    ]"
                  >
                    <a-select-option
                      :value="item.paymentCycle"
                      v-for="(item, index) in paymentCycleList"
                      :key="index"
                      >{{ item.label }}</a-select-option
                    >
                  </a-select>
                  <div class="position-absolute select-left-border2"></div>
                </div>
              </a-form-item>
            </div>
          </div>
          <a-form-item>
            <div class="text-panda-text-7 fw_600">备注</div>
            <a-textarea
              v-decorator="['remarks']"
              placeholder="请输入备注内容"
              :style="{ width: '559px', height: '121px' }"
              :rows="4"
              :cols="16"
            />
          </a-form-item>
          <a-form-item>
            <q-btn
              class="panda-btn-primary-dense bg-primary mr20x"
              style="width:100px;height:32px; "
              @click="handle_submit"
              label="保存"
            />
            <q-btn
              class="panda-btn-white border-1px"
              style="width:80px;height:32px; "
              v-close-popup
              label="取消"
            />
          </a-form-item>
        </a-form>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { api_base } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
export default {
  mixins: [commonmixin],
  props: {
    detailObj: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
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
      ]
      // form: this.$form.createForm(this)
    };
  },
  computed: {
    ...mapGetters(['get_user_info'])
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "update" });
  },
  mounted() {
    this.form.setFieldsValue({
      computingStandard: this.detailObj.computingStandard,
      rangeAmountBegin: this.detailObj.rangeAmountBegin / 10000,
      rangeAmountEnd: this.detailObj.rangeAmountEnd / 10000,
      terraceRate: this.detailObj.terraceRate,
      paymentCycle: this.detailObj.paymentCycle,
      remarks: this.detailObj.remarks
    });
  },
  methods: {
    /**
     * @description 保存按钮
     * @return {undefined} undefined
     */
    handle_submit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          // if (this.handle_validator(values)) {
          let params = {
            id: this.detailObj.id,
            computingStandard: values.computingStandard, //计算标准
            rangeAmountBegin: values.rangeAmountBegin * 10000, //金额范围开始
            rangeAmountEnd: values.rangeAmountEnd * 10000, //金额范围结束
            terraceRate: values.terraceRate, //平台费率
            paymentCycle: values.paymentCycle, //平台费率缴纳周期
            remarks: values.remarks, //备注
            modifyUser: this.get_user_info.userCode
          };
          params = this.delete_empty_property_with_exclude(params);
          api_base.post_manage_merchantRate_update(params).then(res => {
            let { code, msg } = res.data;
            if (code == "0000000") {
              this.$message.success("编辑平台费率成功！");
              this.$emit("closeDialogUpdateShow");
            } else {
              this.$message.error(msg);
            }
          });
          // }
        }
      });
    },
    /**
     * @description 验证提交的数据
     * @return {undefined} undefined
     */
    handle_validator(values) {
      if (!values.rangeAmountBegin && values.rangeAmountBegin !== 0) {
        this.$message.warn("金额最小值不能为空!");
        return false;
      } else if (!values.rangeAmountEnd) {
        this.$message.warn("金额最大值不能为空!");
        return false;
      } else if (values.rangeAmountBegin >= values.rangeAmountEnd) {
        this.$message.warn("金额最大值不能小于金额最小值！");
        return false;
      } else if (values.terraceRate == null) {
        this.$message.warn("平台费率不能为空！");
        return false;
      } else if (!values.paymentCycle) {
        this.$message.warn("缴纳周期不能为空！");
        return false;
      } else {
        return true;
      }
    },
    /**
     * @description 金额范围最大值不能小于最小值
     * @return {undefined} undefined
     */
    compare_tp_range_amount_begin(rule, value, callback) {
      const form = this.form;
      console.log(form, value, "value");
      if (value && value <= form.getFieldValue("rangeAmountBegin")) {
        callback("最大值不能小于最小值！");
      } else {
        callback();
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
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
</style>
