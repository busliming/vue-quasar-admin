
<template>
  <div
    style="width: 960px ; height:auto;max-width:960px; backgroundColor: pink"
    class="text-panda-text-7 position-relative"
  >
    <q-card class="text-black">
      <q-card-section class="no-padding position-relative bg-panda-dialog">
        <div class="row fs14 text-panda-text-7 pr10x pb10x text-center">
          <div class="pl20x mt10x full-width">
            <div class="fw_600 fs20">电子账单(2020年2月份)</div>
            <div class="text-panda-text-4">NO.234829138902</div>
          </div>
          <q-btn
            class="position-absolute text-panda-dialog-close"
            style="right:20px; top:5px;"
            flat
            dense
            icon="close"
            v-close-popup
          />
        </div>
      </q-card-section>
      <q-separator></q-separator>
      <div class="bg-panda-dialog pb20x">
        <div class="content">
          <div class="row pt20x">
            <div class="col-2">
              <span class="text-panda-text-4">客户名称：</span>
              <span class="text-panda-text-7">欧宝</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">分成方式：</span>
              <span class="text-panda-text-7">盈利</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">标注费率：</span>
              <span class="text-panda-text-7">20%</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">调整金额：</span>
              <span class="text-panda-text-7">-500,000</span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-2">
              <span class="text-panda-text-4">客户编号：</span>
              <span class="text-panda-text-7">100008</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">结算货币：</span>
              <span class="text-panda-text-7">人民币</span>
            </div>
            <div class="col-2 ml20x">
              <span class="text-panda-text-4">执行费率：</span>
              <span class="text-panda-text-7">15%</span>
            </div>
          </div>
          <div class="row mt10x">
            <div class="col-12">
              <span class="text-panda-text-4">调整原因：</span>
              <span class="text-panda-text-7">2月份投注达标，按协议免去会员费/补1月份曼联vs阿森纳比赛二次结算</span>
            </div>
          </div>
          <div class="row mt10x">
            <q-space></q-space>
            <div class>
              <q-icon
                class="panda-icon panda-icon-cha-kan panda-icon-hover fs20 mr20x cursor-pointer"
                @click.native="handleLook"
              >
                <q-tooltip
                  anchor="top middle"
                  content-class="bg-white text-black shadow-6"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <span>查看调整历史</span>
                </q-tooltip>
              </q-icon>
              <q-icon
                class="panda-icon panda-icon-bian-ji panda-icon-hover fs20 mr20x cursor-pointer"
                @click.native="handleLook"
              >
                <q-tooltip
                  anchor="top middle"
                  content-class="bg-white text-black shadow-6"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <span>调整电子账单</span>
                </q-tooltip>
              </q-icon>
              <q-icon
                class="panda-icon panda-icon-xia-zai panda-icon-hover fs20 cursor-pointer"
                @click.native="handleLook"
              >
                <q-tooltip
                  anchor="top middle"
                  content-class="bg-white text-black shadow-6"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  <span>下载电子账单</span>
                </q-tooltip>
              </q-icon>
            </div>
          </div>
          <div class="fee bg-panda-bg-6 border-radius-4px mt10x">
            <div class="fw_600 text-panda-text-7 row text-center line-height-40px">
              <div class="w-80">科目</div>
              <div class="w-130">币种</div>
              <div class="w-200">本期投注额</div>
              <div class="w-200">本期注单笔数</div>
              <div class="w-150">本期盈利</div>
              <div class="w-150">应缴费用</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">投注分成</div>
              <div class="w-130">总计-人民币</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150">202,270,662</div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">人民币</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150"></div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">美元</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">202,270,662</div>
              <div class="w-150">202,270,662</div>
              <div class="w-150"></div>
            </div>
            <div class="text-panda-text-4 row text-center line-height-24px">
              <div class="w-80"></div>
              <div class="w-130">欧元</div>
              <div class="w-200">202,270,662</div>
              <div class="w-200">-70,662</div>
              <div class="w-150">270,662</div>
              <div class="w-150"></div>
            </div>
            <q-separator class="mt10x"></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">会员费</div>
              <div class="w-130">人民币</div>
              <div class="w-200">-</div>
              <div class="w-200">-</div>
              <div class="w-150">-</div>
              <div class="w-150">500,000</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">技术支持费</div>
              <div class="w-130">人民币</div>
              <div class="w-200">-</div>
              <div class="w-200">-</div>
              <div class="w-150">-</div>
              <div class="w-150">200,000</div>
            </div>
            <q-separator></q-separator>
            <div class="text-panda-text-7 row text-center line-height-36px">
              <div class="w-80">调整金额</div>
              <div class="w-130">人民币</div>
              <div class="w-200"></div>
              <div class="w-200"></div>
              <div class="w-150"></div>
              <div class="w-150">200,000</div>
            </div>
            <q-separator></q-separator>
            <div
              class="text-panda-text-7 fw_600 row text-center line-height-40px bg-panda-bg1 border-radius-lr"
            >
              <div class="w-80">总计：</div>
              <div class="w-200">伍佰玖拾肆万贰仟贰佰伍拾陆</div>
              <q-space></q-space>
              <div class="w-150">5,942,256</div>
            </div>
          </div>
          <!-- <a-table
            :columns="userCurrencyColumns"
            :dataSource="userCurrencyData"
            :pagination="pagination"
            :loading="tabledata_loading"
            class="mt10x pb20x"
            :scroll="{ x: 900,y: 300}"
            size="small"
            rowKey="_index"
          >
            <span slot="customTitle">
              活跃投注用户数
              <a-tooltip placement="top">
                <template slot="title">
                  <span>活跃投注用户数</span>
                </template>
                <a-icon type="question-circle" />
              </a-tooltip>
            </span>
            <template slot="footer" slot-scope="record">
              <div class="fw_600 text-panda-text-7 text-center position-relative ">
                <div class="position-absolute" style="left: 2%;">
                  <div class="w-60">总计：</div>
                </div>
                <div class="position-absolute" style="left: 10%;">
                  <div>伍佰玖拾肆万贰仟贰佰伍拾陆</div>
                </div>
                <div class="position-absolute" style="right: 2%;">
                  <div class="w-80">123456</div>
                </div>
              </div>
            </template>
          </a-table>-->
        </div>
      </div>
    </q-card>
    <!-- 查看电子账单详情弹窗 -->
    <q-dialog
      v-model="dialogLookRecordShow"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <dialog-look-record></dialog-look-record>
    </q-dialog>
  </div>
