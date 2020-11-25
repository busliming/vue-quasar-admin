<template>
  <div class="full-width full-height">
    <div class="pl20x mt20x">
      <q-breadcrumbs separator=">" active-color="whiddte">
        <q-breadcrumbs-el label="商户中心" class="text-panda-text-4" />
        <q-breadcrumbs-el label="商户管理" class="text-panda-text-4" />
        <q-breadcrumbs-el label="新建直营商户" class="fw_600 text-panda-text-7 fs14" />
      </q-breadcrumbs>
    </div>
    <div style="margin: 20px; min-height: 790px;" class="bg-panda-bg-6 shadow-3 border-radius-4">
      <a-form id="components-form-edit" class="edit" :form="form" @submit="handleSubmit">
        <div class="row">
          <div class="col-lg-6 col-md-12">
            <div class="row">
              <div class="left mt20x pl40x">
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
                <div class="flex mb20x">
                  <div class>
                    <div class="text-panda-text-7 mb10x fw_600">商户类型</div>
                    <div class="append-handle-btn-input row">
                      <span
                        class="text-panda-text-3"
                      >{{$route.query.agentLevel === "0"? '直营商户': '暂定商户'}}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="right ml80x" style="margin-top: 60px;">
                <div class="flex" style="width:165px; position: relative">
                  <div
                    class="border-radius-4"
                    :style="formData.logo? 'border: 1px dashed #c1c1c1': ''"
                  >
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
            <!-- <div class="flex ml40x mb20x">
              <div class>
                <div class="text-panda-text-7 mb10x fw_600">商户类型</div>
                <div class="append-handle-btn-input row">
                  <span
                    class="text-panda-text-3"
                  >{{$route.query.agentLevel === "0"? '直营商户': '暂定商户'}}</span>
                </div>
              </div>
            </div>-->
            <div class="ml40x w-300">
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
            <div class="flex ml40x" v-for="(item, index) in users" :key="'contact' + index">
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
              <div style="margin-left: 485px;">
                <q-btn class="panda-btn-upload" @click="handle_add_users">+ 新增联系人</q-btn>
              </div>
            </div>
            <div class="flex ml40x mt10x">
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
              <div class="ml40x">
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
            <!-- <div class="flex ml40x mb10x mt20x">
              <div class>
                <div class="text-panda-text-7 mb12x fw_600">
                  商户币种
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative w-240">
                  <a-form-item>
                    <a-select
                      autocomplete
                      class="w-240"
                      placeholder="请选择商户币种"
                      size="large"
                      @change="handleCurrencyChange"
                      v-decorator="[
                        'currency',
                        { rules: [{ required: true, message: '商户币种不能为空！' }] },
                      ]"
                    >
                      <a-select-option
                        :value="item.value"
                        v-for="(item, index) in currencyList"
                        :key="index"
                      >{{item.label}}</a-select-option>
                    </a-select>
                    <div class="position-absolute select-left-border5"></div>
                  </a-form-item>
                </div>
              </div>
              <div class="ml65x" v-if="formData.currency == 2">
                <div class="text-panda-text-7 mb12x fw_600">
                  兑一人民币汇率
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input row w-240">
                  <a-form-item has-feedback>
                    <a-input-number
                      placeholder="请输入兑一人民币汇率"
                      type="number"
                      :max="100"
                      v-decorator="[
                        'rate',
                        { rules: [
                          {
                            required: true,
                            message: '兑一人民币汇率不能为空！',
                          },
                        ]}
                      ]"
                    />
                  </a-form-item>
                </div>
              </div>
            </div>-->
          </div>
          <!-- 右边区域 -->
          <div class="col-lg-6 col-md-12">
            <div class="row">
              <div class="mt20x pl40x">
                <div class="text-panda-text-7 mb10x fw_600">
                  商户钱包类型
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative w-180">
                  <a-form-item>
                    <a-select
                      autocomplete
                      class="w-240"
                      placeholder="请选择商户钱包类型"
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
                    <div class="position-absolute select-left-border5"></div>
                  </a-form-item>
                </div>
              </div>
            </div>
            <div class="row" v-if="formData.transferMode == 1">
              <div class="ml40x">
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
              <div class="ml40x">
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
              <div class="ml40x">
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
                  <a-form-item class="w-180" has-feedback>
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
            </div>
            <!-- 平台费率 -->
            <div class="row">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    平台费率(%)
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="no-left append-handle-btn-input position-relative w-180">
                    <a-form-item has-feedback>
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
              <div class="col-lg-3 col-md-2 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    计算标准
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative w-170">
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
                      <div class="position-absolute select-left-border5"></div>
                    </a-form-item>
                  </div>
                </div>
              </div>
              <div class="col-4 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    缴纳周期
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative w-170">
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
                      <div class="position-absolute select-left-border5"></div>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </div>
            <!-- 会员费 -->
            <div class="row">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">会员费（CNY）</div>
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
              <div class="col-3 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
                  <div class="append-handle-btn-input position-relative w-170">
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
                      <div class="position-absolute select-left-border5"></div>
                    </a-form-item>
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
              <div class="col-lg-3 col-md-2 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">缴纳周期</div>
                  <div class="append-handle-btn-input position-relative w-170">
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
                      <div class="position-absolute select-left-border5"></div>
                    </a-form-item>
                  </div>
                </div>
              </div>
              <div class="col-4 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    结算币种
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative w-180">
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
                          v-for="(item, index) in currencyList"
                          :key="index"
                        >{{item.label}}</a-select-option>
                      </a-select>
                      <div class="position-absolute select-left-border5"></div>
                    </a-form-item>
                  </div>
                </div>
              </div>
            </div>
            <!-- 商户有效期 -->
            <div class="row">
              <div class="col-lg-3 col-md-2">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb12x fw_600">
                    Panda商务
                    <span class="panda-text-red">*</span>
                  </div>
                  <div class="append-handle-btn-input position-relative w-180" id="commerce">
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
                    <!-- <a-form-item has-feedback>
                      <a-input
                        placeholder="请选择Panda商务"
                        autocomplete="off"
                        v-decorator="[
                          'commerce',
                          { rules: [
                            {
                              required: true,
                              message: 'Panda商务不能为空！',
                            },
                          ]}
                        ]"
                      >
                        <a-icon slot="prefix" type="user" />
                      </a-input>
                    </a-form-item>-->
                  </div>
                </div>
                <!-- <div class="text-panda-text-7 mb12x fw_600">
                  结算币种
                  <span class="panda-text-red">*</span>
                </div>
                <div class="append-handle-btn-input position-relative w-180">
                  <a-form-item>
                    <a-select
                      autocomplete
                      class="w-240"
                      placeholder="请选择结算币种"
                      size="large"
                      @change="handleCurrencyChange"
                      v-decorator="[
                        'currency',
                        { rules: [{ required: true, message: '结算币种不能为空！' }] },
                      ]"
                    >
                      <a-select-option
                        :value="item.value"
                        v-for="(item, index) in currencyList"
                        :key="index"
                      >{{item.label}}</a-select-option>
                    </a-select>
                    <div class="position-absolute select-left-border5"></div>
                  </a-form-item>
                </div>-->
              </div>
              <div class="col-lg-3 col-md-2 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb10x fw_600">
                    商户有效期
                    <span class="panda-text-red">*</span>
                  </div>
                  <div id="time" class="append-handle-btn-input position-relative w-200">
                    <a-form-item>
                      <a-range-picker
                        size="large"
                        :placeholder="['开始时间', '结束时间']"
                        v-decorator="['range-picker', rangeConfig]"
                      />
                    </a-form-item>
                    <!-- <a-range-picker :placeholder="['开始时间', '结束时间']" @change="onChange" @ok="onOk"></a-range-picker> -->
                  </div>
                </div>
              </div>
              <div class="col-4 ml30x">
                <div class="pl40x">
                  <div class="text-panda-text-7 mb10x fw_600">
                    合作协议文件
                    <!-- <span class="panda-text-red">*</span> -->
                  </div>
                  <div class="append-handle-btn-input">
                    <div>
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
                  </div>
                </div>
              </div>
            </div>

            <!-- 白名单IP -->
            <div class="row">
              <div class="col-lg-10 col-md-6">
                <div class="pl40x">
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
                        size='large'
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
            <div class="row mt20x pl40x mb20x">
              <q-btn
                class="panda-btn-primary-dense bg-primary mr20x"
                style="width:100px;height:32px; "
                @click="handleSubmit"
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
        <!-- </form> -->
      </a-form>
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
import editOrUpdateMixin from "src/pages/merchant/merchantc/mixin/index.js";
import dialogSelectLevel from "src/pages/merchant/merchantc/component/dialogSelectLevel.vue";

