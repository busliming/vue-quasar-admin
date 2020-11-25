<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte" class="text-panda-text-4">
        <q-breadcrumbs-el label="商户中心" />
        <q-breadcrumbs-el label="商户管理" />
        <q-breadcrumbs-el label="修改商户" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px" class="bg-panda-bg-6 shadow-3">
      <form @submit.prevent.stop="handleSave" @reset.prevent.stop="onReset">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="row">
              <div class="left mt20x pl40x">
                <div class>
                  <div class="text-panda-text-7 mb12x fw_600">
                    商户编号
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input row">
                    <div class="input-height-36px height-36px">{{detailObj.merchantCode}}</div>
                  </div>
                </div>

                <div>
                  <div class="text-panda-text-7 mb12x fw_600">
                    商户名称
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input row">
                    <q-input
                      style=" width:300px;"
                      outlined
                      ref="merchantName"
                      dense
                      color="panda-text-light"
                      class="text-panda-text-dark panda-input-dense input-height-36px"
                      v-model.trim="detailObj.merchantName"
                      placeholder="请输入商户名称"
                      lazy-rules
                      :rules="[
                        val =>
                          (val !== null && val !== '') || '商户名称不能为空！'
                      ]"
                    ></q-input>
                  </div>
                </div>
                <div>
                  <div class="text-panda-text-7 mb12x fw_600">
                    邮箱地址
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input row">
                    <q-input
                      style=" width:300px;"
                      outlined
                      ref="email"
                      dense
                      color="panda-text-light"
                      class="text-panda-text-dark panda-input-dense input-height-36px"
                      v-model.trim="detailObj.email"
                      placeholder="请输入邮箱地址"
                      lazy-rules
                      :rules="[
                      val => val !== null && val !== '' || '邮箱地址不能为空！',
                      val => /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(val) || '邮箱格式不正确！'
                    ]"
                    ></q-input>
                  </div>
                </div>
              </div>
              <div class="right ml80x" style="margin-top: 60px;">
                <div class="flex" style="width:165px; position: relative">
                  <div style="height:165px;">
                    <img
                      :src="detailObjImg"
                      class="border-radius-4"
                      alt
                      width="165px"
                      height="165px"
                    />
                  </div>
                  <div class="position-relative">
                    <input
                      style="opacity: 0;height: 34px; line-height:34px; cursor: pointer; font-size:8px;vertical-align: bottom; width:150px; z-index: 1; position: absolute;bottom: -40px;right:0px;"
                      type="file"
                      name="inputfile1"
                      @change="upload_avatar($event)"
                      ref="inputfile1"
                      accept="image/jpeg, image/gif, image/png, image/bmp"
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
            <div class="flex ml40x" v-for="(item, index) in users" :key="'concat' + index">
              <div :key="'concat' + index">
                <div class="text-panda-text-7 mb12x fw_600" v-if="index == 0">
                  商务联系人
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    outlined
                    ref="contact"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="item.contact"
                    placeholder="请输入联系人名称"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '商务联系人不能为空！',
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
                    outlined
                    ref="phone"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="item.phone"
                    placeholder="请输入联系人电话"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '联系人电话不能为空！',
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class>
              <q-space></q-space>
              <div style="margin-left: 485px;">
                <q-btn class="panda-btn-upload" @click="handle_add_users">+ 新增联系人</q-btn>
              </div>
            </div>
            <div class="flex ml40x mt10x">
              <div class>
                <div class="text-panda-text-7 mb12x fw_600">
                  国家
                  <!-- <span class="panda-text-red">*</span> -->
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    outlined
                    ref="country"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.country"
                    placeholder="请输入国家名称"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '国家名称不能为空！',
                    ]"
                  ></q-input>
                </div>
              </div>
              <div class="ml65x">
                <div class="text-panda-text-7 mb12x fw_600">
                  省市地区
                  <!-- <span class="panda-text-red">*</span> -->
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    outlined
                    ref="province"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.province"
                    placeholder="请输入省市地区"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '省市地区不能为空！',
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="ml40x">
                <div class="text-panda-text-7 mb12x fw_600">
                  详细地址
                  <!-- <span class="panda-text-red">*</span> -->
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:545px;"
                    outlined
                    ref="address"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.address"
                    placeholder="请输入详细地址"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '详细地址不能为空！',
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="flex ml40x mb10x">
              <div class>
                <div class="text-panda-text-7 mb12x fw_600">
                  商户币种
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative">
                  <div
                    class="fs12 position-absolute"
                    style="left: 12px; top: 9px;"
                    v-if="!detailObj.currency"
                  >请选择商户币种</div>
                  <q-select
                    id="select"
                    ref="currency"
                    class="input-height-36px w-240"
                    v-model="detailObj.currency"
                    :options="currencyList"
                    outlined
                    dense
                    options-dense
                    emit-value
                    map-options
                    option-value="value"
                    option-label="label"
                    popup-content-class="text-panda-text-dark"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') ||
                        '商户币种不能为空！'
                    ]"
                  ></q-select>
                </div>
              </div>
              <div class="ml65x" v-if="detailObj.currency == 2">
                <div class="text-panda-text-7 mb12x fw_600">
                  兑一人民币汇率
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:240px;"
                    outlined
                    ref="rate"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.rate"
                    placeholder="请输入兑一人民币汇率"
                    lazy-rules
                    :rules="[
                      val => val !== null && val !== '' || '兑一人民币汇率不能为空！',
                      val => (/^[1-9][0-9]*(\.[0-9]+)?|0+\.[0-9]*[1-9][0-9]*/).test(val) || '请输入正数！' 
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
          </div>
          <!-- 右边区域 -->
          <div class="col-lg-6 col-md-12">
            <div class="row">
              <div class="mt20x pl40x">
                <div class="text-panda-text-7 mb12x fw_600">
                  商户钱包类型
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative">
                  <div
                    class="fs12 position-absolute"
                    style="left: 12px; top: 9px;"
                    v-if="!detailObj.transferMode"
                  >请选择商户钱包类型</div>
                  <q-select
                    id="select"
                    class="input-height-36px w-240"
                    v-model="detailObj.transferMode"
                    :options="transferModeList"
                    outlined
                    ref="transferMode"
                    dense
                    options-dense
                    emit-value
                    map-options
                    option-value="value"
                    option-label="label"
                    popup-content-class="text-panda-text-dark"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') || '商户钱包类型不能为空！'
                    ]"
                  ></q-select>
                </div>
              </div>
            </div>
            <div class="row" v-if="detailObj.transferMode == 1">
              <div class="ml40x">
                <div class="text-panda-text-7 mb12x fw_600">
                  加扣款接口URL
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:37vw"
                    outlined
                    ref="url"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.url"
                    placeholder="请输入加扣款接口URL"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') || '扣款接口URL不能为空！',
                      val =>  /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig.test(val) || 'url输入格式有误！'
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row" v-if="detailObj.transferMode == 1">
              <div class="ml40x">
                <div class="text-panda-text-7 mb12x fw_600">
                  加扣款回调URL
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row">
                  <q-input
                    style=" width:37vw"
                    outlined
                    ref="callbackUrl"
                    dense
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.callbackUrl"
                    placeholder="请输入加扣款回调URL"
                    lazy-rules
                    :rules="[
                      val =>
                        (val !== null && val !== '') ||
                        '加扣款回调URL不能为空！',
                      val => /((http|https):\/\/([\w\-]+\.)+[\w\-]+(\/[\w\u4e00-\u9fa5\-\.\/?\@\%\!\&=\+\~\:\#\;\,]*)?)/ig.test(val) || 'url输入格式有误！'
                    ]"
                  ></q-input>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="pl40x">
                <div class="text-panda-text-7 mb12x fw_600">
                  商户等级
                  <span class="panda-text-red">*</span>
                </div>
                <div
                  class="no-left append-handle-btn-input position-relative"
                  @click.stop="handle_level_dialog"
                >
                  <q-input
                    style=" width:200px;"
                    outlined
                    dense
                    readonly
                    color="panda-text-light"
                    class="text-panda-text-dark panda-input-dense input-height-36px"
                    v-model.trim="detailObj.levelName"
                    placeholder="请选择商户等级"
                  ></q-input>
                </div>
              </div>
            </div>
            <!-- 平台费率 -->
            <div class="row mt20x">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    平台费率(%)
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative">
                    <q-input
                      style=" width:200px;"
                      outlined
                      dense
                      type="number"
                      color="panda-text-light"
                      class="text-panda-text-dark panda-input-dense input-height-36px"
                      v-model.trim="detailObj.terraceRate"
                      placeholder="请输入平台费率"
                      lazy-rules
                      :rules="[
                      val =>
                        (val !== null && val !== '') ||
                        '平台费率不能为空！',
                        val => (/^[0-9]\d*(\.\d+)?$/).test(val) || '请输入正数！'
                    ]"
                    ></q-input>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-2 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    计算标准
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative">
                    <div
                      class="fs12 position-absolute"
                      style="left: 12px; top: 9px;"
                      v-if="!detailObj.computingStandard"
                    >请选择计算标准</div>
                    <q-select
                      id="select"
                      class="input-height-36px w-200"
                      v-model="detailObj.computingStandard"
                      :options="computingStandardList"
                      outlined
                      dense
                      options-dense
                      emit-value
                      map-options
                      option-value="computingStandard"
                      option-label="label"
                      popup-content-class="text-panda-text-dark"
                    ></q-select>
                  </div>
                </div>
              </div>

              <div class="col-4 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    缴纳周期
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative">
                    <div
                      class="fs12 position-absolute"
                      style="left: 12px; top: 9px;"
                      v-if="!detailObj.paymentCycle"
                    >请选择缴纳周期</div>
                    <q-select
                      id="select"
                      class="input-height-36px w-200"
                      v-model="detailObj.paymentCycle"
                      :options="paymentCycleList"
                      outlined
                      dense
                      options-dense
                      emit-value
                      map-options
                      option-value="paymentCycle"
                      option-label="label"
                      popup-content-class="text-panda-text-dark"
                    ></q-select>
                  </div>
                </div>
              </div>
            </div>
            <!-- 会员费 -->
            <div class="row">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    会员费（CNY）
                    <!-- <span class="panda-text-red">*</span> -->
                  </div>
                  <div class="append-handle-btn-input">
                    <q-input
                      style=" width:200px;"
                      outlined
                      ref="vipAmount"
                      dense
                      color="panda-text-light"
                      class="text-panda-text-dark panda-input-dense input-height-36px"
                      v-model.trim="detailObj.vipAmount"
                      placeholder="请输入会费"
                      lazy-rules
                      :rules="[
                        val => (/^[0-9]\d*(\.\d+)?$/).test(val) || '请输入正数！'
                      ]"
                    ></q-input>
                  </div>
                </div>
              </div>
              <div class="col-3 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
                  <div class="append-handle-btn-input position-relative">
                    <div
                      class="fs12 position-absolute"
                      style="left: 12px; top: 9px;"
                      v-if="
                        !detailObj.vipPaymentCycle &&
                          detailObj.vipPaymentCycle != 0
                      "
                    >请选择缴纳周期</div>
                    <q-select
                      id="select"
                      class="input-height-36px w-200"
                      v-model="detailObj.vipPaymentCycle"
                      :options="vipPaymentCycleList"
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
            </div>
            <!-- 技术服务费 -->
            <div class="row">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">技术服务费（CNY）</div>
                  <div class="append-handle-btn-input">
                    <q-input
                      style=" width:200px;"
                      outlined
                      ref="techniqueAmount"
                      dense
                      color="panda-text-light"
                      class="text-panda-text-dark panda-input-dense input-height-36px"
                      v-model.trim="detailObj.techniqueAmount"
                      placeholder="请输入技术服务费"
                      lazy-rules
                      :rules="[
                        val => (/^[0-9]\d*(\.\d+)?$/).test(val) || '请输入正数！'
                      ]"
                    ></q-input>
                  </div>
                </div>
              </div>
              <div class="col-3 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
                  <div class="append-handle-btn-input position-relative">
                    <div
                      class="fs12 position-absolute"
                      style="left: 12px; top: 9px;"
                      v-if="
                        !detailObj.techniquePaymentCycle &&
                          detailObj.techniquePaymentCycle != 0
                      "
                    >请选择缴纳周期</div>
                    <q-select
                      id="select"
                      class="input-height-36px w-200"
                      v-model="detailObj.techniquePaymentCycle"
                      :options="techniquePaymentCycleList"
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
            </div>
            <!-- 商户有效期 -->
            <div class="row">
              <div class="col-4 col-md-5">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    商户有效期
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative">
                    <a-range-picker
                      v-if="detailObj.startTime !== undefined && detailObj.endTime !== undefined"
                      :defaultValue="[
                        moment(detailObj.startTime, dateFormat),
                        moment(detailObj.endTime, dateFormat)
                      ]"
                      :placeholder="['开始时间', '结束时间']"
                      @change="onChange"
                    ></a-range-picker>
                  </div>
                </div>
              </div>
              <div class="col-5">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">合作协议文件</div>
                  <div class="append-handle-btn-input flex">
                    <a-upload
                      name="file"
                      :multiple="true"
                      :custom_upload="custom_upload"
                      :before_upload="before_upload"
                    >
                      <a-button>
                        <a-icon type="plus" />
                      </a-button>
                    </a-upload>
                    <div class="ml20x">
                      <div
                        class="text-panda-text-3 cursor-pointer"
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
                  </div>
                </div>
              </div>
            </div>
            <!-- 保存取消按钮 -->
            <div class="row mt28x pl40x mb20x">
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width:100px;height:32px; "
                @click="handleSave"
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
        </div>
      </form>
    </div>
    <!-- 选择商户等级 -->
    <q-dialog v-model="selectLevelShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-select-level @closeSelectDialog="handle_close_dialog_select"></dialog-select-level>
    </q-dialog>
  </div>