</template>
<script>
import { userCurrency_config } from "src/pages/finance/liquidation/config/userCurrency.js";
import dialogLookRecord from "src/pages/finance/liquidation/component/dialogLookRecord.vue";
import { api_merchant, api_public } from "src/api/index.js";
export default {
  components: {
    dialogLookRecord,
  },
  data() {
    return {
      loading: false,
      tabledata_loading: false,
      userCurrencyColumns: userCurrency_config,
      userCurrencyData: [
        {
          currency: "人民币",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "新加坡元",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "积分",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "欧元EUR",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "美元USD",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "日元JPY",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        },
        {
          currency: "港元HKD",
          betNumber: "478,857",
          money: "161,645",
          profit: "161,645",
          betNum: "161,645"
        }
      ],
      dialogLookRecordShow: false, //查看电子账单调整历史
      pagination: {
        pageSize: 100,
        current: 1,
        showTotal: total => `共 ${total} 条数据`,
        hideOnSinglePage: true,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["10", "30", "30", "40"],
        onShowSizeChange: (current, pageSize) =>
          (this.pagination.pageSize = pageSize),
        onChange: current => (this.pagination.current = current)
      }
    };
  },
  computed: {
    files() {
      return this.currentUser.filePath && this.currentUser.filePath.split(";");
    }
  },
  props: {
    detailObj: ""
  },
  created() {
    this.initMerchantDetail();
  },
  filters: {
    filterPaymentCycle(val) {
      let arr = ["每月", "每季度", "每半年", "每年"];
      return arr[val - 1];
    },
    filterCurrency(val) {
      if (!val) return "暂无数据";
      let arr = ["人民币", "积分制"];
      return arr[val - 1];
    }
  },
  methods: {
    // 文件上传
    handle_download(item) {
      console.log(item);
      let params = {
        fileName: item
      };
      api_public
        .get_manage_merchant_file_download(params)
        .then(res => {
          // console.log(res.data);
          this.$message.success(
            `下载${item.slice(item.indexOf("d/") + 2)}成功!`
          );
          // http://172.18.178.165:10712/manage/merchant/file/download?fileName=/opt/merchant/upload/前端文档.txt
          window.open(
            location.host + "/manage/merchant/file/download?fileName=" + item
          );
          //http://test.goodbestpanda.com/yewu9/manage/merchant/file/download?fileName=%2Fopt%2Fmerchant%2Fupload%2Fpackage-lock2373860271.json
          // window.open(
          //   "http://172.18.178.165:10712/manage/merchant/file/download?fileName=" +
          //     item
          // );
        })
        .catch(err => {
          this.$message.error(err.data);
        });
    },
    async initMerchantDetail() {
      let params = {
        id: this.detailObj.id
      };
      let res = await api_merchant.get_manage_merchant_byid(params);
      let { code, data, msg } = res.data;
      if (code == "0000000") {
        this.currentUser = data;
      } else {
        this.$message.error(msg);
      }
    },
    upload_avatar(event, num) {
      let inputfile = event.target.files[0];
      let formData = new FormData(); //初始化时将form Dom对象传入
      formData.append("file", inputfile);
      console.log(event);
      // 清空触发change时间
      event.target.value = "";
    },
    // 查看电子账单调整记录
    handleLook() {
      this.dialogLookRecordShow = true;
    }
  }
};
</script>
<style lang="stylus" scoped>
.content {
  width: 95%;
  margin: 0 auto;
}

>>>.ant-table-small {
  border: none;
}

>>>.ant-table-footer {
  padding: 0;
  height: 40px;
  line-height: 40px;
  background: #DDE0EF;
}

>>> .ant-table-thead > tr > th {
  color: #3C4551;
  font-weight: bold;
}

>>>.ant-table-scroll {
  overflow-y: hidden;
}

.border-radius-lr {
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
}
</style>