export default {
  mixins: [commontoolmixin, editOrUpdateMixin],
  components: {
    dialogSelectLevel
  },
  data() {
    return {
      httpUrl_72: require("../../../assets/img/bg1.png")
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "edit" });
  },
  created() {
    this.init_random_number();
    this.init_commerce_list();
  },
  methods: {
    handleChange(value) {
      console.log(`selected ${value}`);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          values.agentLevel = this.$route.query.agentLevel; //商户类型
          values.logo = this.formData.logo;
          let contact = "";
          let phone = "";
          this.users.map(item => {
            item.contact && (contact += item.contact + ",");
            item.phone && (phone += item.phone + ",");
          });
          values.contact = contact.slice(0, contact.lastIndexOf(","));
          values.phone = phone.slice(0, phone.lastIndexOf(","));
          let filePath = "";
          let fileName = "";
          this.files.map(item => {
            item.file && (filePath += item.file + ";");
            item.name && (fileName += item.name + ";");
          });
          values.fileName = fileName.slice(0, fileName.lastIndexOf(";"));
          values.filePath = filePath.slice(0, filePath.lastIndexOf(";"));
          values.level = this.formData.level;
          const rangeValue = values["range-picker"];
          values = {
            ...values,
            startTime: rangeValue[0].format("YYYY-MM-DD"),
            endTime: rangeValue[1].format("YYYY-MM-DD")
          };
          console.log(values, "values");
          if (this.handleNeedValues(values)) {
            let params = this.delete_empty_property_with_exclude(values);
            this.ajaxLoading = true;
            api_merchant.post_manage_merchant_create(params).then(res => {
              let { code, msg } = res.data;
              if (code == "0000000") {
                this.ajaxLoading = false;
                this.$message.success("新建直营商户成功！");
                this.$router.go(-1);
                this.handleRouteParams();
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
      } else if (values.vipAmount && !values.vipPaymentCycle) {
        this.$message.warn("会员费缴纳周期不能为空！");
        return false;
      } else if (values.techniqueAmount && !values.techniquePaymentCycle) {
        this.$message.warn("技术服务费缴纳周期不能为空！");
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
    
    handleTransfeiModeChange(val) {
      this.formData.transferMode = val;
    },
    //生成随机6位数字
    init_random_number() {
      let merchantCode = Math.random()
        .toString()
        .slice(-6);
      this.$nextTick(() => {
        this.form.setFieldsValue({ merchantCode });
      });
    },
    handle_function(item) {
      this.formData.level = item.level;
      this.$nextTick(() => {
        let initValues = {
          levelName: item.levelName,
          terraceRate: item.terraceRate,
          computingStandard: item.computingStandard,
          paymentCycle: item.paymentCycle,
          vipAmount: item.vipAmount,
          vipPaymentCycle: item.vipPaymentCycle,
          techniqueAmount: item.techniqueAmount,
          techniquePaymentCycle: item.techniquePaymentCycle
        };
        if (!item.vipPaymentCycle) {
          delete initValues.vipPaymentCycle;
        }
        if (!item.techniquePaymentCycle) {
          delete initValues.techniquePaymentCycle;
        }
        this.form.setFieldsValue(initValues);
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-input {
  min-height: 36px;
  line-height: 36px;
  font-size: 12px;
}

>>>.has-error .ant-form-explain, .has-error .ant-form-split {
  font-size: 12px;
}

>>>.ant-select-selection--single {
  height: 36px;
  line-height: 36px;
}

.ant-select-selection__placeholder {
  margin-top: 0px;
  line-height: 36px;
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
  height: 36px;
  font-size: 12px;
  line-height: 36px;
}

>>>#time .ant-input {
  height: 36px;
  line-height: 36px;
  font-size: 12px;
  padding: 0 11px;
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

>>>.ant-upload.ant-upload-select {
  height: 36px;
  line-height: 36px;
}

>>>#commerce .ant-select-selection__rendered {
  line-height: 36px;
}
</style>