</template>

<script>
import { api_public, api_base, api_merchant,FILE_PREFIX } from "src/api/index.js";
import commontoolmixin from "src/mixins/common/commontoolmixin.js";
import dialogSelectLevel from "src/pages/merchant/merchantc/component/dialogSelectLevel.vue";
import moment from "moment";

export default {
  mixins: [commontoolmixin],
  components: {
    dialogSelectLevel
  },
  data() {
    return {
      loading: false,
      dateFormat: "YYYY/MM/DD",
      startTime: "",
      endTime: "",
      formData: {
        merchantCode: "",
        merchantName: "",
        email: "",
        contact: "", // 联系人列表
        phone: "",
        country: "",
        province: "",
        address: "",
        currency: "",
        rate: "",
        transferMode: "",
        url: "",
        callbackUrl: "",
        level: "", //商户等级
        terraceRate: "", //平台费率
        computingStandard: "", //计算标准
        paymentCycle: "", //平台费率缴纳周期
        vipAmount: "", //会员费
        vipPaymentCycle: "", //会员费缴纳周期
        techniqueAmount: "", //技术服务费
        techniquePaymentCycle: "", //技术服务费缴纳周期
        startTime: "", //商户有效期开始日期
        endTime: "", //商户有效期结束日期
        filePath: "" //文件路径
      }, //表单
      transferModeList: [
        //商户钱包
        { label: "免转钱包", value: 1 },
        { label: "转账钱包", value: 2 }
      ],
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
      currencyList: [
        //商户币种
        { label: "人民币", value: 1 },
        { label: "积分制", value: 2 }
      ],
      terraceRateList: [], // 平台费率
      merchantLevelList: [], //商户等级
      users: [{ contact: "", phone: "" }],
      httpUrl_72: require("../../../assets/img/bg1.png"),
      // docx
      headers: {
        authorization: "authorization-text"
      },
      files: [], //文件路径
      currentLevelObj: {},
      detailObj: {}, //当前商户详细信息
      selectLevelShow: false, // 商户等级弹窗阀值
      ajaxLoading: false // 请求状态
    };
  },
  computed: {
    detailObjImg() {
      return this.detailObj.logo
        ? "data:image/jpg;base64," + this.detailObj.logo
        : this.httpUrl_72;
    }
  },
  watch: {
    "detailObj.filePath"(val) {
      if (val) {
        let arr = val.split(";");
        let newArr = [];
        if (arr.length > 0) {
          arr.map(item => {
            newArr.push({
              name: item.slice(item.indexOf("d/") + 2),
              file: item
            });
          });
        }
        this.files = newArr;
      }
    }
  },
  created() {
    this.initMerchantDetail();
    this.initMerchantLevel();
    this.initTerraceRateList();
  },
  methods: {
    moment,
    initUsers() {
      if (this.detailObj.contact) {
        let contacts = this.detailObj.contact.split(",");
        let phones = this.detailObj.phone.split(",");
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
    async initMerchantDetail() {
      let params = {
        id: this.$route.query.id
      };
      let res = await api_merchant.get_manage_merchant_byid(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.detailObj = data;
        if (this.detailObj) {
          this.initUsers();
        }
      } else {
        this.$message.error(msg);
      }
    },
    async initTerraceRateList() {
      let res = await api_base.get_manage_merchantRate_queryRateList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        console.log(data, "terraceRateList");
        this.terraceRateList = data;
      }
    },
    async initMerchantLevel() {
      let res = await api_base.get_manage_merchantLevel_queryLevelList({});
      console.log(res);
      let { code, data } = res.data;
      if (code == "0000000") {
        this.merchantLevelList = data;
      }
    },
    rebuildToNeedData(arr) {
      arr.map(item => {
        this.merchantLevelList.push({
          value: item.level,
          label: item.levelName
        });
      });
      console.log(this.merchantLevelList, "merchantLevelList");
    },
    handleChange(info) {
      if (this.formData.filePath.length > 0) {
        info.file.status == "done";
      }
    },
    // 上传LOGO
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
          // this.httpUrl_72 = "data:image/jpg;base64," + data.data;
          this.$message.success("上传LOGO成功");
        } else {
          this.$message.error("上传LOGO失败！请重新上传！");
        }
      });
    },
    handle_cancel() {
      this.$router.go(-1);
      let params = {
        merchantName: this.$route.query.merchantName,
        pageSize: this.$route.query.pageSize,
        pageNum: this.$route.query.pageNum
      };
      this.$q.sessionStorage.set("params",params);
      // sessionStorage.setItem("params", JSON.stringify(params));
    },
    handleSave() {
      // if (!this.validate()) return;
      this.validate();
      if (
        this.$refs.merchantName.hasError ||
        this.$refs.email.hasError ||
        this.$refs.currency.hasError ||
        this.$refs.transferMode.hasError
      ) {
        this.formHasError = true;
      } else {
        if (!this.detailObj.levelName) {
          this.$message.warn("商户等级不能为空！");
          return;
        } else if (!this.detailObj.startTime && !this.detailObj.endTime) {
          this.$message.warn("商户有效期不能为空！");
          return;
        } else if (this.detailObj.transferMode == 1 && !this.detailObj.url) {
          this.$message.warn("加扣款接口URL不能为空！");
          return;
        } else if (
          this.detailObj.transferMode == 1 &&
          !this.detailObj.callbackUrl
        ) {
          this.$message.warn("加扣款回调URL不能为空！");
          return;
        } else if (
          this.detailObj.vipAmount &&
          !this.detailObj.vipPaymentCycle
        ) {
          this.$message.warn("会员费缴纳周期不能为空！");
          return;
        } else if (
          this.detailObj.techniqueAmount &&
          !this.detailObj.techniquePaymentCycle
        ) {
          this.$message.warn("技术服务费缴纳周期不能为空！");
          return;
        }

        let contact = "";
        let phone = "";
        this.users.map(item => {
          item.contact && (contact += item.contact + ",");
          item.phone && (phone += item.phone + ",");
        });
        this.detailObj.contact = contact.slice(0, contact.lastIndexOf(","));
        this.detailObj.phone = phone.slice(0, phone.lastIndexOf(","));
        console.log(this.detailObj.contact, this.detailObj.phone);
        if (this.detailObj.currency == 2 && !this.detailObj.rate) {
          this.$message.warn("兑一人民币汇率不能为空！");
          return;
        } else if (!this.detailObj.contact || !this.detailObj.phone) {
          this.$message.warn("商务联系人或联系电话不能为空！");
          return false;
        } else if (!this.detailObj.terraceRate) {
          this.$message.warn("平台费率不能为空！");
          return false;
        }
        let filePath = "";
        this.files.map(item => {
          item.file && (filePath += item.file + ";");
        });
        this.detailObj.filePath = filePath.slice(0, filePath.lastIndexOf(";"));
        console.log(this.detailObj);
        let params = this.rebuildToNeedParams(this.detailObj);
        // params = this.delete_empty_property_with_exclude(params);
        this.ajaxLoading = true;
        api_merchant.post_manage_merchant_update(params).then(res => {
          let { code, msg } = res.data;
          if (code == "0000000") {
            this.ajaxLoading = false;
            this.$message.success("修改商户成功！");
            this.$router.go(-1);
            let params = {
              merchantName: this.$route.query.merchantName,
              pageSize: this.$route.query.pageSize,
              pageNum: this.$route.query.pageNum
            };
            this.$q.sessionStorage.set("params",params);
            // sessionStorage.setItem("params", JSON.stringify(params));
          } else {
            this.$message.error(msg);
            this.ajaxLoading = false;
          }
        });
      }
    },
    // 表单验证
    validate() {
      this.$refs.merchantName.validate();
      this.$refs.email.validate();
      this.$refs.currency.validate();
      this.$refs.transferMode.validate();
    },
    onChange(value, dateString) {
      this.detailObj.startTime = dateString[0];
      this.detailObj.endTime = dateString[1];
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
    //文件上传限制
    before_upload(file) {
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isLt2M) {
        this.$message.error("单个文件大小不能超过20M！请重新上传");
      }
      return isLt2M;
    },
    // 文件上传
    custom_upload(data) {
      const formData = new FormData();
      formData.append("file", data.file);
      // formData.append("token", "aiufpaidfupipiu"); //随便写一个token示例
      console.log(formData, "formData");
      this.save_file(formData);
    },
    // 文件上传前后端联调
    save_file(formData) {
      if (this.files.length < 5) {
        api_public
          .post_manage_merchant_file_upload(formData)
          .then(res => {
            // console.log(res.data)
            let data = res.data;
            let str = data;
            data = str.slice(str.indexOf("d/") + 2);
            console.log(data, ".........");
            this.files.push({
              name: data,
              file: res.data
            });
            console.log(this.files, " files");
            this.$message.success(`${data}文件上传成功！`);
          })
          .catch(err => {
            console.log(err);
            this.$message.error("文件上传失败！请重试！");
          });
      } else {
        this.$message.error("文件上传最多不超过5个！");
      }
    },
    handle_remove(item, index) {
      this.files.splice(index, 1);
      this.$message.warn("删除" + item.name + "成功！");
    },
    handle_download(item) {
      console.log(item);
      let params = {
        fileName: item.file
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          this.$message.success(`下载${item.name}成功!`);
          // http://172.18.178.165:10712/manage/merchant/file/download?fileName=/opt/merchant/upload/前端文档.txt
          // window.open(
          //   location.host +
          //     "/manage/merchant/file/download?fileName=" +
          //     item.file
          // );
          window.open(FILE_PREFIX + item.file);
          // window.open(
          //   "http://172.18.178.165:10712/manage/merchant/file/download?fileName=" +
          //     item.file
          // );
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    // 点击商户等级弹出弹窗
    handle_level_dialog() {
      this.selectLevelShow = true;
    },
    // 关闭选择商户等级弹窗
    handle_close_dialog_select(record) {
      console.log(record);
      this.handle_function(record);
      this.selectLevelShow = false;
    },
    handle_function(item) {
      this.detailObj.level = item.level;
      this.detailObj.levelName = item.levelName;
      this.detailObj.terraceRate = item.terraceRate;
      this.detailObj.computingStandard = item.computingStandard;
      this.detailObj.paymentCycle = item.paymentCycle;
      this.detailObj.vipAmount = item.vipAmount;
      this.detailObj.vipPaymentCycle = item.vipPaymentCycle;
      this.detailObj.techniqueAmount = item.techniqueAmount;
      this.detailObj.techniquePaymentCycle = item.techniquePaymentCycle;
    },
    //新增联系人
    handle_add_users() {
      if (this.users.length > 4) {
        this.$message.warn("新增联系人不能超过 " + this.users.length + " 组");
      } else {
        this.users.push({
          contact: "",
          phone: ""
        });
        this.$message.success("新增联系人成功！");
      }
    },
    // 删除联系人
    handle_remove_users(i) {
      this.users.splice(i, 1);
      this.$message.success("删除联系人成功！");
    },
    // 处理成后台需要的数据
    rebuildToNeedParams(item) {
      let obj = {};
      (obj.id = item.id),
        (obj.merchantCode = item.merchantCode),
        (obj.merchantName = item.merchantName),
        (obj.email = item.email),
        (obj.logo = item.logo),
        (obj.contact = item.contact),
        (obj.phone = item.phone),
        (obj.country = item.country),
        (obj.province = item.province),
        (obj.address = item.address),
        (obj.currency = item.currency),
        (obj.rate = item.currency === 2 ? item.rate : ""),
        (obj.transferMode = item.transferMode),
        (obj.url = item.transferMode === 1 ? item.url : ""),
        (obj.callbackUrl = item.transferMode === 1 ? item.callbackUrl : ""),
        (obj.level = item.level),
        (obj.terraceRate = item.terraceRate),
        (obj.computingStandard = item.computingStandard),
        (obj.paymentCycle = item.paymentCycle),
        (obj.vipAmount = item.vipAmount),
        (obj.vipPaymentCycle = item.vipPaymentCycle),
        (obj.techniqueAmount = item.techniqueAmount),
        (obj.techniquePaymentCycle = item.techniquePaymentCycle),
        (obj.startTime = item.startTime),
        (obj.endTime = item.endTime),
        (obj.filePath = item.filePath);
      console.log(
        obj,
        item.currency,
        item.transferMode,
        obj.rate,
        obj.url,
        obj.callbackUrl
      );
      return obj;
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-progress-circle-path {
  stroke: #FBC02D;
}

>>>.q-tab-panel {
  padding: 0;
}

>>>.ant-input {
  height: 36px;
  line-height: 36px;
  border-color: #c1c1c1;
  // box-shadow: 0 2px 4px 0 rgba(97, 128, 239, 0.2);
  padding: 0 11px;
}

>>>.ant-input:hover {
  border-color: #3263FF;
}

>>>.ant-input:focus {
  border-color: #3263FF;
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
</style>
