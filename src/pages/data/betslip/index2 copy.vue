<template>
  <div class="full-width full-height position-relative">
    <div class="pl10x pt10x fs14">
      <q-breadcrumbs separator="/" active-color="whiddte" class="panda-text-2">
        <q-breadcrumbs-el label="数据中心"/>
        <q-breadcrumbs-el label="注单查询" class="panda-text-1 fs14" />
      </q-breadcrumbs>
    </div>
    <div class="pt10x fs14 bg-panda-bg-6 mall shadow-3 line-height-30px">
      <div class="row pl10x mb10x">
        <!-- 投注时间tab栏 -->
        <!-- <div class="append-handle-btn-input">
          <a-radio-group v-model="pagination.filter">
            <a-radio-button value="3">结算时间</a-radio-button>  
            <a-radio-button value="1">投注时间</a-radio-button>        
            <a-radio-button value="2">开赛时间</a-radio-button>
          </a-radio-group>
        </div> -->
        <div class="append-handle-btn-input position-relative">
          <a-select
            autocomplete
            class="w-120"
            placeholder="请选择时间"
            v-model="pagination.filter"
            @change="handle_change"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in filterType"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <div class="append-handle-btn-input pl10x row line-height-30px" >
          <!-- <div class="mr10x fs14">查询时间</div> -->
          <div class="w-250 mr10x">
            <a-range-picker
              show-time
              style="width: 300px;"
              showToday
              :allowClear="false"
              :disabled-date="disabledDate"         
              :value="[moment(searchForm.startTime,'YYYY-MM-DD HH:mm:ss'), moment(searchForm.endTime, 'YYYY-MM-DD HH:mm:ss')]"
              @change="on_change"
            />
          </div>
          <a-checkbox v-model="isDay">
            自然日
          </a-checkbox>
        </div>
        <div class="append-handle-btn-input position-relative ">
          <a-select
            autocomplete
            class="w-120"
            placeholder="请选择类型"
            v-model="searchForm.matchType"
            @change="handle_change"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in matchTypeList"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <!-- <div class="append-handle-btn-input position-relative ml10x">
          <a-select
            autocomplete
            class="w-120"
            placeholder="请选择状态"
            v-model="searchForm.loseOrWin"
            @change="handle_change"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in loseOrWinStatus"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-bet"></div>
        </div> -->
        <div class="append-handle-btn-input ml10x row w-180 position-relative" style=" width: 180px;">
          <a-select
            show-search
            mode="multiple"
            placeholder="请选择注单状态"
            option-filter-prop="children"
            style="width: 100%"
            v-model="searchForm.orderStatusList"
            :filterOption="filterOption"
            :disabled="pagination.filter == 3? true: false"
            allowClear
            showArrow
            :maxTagCount="1"
            :maxTagTextLength="4"      
          >
            <!-- @change="handle_change" -->
            <a-select-option
              :value="item.value"
              :label="item.label"
              v-for="(item,index) in settleStatusName"
              :key="'status'+index"
            >{{item.label}}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-bet"></div>
        <!-- <div class="append-handle-btn-input position-relative ml20x" style="margin-top:1px">
          <a-select
            autocomplete
            class="w-120"
            placeholder="请选择结算"
            v-model="searchForm.orderStatus"
            :disabled="pagination.filter == 3? true: false"
            @change="handle_change"
          >
            <a-select-option
              :value="item.value"
              v-for="(item, index) in settleStatusName"
              :key="index"
            >{{ item.label }}</a-select-option>
          </a-select>
          <div class="position-absolute select-left-border-bet"></div> -->
        </div>
        <div class="append-handle-btn-input ml10x w-200 position-relative">
          <a-input
            v-model="searchForm.matchId"
            placeholder="请输入注单号/赛事ID"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <div class="append-handle-btn-input ml10x w-200 position-relative">
          <a-input
            v-model.trim="searchForm.userId"
            placeholder="请输入用户ID/用户名"
            @keydown.enter="handle_search"
            autocomplete="off"
            allowClear
          >
            <my-icon slot="suffix" type="p-icon-chazhao" class="text-panda-text-4 fs12" />
          </a-input>
          <div class="position-absolute select-left-border-bet"></div>
        </div>
        <div class="append-handle-btn-input pl10x row line-height-30px">
          <a-checkbox v-model="isMore">
            二次结算
          </a-checkbox>
        </div>
        <div class="top" @click="handle_expand">
          <my-icon v-if="is_expand" type="p-icon-top" class="fs20 ml10x cursor-pointer"></my-icon>
          <my-icon v-else type="p-icon-bottom"  class="fs20  ml10x cursor-pointer"></my-icon>
        </div>
        <div class="append-handle-btn-input pl20x height-30px line-height-30px">
          <a-button
            type="primary"
            style="height: 30px; line-height: 30px;"
            @click="handle_search"
          >搜索</a-button>
        </div>
        <q-space />
        <a-dropdown>
          <a-menu slot="overlay" @click="handle_export_excel">
            <a-menu-item key="1">导出注单记录</a-menu-item>
            <a-menu-item key="2">导出账变记录</a-menu-item>
          </a-menu>
          <a-button class="mr20x" type="primary"> <a-icon type="export" /> 导出报表 </a-button>
        </a-dropdown>
        <!-- <q-btn
          class="panda-btn-primary-dense bg-primary mr20x"
          style="width:105px;height:30px; "
          @click="handle_export_excel"
        >
          <a-icon type="export" />
          <div class="ml10x">导出报表</div>
        </q-btn> -->
      </div>
      <div class="border-top" v-if="is_expand"></div>
      <div class="content" v-if="is_expand">
        <div class="row line-height-30px items-center text-panda-text-dark bg-panda-bg-6 pb10x pt10x">
          <div class="append-handle-btn-input pl10x row line-height-30px">
            <div style="line-height: 30px; margin-right: 10px;">投注金额</div>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.minBetAmount"
                placeholder="最小值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.maxBetAmount"
                placeholder="最大值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input pl10x pr10x row line-height-30px">
            <div style="line-height: 30px; margin-right: 10px;">输赢金额</div>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.minProfit"
                placeholder="最小值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
            <span class="ml5x mr5x">~</span>
            <div class="w-110">
              <a-input-number
                v-model.trim="searchForm.maxProfit"
                placeholder="最大值"
                :max="10000000000"
                autocomplete="off"
              ></a-input-number>
            </div>
          </div>
          <div class="append-handle-btn-input position-relative">
            <a-select
              autocomplete
              class="w-120"
              placeholder="请选择投注"
              v-model="searchForm.seriesType"
              @change="handle_change"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in settleTypeName"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input position-relative ml10x" style="margin-top:1px">
            <a-select
              autocomplete
              class="w-120"
              placeholder="请选择赛种"
              v-model="searchForm.sportId"
              @change="handle_sport_id_change"
            >
              <a-select-option
                :value="item.value"
                v-for="(item, index) in allMatches"
                :key="index"
              >{{ item.label }}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance" style="margin-top:1px"></div>
          </div>
          <div class="no-left append-handle-btn-input ml10x row position-relative" style=" width: 200px !important;">
            <a-tree-select             
              show-search
              :tree-data="merchantList"
              style="width: 100%"
              @change="handle_merchant_change"
              :dropdown-style="{maxHeight: '400px', overflow: 'auto' }"
              placeholder="请输入或选择商户名称"
              allow-clear
              dropdownMatchSelectWidth
              tree-default-expand-all
              treeNodeFilterProp='title' 
            >
            </a-tree-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input pl10x row w-280 position-relative" style="margin-top:1px;">
            <a-select
              v-model="value"
              mode="multiple"
              show-search
              style="width: 100%"
              placeholder="请选赛种后输入或选择玩法名称"
              option-label-prop="label"
              :filterOption="filterOption"
              showArrow
              allowClear
              :maxTagCount="2"
              :maxTagTextLength="2"
            >
              <my-icon slot="prefix" type="p-icon-chazhao" class="panda-text-1 fs15" />
              <a-select-option
                :value="item.playId+'/'+index"
                :label="item.playName"
                v-for="(item,index) in hotPlayList"
                :key="'play'+index"
              >{{item.playName}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
          <div class="append-handle-btn-input ml10x row position-relative w-240">
            <a-select
              show-search
              placeholder="请输入或选择赛事等级"
              style="width: 100%"
              :filterOption="filterOption"
              allowClear
              @change="handle_match_change"
            >
              <a-select-option
                :value="item.id"
                :label="item.name"
                v-for="(item) in matchLevelList"
                :key="'match'+item.id"
              >{{item.name}}</a-select-option>
            </a-select>
            <div class="position-absolute select-left-border-finance"></div>
          </div>
        </div>
      </div>
      <a-table
        class="pl10x pr10x parent-table-open"
        :columns="columns"
        :dataSource="tabledata"
        :scroll="{ x:1670, y: !is_expand? 674: 622 }"
        :pagination="pagination"
        :loading="tabledata_loading"
        @change="sorterForTable"
        :expandedRowKeys="expandedRowKeysByDetail"
        size="middle"
        rowKey="orderNo"
      >
        <div slot="userId" slot-scope="text,record" class="tdpadding">
          <div >
            <div class="text-pande-primary color-blue" v-if="searchForm.seriesType == 2 || record.seriesType != 1">
              <span>{{ record.seriesValue }}</span>
              <span class="q-ml-md">共:{{ record.betCount }} 注</span>
              <span class="q-ml-md">每注: {{ record.orderDetailList[0].betAmount }}</span>
            </div>
            <span class=" cursor-pointer" @click="handleCopy(record.userName,'用户名')">{{ record.userName }}</span>
          </div>
          <!-- <span class="Detail-text-grey">{{record.userLevel | filterUserLevel}}</span> -->
          <div>
            <div class="Detail-text-grey cursor-pointer"  @click="handleCopy(record.orderNo,'注单号')">注单号 {{record.orderNo}}</div>
            <div class="Detail-text-grey cursor-pointer" @click="handleCopy(record.uid,'用户ID')">用户ID {{record.uid}}</div>
          </div>
        </div>
        <!-- 赛事信息 -->
        <div slot="betNoInfo" slot-scope="text,record">
          <div v-for="(item, index) in record.orderDetailList" :key="index" class="item-content">
            <q-separator v-if="record.orderDetailList!==1&&index>0" class="mt5x mb5x hr-grey"></q-separator>
            <div class="item-open position-relative">
              <table-cell-ellipsis-ant
                :span_html="('<div class=\'ellipsis\'>'+item.matchInfo+'</div><div class=\'ellipsis Detail-text-grey\'>'+  get_sport_name(item)  +'&nbsp;/&nbsp;'+  item.matchName +'</div>')"
                :str_all="('<div>'+item.matchInfo+'</div><div>'+ item.sportName  +'&nbsp;/&nbsp;'+  item.matchName +'</div>')"
              ></table-cell-ellipsis-ant>
              <!-- <span
                class="Detail-text-grey cursor-pointer"
                @click="handleCopy(item.matchId,'赛事ID')"
              >赛事ID {{item.matchId}}</span> -->
              <span class="row">
                <span class="Detail-text-grey mr5x">赛事ID</span>
                <a-tooltip v-if="(item.matchId+'').length>10" placement="bottom">
                  <template slot="title">
                    <div
                      v-html="item.matchId+''"
                      :style="`max-width: 150px; word-break:break-all;`"
                    ></div>
                  </template>
                  <span class="text-over2 Detail-text-grey cursor-pointer" @click="handleCopy(item.matchId,'赛事ID')">{{item.matchId}}</span>
                </a-tooltip>
                <span v-else class="text-over2 Detail-text-grey cursor-pointer" @click="handleCopy(item.matchId,'赛事ID')">{{item.matchId}}</span>
              </span>
              <div
                class="Detail-text-grey col-2 position-absolute"
                style="right: 5px; bottom: 3px;"
              >{{item.beginTimeStr&&item.beginTimeStr.substring(5,item.beginTimeStr.length)}}
              </div>
            </div>
          </div>
        </div>
        <div slot="betNoDetail" slot-scope="text,record">
          <!-- 注单详情 -->
          <div v-for="(item, index) in record.orderDetailList" :key="index" class="w300x position-relative">
            <q-separator v-if="record.orderDetailList!==1&&index>0" class="mt5x mb5x hr-grey"></q-separator>
            <div class="item-open">
              <div class="row justify-between">
                <div class="ellipsis row">
                  <!-- {{ item.playName }} -->
                  <table-cell-ellipsis-ant
                    :span_html="('<div class=\'ellipsis\'>'+item.playName+'</div>')"
                    :str_all="('<div>'+item.playName+'</div>')"
                    :col_width="200"
                  ></table-cell-ellipsis-ant>
                  <span v-if="item.scoreBenchmark" class="ml5x"> [{{item.scoreBenchmark.replace(':','-')}}]</span>
                </div>
                <div
                  class="ellipsis"
                >{{ matchTypeList[item.matchType].label }}</div>
              </div>
              <div class="row justify-between">
                <div :class="[searchForm.seriesType == 2 || searchForm.seriesType == '' || searchForm.seriesType == 1?'col-10':'col-12']">
                  <table-cell-ellipsis-ant
                    :span_html="('<div class=\'text-FFBA72 ellipsis\'>'+item.marketValue+'</div>')"
                    :str_all="('<div>'+item.marketValue+'</div>')"
                  ></table-cell-ellipsis-ant>
                </div>
              </div>
              <div class="Detail-text-grey col-2 row" v-if="item.settleScore">
                <div>赛果 </div>
                <table-cell-ellipsis-ant
                  :span_html="('<div class=\'ellipsis ml5x\'>'+ item.settleScore+'</div>')"
                  :str_all="('<div>'+item.settleScore+'</div>')"
                ></table-cell-ellipsis-ant>
                <!--赛果 {{item.settleScore?item.settleScore: ''}} -->
                <!-- {{item.settleScore?item.settleScore: ''}} -->
              </div>
            </div>
            <div
              class="Detail-text-grey position-absolute"
              style="right: 10px; bottom: 0px;"
            >投注 {{record.createTimeStr&&record.createTimeStr.substring(5,record.createTimeStr.length)}}</div>
          </div>
        </div>
        <!-- 赔率 -->
        <div slot="oddsValue" slot-scope="text,record">
          <template>
            <div v-for="(item, index) in record.orderDetailList" :key="'oddsValue'+index">
              <q-separator v-if="record.orderDetailList!==1&&index>0" class="mt5x mb5x hr-grey"></q-separator>
              <div class="item-open mid-center">
                <!-- <div class="text-red pt10x">{{ (item.oddsValue/100000).toFixed(3).slice(0,-1) }}</div> -->
                <div class="text-red" :class="item.betStatus == 0 ? 'pt10x': ''">{{ get_float_str(item.oddFinally) }}</div>
                <div class="Detail-text-grey">[{{item.marketType}}]</div>
                <!-- 10-09 注释 串关里面只要有输就不需要显示未结算字段 && searchForm.seriesType != 2  -->
                <!-- <div class="Detail-text-grey fs12" v-if="item.betStatus == 0 && searchForm.seriesType == 2">{{settleStatusNameObj[item.betStatus]}}</div> -->
                <div class=" inline-block" :class="item.betResult == 4?'fs12': 'Detail-text-grey'" v-if=" item.betStatus == 1">
                  <span>{{ item.betResult | filterStatues }} </span>
                  <span v-if="record.settleType > 1">
                    <!-- (二次结算) -->
                    <span class="fs12" v-if="record.settleType > 1">
                      <a-tooltip placement="right">
                        <template slot="title">
                          <span :style="`max-width: 200px; word-break:break-all; font-size: 12px;`">{{item.remark}}</span>
                        </template>
                        <span class="cursor-pointer" :class="record.oderStatus == 3? 'text-red': record.orderStatus == 4? 'text-gold': ''"><a-icon class="ml5x" type="info-circle" /></span>
                      </a-tooltip>  
                    </span>
                  </span>         
                </div>
                <!-- <div class="text-red fs12" v-if="record.seriesType != 1 && [3,4].includes(item.betStatus)">
                  <a-tooltip placement="right">
                    <template slot="title">
                      <span>{{item.remark}}</span>
                    </template>
                    <span class=" cursor-pointer">取消<a-icon class="ml5x" type="info-circle" /></span>
                  </a-tooltip>  
                </div> -->
                <div class="text-red fs12" v-if="[3,4,5].includes(item.betStatus)">
                  <a-tooltip placement="right">
                    <template slot="title">
                      <div :style="`max-width: 200px; word-break:break-all; font-size: 12px;`">{{item.remark}}</div>
                    </template>
                    <span class="cursor-pointer" :class="record.oderStatus == 3? 'text-red': record.orderStatus == 4? 'text-gold': ''">{{item.cancelType | filterCancelType}}<a-icon class="ml5x" type="info-circle" /></span>
                  </a-tooltip>  
                </div>
              </div>
            </div>
          </template>
          <div v-for="(item, index) in record.orderDetailList" :key="index">
            <!-- <a-popover title placement="right">
              <template slot="content">
                <div style="width:250px" class="card-panel-row row justify-between">
                  <div>
                    <div>BET365</div>
                    <div>上盘:1.93</div>
                    <div>下盘:1.90</div>
                  </div>
                  <div>
                    <div>沙巴</div>
                    <div class="text-FFBA72">上盘:1.98</div>
                    <div class="text-FFBA72">下盘:1.85</div>
                  </div>
                  <div>
                    <div>188</div>
                    <div>上盘:1.88</div>
                    <div>下盘:1.90</div>
                  </div>
                </div>
              </template> -->
              <!-- <div v-if="index<1 && searchForm.seriesType == 1">
                <div class="text-red">{{ get_float_str(item.oddFinally) }}</div>
                <div class="Detail-text-grey">[{{item.marketType}}]</div>
              </div> -->
            <!-- </a-popover> -->
          </div>
        </div>
        <div slot="settleAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{record.orderAmountTotal? record.orderAmountTotal: '-' | amount}}</div>
            <div class="Detail-text-grey">{{ record.localCurrencyCode | filterCurrency }}</div>
          </div>
        </div>
        <div slot="localBetAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{(text===0||!text)?'-':text | amount}}</div>
            <div class="Detail-text-grey">{{ record.localCurrencyCode | filterCurrency }}</div>
          </div>
        </div>
        <div slot="profitAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{record.profitAmount ?record.profitAmount:'-' | amount}}</div>
            <div class="Detail-text-grey">{{ record.currencyCode | filterCurrency }}</div>
          </div>
        </div>
        <div slot="localProfitAmount" slot-scope="text,record">
          <div class="item-open text-center">
            <div class="pt10x">{{(text===0||!text)?'-':text | amount}}</div>
            <div class="Detail-text-grey">{{ record.localCurrencyCode | filterCurrency }}</div>
          </div>
        </div>
        <span slot="outcomeTitle">
          <div class=" position-relative">
            <span id="first">
            状态
            </span>
          </div>
          <!-- <span id="third"></span> -->
        </span>
        <div slot="outcome" slot-scope="text,record,index">      
          <div class="item-open position-relative" :id="'third'+index">
            <span id="second" v-if="index == 0" :class="showIcon?'opa1': 'opa0'"   class=" position-absolute text-left" style="left: -50px;top: 10px;z-index:100004; width: 92px">
              <a-checkbox-group v-model="value1">
                <a-row class=" line-height-30px">
                  <a-col :span="24">
                    <a-checkbox value="2" >
                      走水
                    </a-checkbox>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox value="3">
                      输
                    </a-checkbox>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox value="4">
                      赢
                    </a-checkbox>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox value="5">
                      赢半
                    </a-checkbox>
                  </a-col>
                  <a-col :span="24">
                    <a-checkbox value="6">
                      输半
                    </a-checkbox>
                  </a-col>
                </a-row>
              </a-checkbox-group>
              <q-separator style="margin-top: -5px;"></q-separator>
              <div class=" flex-inline">
                <a-button style="width: 40px; font-size: 13px; margin-left: -10px;" size='small' type="link">确定</a-button>
                <a-button style="width: 40px; font-size: 13px;" size='small' type="link">重置</a-button>
              </div>
            </span>
            <!-- orderStatus为1 是已结算  2 为取消 3位待确认-->
            <div
              v-if="record.orderStatus !== 1"
              :class="[3,4].includes(record.orderStatus)?['text-red']:''"
              class="position-relative"
            >{{settleStatusNameObj[record.orderStatus]}}
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>查看注单账变</span>
                </template>
                <my-icon @click="handle_look_transfer(record)" class="ml5x cursor-pointer" type="p-icon-zhangbian"></my-icon>
              </a-tooltip>
            </div>
            <div
              :class="['4','5'].includes(text)?['text-red']:''"
            >
              <span v-if="record.orderStatus != 2 ">{{filterstatues[record.outcome]}}</span>
              <a-tooltip placement="bottom">
                <template slot="title">
                  <span>查看注单账变</span>
                </template>
                <my-icon @click="handle_look_transfer(record)" class="ml5x cursor-pointer" v-if="record.orderStatus === 1 && record.settleType === 1" type="p-icon-zhangbian"></my-icon>
              </a-tooltip>
              <a-tooltip  placement="bottom">
                <template slot="title" >
                  <span>二次结算</span>
                </template>
                <my-icon @click="handle_look_transfer(record)" class="ml5x cursor-pointer" v-if="record.settleType > 1 && record.orderStatus === 1" type="p-icon-ercijiesuan"></my-icon>
              </a-tooltip>
            </div>
            <div>{{ record.merchantName }}</div>
            <div
              class="Detail-text-grey"
              v-if="record.orderStatus != 2"
            >{{ record.settleTimeStr&&record.settleTimeStr.substring(5,record.settleTimeStr.length) }}</div>
          </div>
        </div>
        <div slot="deviceType" slot-scope="text,record">
          <div class="item-open">
            <div>[{{ text&&deviceTypeName[text] }}]</div>
            <div class="Detail-text-grey">{{ record.ip }}</div>
            <a-tooltip v-if="getStrLength(record.ipArea) > 16" placement="bottom">
              <template slot="title">
                <div
                  :style="`max-width: 200px; word-break:break-all;`"
                >{{record.ipArea}}</div>
              </template>
              <span class="text-over2 Detail-text-grey">{{record.ipArea}}</span>
            </a-tooltip>
            <span v-else class="text-over2 Detail-text-grey">{{record.ipArea}}</span>
          </div>
        </div>
        <div slot="remark" slot-scope="text">
          <div style="width:140px;padding: 0 8px;">
            <table-cell-ellipsis-ant
              :span_html="('<div class=\'ellipsis Detail-text-grey\'>'+text+'</div>')"
              :str_all="('<div>'+text +'</div>')"
              :defaultplace="'right'"
            ></table-cell-ellipsis-ant>
          </div>
        </div>
      </a-table>
      <div class="fs16 position-absolute" style="bottom: 11px; left: 40px;" v-if="tabledata.length>0">
        <span class="pr10x">
          <span class="title-grey">总计: </span>
          <span class="fw_600">{{userStatistics.sumBetNo}}单</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户数: </span>
          <span class="fw_600">{{userStatistics.userAmount}}人</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">总计投注额: </span>
          <span class="fw_600" v-if="userStatistics.betAmount">¥{{userStatistics.betAmount}}</span>
          <span class="fw_600" v-else>--</span>
        </span>
        <span class="pr10x">
          <span class="title-grey">用户净输赢: </span>
          <span
            v-if="userStatistics.sumProfitAmount !== undefined"
            class="fw_600"
            :class="userStatistics.sumProfitAmount>0?'text-red': 'text-green'"
          >{{userStatistics.sumProfitAmount}}</span>
          <span v-else>--</span>
        </span>
        <a-tooltip trigger="hover">
          <template slot="title">
            <div :style="`max-width: 240px; word-break:break-all;`">此处只汇总用户近90天的已结算注单记录！与用户基本信息中累计注单数据不一致属于正常现象，详情请咨询平台客服工作人员！</div>
          </template>
          <a-icon type="question-circle" :class="userStatistics.sumProfitAmount>0?'text-red': 'text-green'" class="fs15 ml10x cursor-pointer" />
        </a-tooltip>
      </div>
    </div>
    <!--相关账变记录-->
    <q-dialog v-model="transferShow" persistent transition-show="scale" transition-hide="scale">
      <dialog-transfer :betTodayData="betTodayData" :detailObj="detailObj"></dialog-transfer>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { api_user,api_export } from "src/api/index.js";
import commonmixin from "src/mixins/common/commontoolmixin.js";
import constantmixin from "src/mixins/common/constantmixin.js";
import dataCenterMixin from "src/mixins/module/datacentertablemixin.js";
import log_login_mixin from "src/pages/data/betslip/mixin/index.js";
import { tablecolumns_config } from "src/pages/data/betslip/config/config.js";
import dialogTransfer from "src/pages/data/betslip/component/dialogTransfer.vue";
// import { tablecolumns_config1 } from "src/pages/data/betslip/config/config_1.js";
import { handleCopy, getStrLength } from "src/util/module/common.js";
import tableCellEllipsisAnt from "src/components/table/tableCellEllipsisAnt.vue";
import moment from "moment";
export default {
  mixins: [commonmixin,dataCenterMixin, log_login_mixin, constantmixin],
  components: {
    tableCellEllipsisAnt,
    dialogTransfer
  },
  data() {
    return {
      expandedRowKeysByDetail: [],   //来控制展开关闭和展开参数设置 暂无用
      tabledata: [], //表格数据
      columns: tablecolumns_config, // 表格配置
      tabledata_loading: false, //表格loading
      visable_select: false, // 下拉框是否显示
      // 用户统计
      userStatistics: {
        // 投注总额统计
        betAmount: "",
        // 注单统计
        sumBetNo: "",
        // 用户净输赢统计
        sumProfitAmount: "",
        // 用户统计
        userAmount: "",
        // 有效流水
        validFlow: ""
      },
      searchForm: {
        //搜索查询条件
        sportId: "",  //赛种
        seriesType: '', // 投注方式
        matchType: "", // 注单类型
        orderStatusList: [],  //注单状态集合
        tournamentId: '', //赛事等级ID
        matchId: "", //赛事ID
        userId: "", //用户ID
        userName: "", //用户名
        merchantCode: '', // 商户名称
        orderNo: "", // 注单号
        startTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 12:00:00`:`${moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')} 12:00:00`,
        endTime: moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')} 11:59:59`:`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 11:59:59`,
        minBetAmount: "", //  投注金额最小值
        maxBetAmount: "", // 投注金额最大值
        minProfit: "", // 输赢金额最小值
        maxProfit: "", // 输赢金额最大值
        playIdList: '', // 玩法名称集合
        settleType: '', // 是否二次结算 30为二次结算 传空为所有
        loseOrWin: '', //输赢状态
        scrollY: 622,
      },
      value: [],  // 选中的玩法集合
      hotPlayList: [],  // 玩法集合数据
      merhchantList: [], // 商户名称数据
      matchLevelList: [], //联赛等级数据
      isDay: false, // 账务日 自然日
      isMore: false, // 多次结算
      transferShow: false, //账变记录弹窗阀值
      betTodayData: [],  // 汇总数据
      detailObj: {}, // 传给弹窗的数据
      third: '', // 引导需要生成的dom元素
      showIcon: false, // 是否显示icon
      value1: [],  // 引导里面的状态集合
      is_date_change: false, // 是否是手动选择了查询时间
      is_expand: true, // 默认是展开
    };
  },
  computed: {
    ...mapGetters(['get_dom'])
  },
  created() {
    this.init_merchant_list();
    this.initTableData();
    this.init_hot_play_name();
    this.init_tournament_list();
    // this.init_merchant_list();
  },
  beforeDestroy(){
    this.clear_dom();
  },
  watch: {
    value(val) {
      console.log(`selected:`, val);
      if (val && val.length > 0) {
        this.values = val.map(item => (item = item.split("/")[0]));
      }else{
        this.values = ''
      }
      console.log(this.values);
    },
    third(){
     
      let isFirst = this.$q.localStorage.getItem('isFirst');
      // 控制用户第一次进来才有引导
      !isFirst && window.performance.navigation.type !== 1 && this.driver_init();
    },
    isDay(val){
      let { startTime, endTime} = this.searchForm;
      if(val){
        // 自然日是从 00:00:00 到 23:59:59
        if(this.is_date_change){
          // 手动选中了查询时间
          // console.log()
          this.searchForm.startTime = moment().format('HH')>12?`${moment(new Date(startTime).setDate(new Date(startTime).getDate())).format('YYYY-MM-DD')} 00:00:00`:`${moment(new Date(startTime).setDate(new Date(startTime).getDate())).format('YYYY-MM-DD')} 00:00:00`
          this.searchForm.endTime = moment().format('HH')>12?`${moment(new Date(endTime).setDate(new Date(endTime).getDate())).format('YYYY-MM-DD')} 23:59:59`:`${moment(new Date(endTime).setDate(new Date(endTime).getDate())).format('YYYY-MM-DD')} 23:59:59`
        }else{
          // 默认查询时间
          this.searchForm.startTime = moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 00:00:00`:`${moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')} 00:00:00`
          this.searchForm.endTime = moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')} 23:59:59`:`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 23:59:59`
        }     
      }else{
        // 账务日 是从今天的12:00:00 到 明天的11:59:59
        if(this.is_date_change){
          this.searchForm.startTime = moment().format('HH')>12?`${moment(new Date(startTime).setDate(new Date(startTime).getDate())).format('YYYY-MM-DD')} 12:00:00`:`${moment(new Date(startTime).setDate(new Date(startTime).getDate())).format('YYYY-MM-DD')} 12:00:00`
          this.searchForm.endTime = moment().format('HH')>12?`${moment(new Date(endTime).setDate(new Date(endTime).getDate())).format('YYYY-MM-DD')} 11:59:59`:`${moment(new Date(endTime).setDate(new Date(endTime).getDate())).format('YYYY-MM-DD')} 11:59:59`
        }else{
          // 默认查询时间
          this.searchForm.startTime = moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 12:00:00`:`${moment(new Date().setDate(new Date().getDate() - 1)).format('YYYY-MM-DD')} 12:00:00`
          this.searchForm.endTime = moment().format('HH')>12?`${moment(new Date().setDate(new Date().getDate() + 1)).format('YYYY-MM-DD')} 11:59:59`:`${moment(new Date().setDate(new Date().getDate())).format('YYYY-MM-DD')} 11:59:59`
        }
      }
    },
    "pagination.filter"(val){
      this.searchForm.orderStatusList= val == 3?[1]: [];
    },
    /**
     * @description 处理影藏下面一行条件查询时，解决无数据时的高度
     * @return {undefined} undefined
     */
    tabledata(val){
      this.$nextTick(() => {
        if(val.length == 0 && !this.is_expand){
          let app = document.querySelector('.ant-empty-normal');
          app.style.cssText="margin: 313px 0;"
        }
      })
    }
  },
  methods: {
    getStrLength,
    ...mapActions(['set_dom','clear_dom']),
    handle_expand(){
      this.is_expand = !this.is_expand;
    },
    handle_match_change(value) {
      this.searchForm.tournamentId = value;
      // this.initTableData();
      console.log(`selected ${value}`);
    },
    async init_tournament_list(){
      let match = this.allMatches.find( item => {
        if(item.value){
          return item.value == this.searchForm.sportId;
        }
      })
      let res = await api_user.get_order_user_queryTournamentList({args: match? match.label: ''})
      if(res.data.code === '0000000'){
        this.matchLevelList = res.data.data || [];
      }
    },
    /**
     * @description 处理id为18的政治娱乐
     * @param  {Object} 当前行数据
     * @return {String} 球种
     */
    get_sport_name(item){
      return item.sportId != 18? item.sportName: this.allMatches[11].label;
    },
    /**
     * @description 商户名称树形下拉框 选中某一个父级节点，需要将它子级节点value一起带给后台
     * @param  {value,label} 所选中的merchantCode值  所选中的merchantName值
     * @return {undefined} undefined
     */
    handle_merchant_change(value,label){
      console.log(value,label)
      if(value){
        let obj = this.merchantList.find(item => value == item.value)
        console.log(obj,'obj')
        if( obj && obj.children && obj.children.length > 0){
          let arr = []
          obj.children.forEach(child => {
            arr.push(child.value)
          })
          arr.unshift(value);
          this.searchForm.merchantCodeList = arr;
        }else{
          this.searchForm.merchantCodeList = [value]
        }
      }else{
        this.searchForm.merchantCodeList = ''
      }
      console.log(this.searchForm.merchantCodeList,'传给后台的参数')
    },
    /**
     * @description 用户新入引导
     * @return {undefined} undefined
     */
    driver_init(){
      const driver = new Driver({
        allowClose: false, //禁止点击外部关闭
        doneBtnText: '完成', // 完成按钮标题
        closeBtnText: '关闭', // 关闭按钮标题
        stageBackground: '#fff', // 引导对话的背景色
        nextBtnText: '下一步', // 下一步按钮标题
        prevBtnText: '上一步', // 上一步按钮标题
        onNext: (Element) => {
          console.log(Element,Element.node.id, Element.node.id == 'first')
          if(Element.node.id == 'first'){
            // 进入到第二步
            this.showIcon = true
          }else{
            this.showIcon = false
          }
        },
        onPrevious: (Element) => {
          console.log(Element,Element.node.id, Element.node.id == 'third0')
          if(Element.node.id == 'third0'){
            // 进入到第二步
            this.showIcon = true
          }else{
            this.showIcon = false
          }
        },
        onReset: (Element) => {
          console.log('关闭')
          this.$q.localStorage.set('isFirst', true)
         // 删除第二步的下拉框，防止影响到表格的点击事件
          console.log(Element.node,'关闭');
          if(Element.node.id == 'second'){
             Element.node.remove();
          }else if(Element.node.id == 'third0'){
            // console.log(document.getElementById('second'));
            document.getElementById('second').remove();
          }
        },
        onDeselected: (Element) => {
          if(Element.node.id == 'second'){
            // 进入到第二步
            this.showIcon = false
          }
           console.log(Element,Element.node.id)
          // this.showIcon = false
        }
      });
      driver.defineSteps([
      {
        element: '#first',
        popover: {
          className: 'first-step-popover-class',
          title: "点击此处筛选<span style='color:#1890FF'>更多状态</span>",
          // description: 'Body of the popover',
          position: 'left'
        }
      },
      {
        element: '#second',
        popover: {
          title: "筛选您想要的状态,<span style='color:#1890FF'>点击确定</span>",
          position: 'top'
        }
      },
      {
        element: '#third0',
        popover: {
          title: '您所筛选的结果！',
          position: 'right'
        }
      },
      ]);
      driver.start();
      // setTimeout(() => {driver.start();},200)
    },
    /**
     * @description 赔率小数位少2位就补齐，多2位就四舍五入
     * @param  {Number} num 赔率
     * @return {Number} 2位小数格式化后的赔率
     */
    get_float_str(num){
      num += '';
      num = num.replace(/[^0-9|\.]/g, ''); //清除字符串中的非数字非.字符  
      if (/^0+/) //清除字符串开头的0
      num = num.replace(/^0+/, '');
      if (!/\./.test(num)) //为整数字符串在末尾添加.00
      num += '.00';
      if (/^\./.test(num)) //字符以.开头时,在开头添加0
      num = '0' + num;
      num += '00'; //在字符串末尾补零
      num = num.match(/\d+\.\d{2}/)[0];
      return num;
    },
    /**
     * @description 查看账变
     * @param  {Object} record 当前行数据
     * @return {undefined} undefined
     */
    handle_look_transfer(record){
      this.detailObj = {...record};
      this.transferShow = true;
    },
    /**
     * @description 导出报表
     * @return {undefined} undefined
     */
    handle_export_excel(e) {
      if (this.pagination.total > 0) {
        let params = this.compute_init_tabledata_params();
        params = this.delete_empty_property_with_exclude(params);
        if(e.key == 1){
          //注单记录下载
          Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/user/exportTicketList" });      
        }else{
          //账变记录下载
          Object.assign(params,{"user-id": this.get_user_info.userId }, {"app-id": this.get_user_info.appId}, { url: "/order/user/exportTicketAccountHistoryList" });
        }
        api_export.post_excel_export(params);
      }
    },
    disabledDate(current) {
      return current.isBefore(moment(Date.now()).add(-90, 'days')) || current.isAfter(moment(Date.now()).add(1, 'days'))
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    handle_change() {
      this.handle_search();
    },
    handle_sport_id_change(){
      this.handle_search();
      this.init_hot_play_name();
      this.init_tournament_list();
    },
    /**
     * @description 注单中心统计接口
     * @param  {Object} params 传参
     * @return {undefined} undefined
     */
    query_statistics(params) {
      api_user.post_queryStatistics(params)
        .then(res => {
          let sus = this.$lodash.get(res, "data.code");
          let data = this.$lodash.get(res, "data.data") || {};
          if (sus == "0000000") {
            this.userStatistics = data;
          }
        })
        .catch(err => {
          console.error(err);
        });
    },
    moment,
    handleCopy,
    on_change(dates, dateStrings) {
      // this.start = dateStrings[0];
      // this.end = dateStrings[1];
      Object.assign(this.searchForm, {
        startTime: dateStrings[0],
        endTime: dateStrings[1]
      });
      this.is_date_change = true;
    },
    /**
     * @description 搜索按钮
     * @return {undefined}
     */
    handle_search() {
      this.initTableData();
    },
    // /**
    //  * @description 商户名称数据初始化
    //  * @return {undefined}
    //  */
    // async init_merchant_list(){
    //   let res = await api_user.post_manage_merchant_queryMerchantList({})
    //   // console.warn(res.data);
    //   if ((res.data.code = "0000000")) {
    //     this.merhchantList = res.data.data || [];
    //   }
    // },
    /**
     * @description 玩法名城数据初始化
     * @return {undefined} 
     */
    async init_hot_play_name() {
      let res = await api_user.post_order_user_queryHotPlayName({sportId: this.searchForm.sportId});
      console.log(res.data);
      if ((res.data.code = "0000000")) {
        this.hotPlayList = res.data.data || [];
      }
    },
    /**
     * @description 初始化表格数据
     * @return {undefined} 
     */
    initTableData() {
      this.tabledata_loading = true;
      let params = this.compute_init_tabledata_params();
      params = this.delete_empty_property_with_exclude(params);
      this.query_statistics(params);
      api_user.post_order_user_queryTicketList(params).then(res => {
        this.tabledata_loading = false;
        let code = this.$lodash.get(res, "data.code");
        if (code == "0000000") {
          let currentPage = this.$lodash.get(res, "data.data.pageNum") * 1 || 1;
          let arr = this.$lodash.get(res, "data.data.list") || [];
          this.tabledata = this.rebuild_tabledata_to_needed(arr);
          console.warn(this.tabledata,'this.tabledata')
          this.set_dom();
          if(!this.third && (this.get_dom == 1)){
            this.$nextTick(() => {
              console.warn(document.getElementById('third0'))
              this.third = document.getElementById('third0')
              // this.set_dom(this.third);
            })
          }else if(this.get_dom != 1){
            document.getElementById('second') && document.getElementById('second').remove();
          }
          this.expandedRowKeysByDetail = this.tabledata.map(x => x.id);
          console.warn(this.expandedRowKeysByDetail,'active')
          this.pagination.total =
            this.$lodash.get(res, "data.data.total") * 1 || 0;
        }else{
          this.tabledata = [];
          res.data.msg && this.$message.error(res.data.msg);
        }
      });
    },
   
    compute_init_tabledata_params() {
      let { current, pageSize, sort, orderBy, filter,outComeList } = this.pagination;
      let {
        sportId,
        seriesType,
        matchType,
        orderStatusList,
        matchId,
        userId,
        userName,
        merchantCode,
        orderNo,
        startTime,
        endTime,
        minBetAmount,
        maxBetAmount,
        minProfit,
        maxProfit,
        playIdList,
        settleType,
        merchantCodeList,
        loseOrWin,
        tournamentId
      } = this.searchForm;
      // 数字超过16为用户名 否为用户名
      if (/^\+?[0-9][0-9]*$/.test(userId) && userId.length > 16) {
        userId = userId;
        userName = "";
      } else {
        userName = userId;
        userId = "";
      }
      // 数字为14注单号 否为赛事ID
      if (matchId.length == 14) {
        (orderNo = matchId), (matchId = "");
      } else {
        (matchId = matchId), (orderNo = "");
      }
      return {
        pageNum: current,
        pageSize,
        matchId,
        minProfit,
        maxProfit,
        minBetAmount,
        maxBetAmount,
        orderNo,
        startTime,
        endTime,
        userId,
        userName,
        merchantCode,
        sportId,
        filter,
        seriesType,
        orderStatusList: orderStatusList.length > 0?orderStatusList: '',
        matchType,
        sort,
        orderBy,
        playIdList: this.values,
        settleType: this.isMore? '30': '',
        outComeList: loseOrWin && [loseOrWin], //结算状态集合
        merchantCodeList,
        tournamentId
      };
    }
  }
};
</script>

<style lang="stylus" scoped>
>>>.ant-spin-nested-loading > div > .ant-spin {
  max-height: 660px;
  min-height: 660px;
}

>>>.ant-empty-normal {
  margin: 287px 0;
}

>>>.match-team-child {
  .text-panda-text-light {
    >>>.show_toggle {
      position: absolute;
      right: 0;
    }
  }
}

>>>.ant-table-middle > .ant-table-content > .ant-table-scroll > .ant-table-header > table > .ant-table-thead > tr > th{
  background $panda-bg-3
}

.center {
  width: 30px;
  border-left: 0;
  pointer-events: none;
  background-color: #fff;
}

.max {
  width: 100px;
  text-align: center;
  border-left: 0;
}

.min {
  width: 100px;
  text-align: center;
  border-right: 0;
  border-radius: 4px 0 0 4px;
}

>>>.leftdetail div {
  width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ellipsis {
  overflow: hidden;
  max-width: 235px;
  text-overflow: ellipsis;
  white-space:nowrap;
}

.flipy {
  -moz-transform: scaleY(-1);
  -webkit-transform: scaleY(-1);
  -o-transform: scaleY(-1);
  transform: scaleY(-1);
  /* IE */
  filter: FlipV;
}

>>>.icon-tog {
  font-size: 16px;
}

.remarklist {
  width: 180px;
}

.item-content {
  width: 250px;
}

$paddingtd = 8px;

.item-open {
  height: 60px;
  padding: 0 $paddingtd;
}

.tdpadding {
  padding: 0 $paddingtd;
}
>>>.ant-input-number{
  width: 110px;
}
>>>.ant-table-thead > tr > th .anticon-filter, .ant-table-thead > tr > th .ant-table-filter-icon{
  right: 35px;
}

.opa0{
  opacity: 0;
}
.opa1{
  opacity:1
}

>>>.ant-table-filter-dropdown{
  z-index 100005;
}
>>>.ant-dropdown{
  z-index 100006
}

.text-over2{
  display inline-block;
  max-width 110px ;
  vertical-align middle;
  text-overflow ellipsis;
  overflow hidden;
  white-space nowrap;
}

>>>.ant-input-number{
  width: 90px;
}
</style>
