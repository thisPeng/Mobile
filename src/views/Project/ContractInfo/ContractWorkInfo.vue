<template>
  <!-- 合同编辑 -->
  <div class="contractwork">
    <van-cell-group>
      <div class="title-delivery">基本合同信息</div>
      <van-field v-model="cspList[1]" label="合同编号" disabled />
      <van-field v-model="cspList[2]" label="合同名称" disabled />
      <van-field v-model="cspList[11]" label="合同金额" type="number" disabled />
      <van-field v-model="cspList[19]" label="税率(%)" type="number" disabled />
      <van-field v-model="cspList[18]" label="合同含税金额" type="number" disabled />
      <van-field v-model="cspList[3]" label="甲方" disabled />
      <van-field v-model="cspList[4]" label="乙方" disabled />
      <van-field v-model="cspList[10]" label="验收限期(天)" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">交货时间</span>
        <span class="con-select">{{cspList[9]}}</span>
      </van-cell-group>
      <van-field v-model="cspList[8]" label="交货地点" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">付款方式</span>
        <span class="con-select">{{payment}}</span>
      </van-cell-group>
      <van-cell-group>
        <div class="padding-vertical-sm text-xs">
          <span class="padding-left text-sm text-bold">付款说明：</span>
          <span class="padding-vertical-xs padding-horizontal-sm">
            第一种付款方式：按工程进度百分比方式付款：材料款按对应项目甲方付款进度支付。
            <br /> 第二种付款方式：材料供货进场并验收合格后一次性付完货款。
            <br /> 第三种付款方式：按预付款，到货款，质保金方式付
          </span>
        </div>
      </van-cell-group>
      <div v-if="payment === '第三种付款方式'">
        <van-field v-model="cspList[13]" label="订金付款期限(天)" disabled />
        <van-field v-model="cspList[15]" label="进场付款期限(天)" disabled />
        <van-field v-model="cspList[20]" label="保质付款期限(天)" disabled />
        <van-field v-model="cspList[14]" label="订金比例(%)" disabled />
        <van-field v-model="cspList[16]" label="进场付款比例(%)" disabled />
        <van-field v-model="cspList[21]" label="保质付款比例(%)" disabled />
      </div>
      <div class="title-delivery">保质与违约</div>
      <van-field v-model="cspList[22]" label="保质期（天）" type="number" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">保质开始时间</span>
        <span class="con-select">{{cspList[23]}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showDate" :min-date="new Date()" type="date" class="contract-date" />
      <van-cell-group class="con-price">
        <span class="con-label">保质结束时间</span>
        <span class="con-select">{{cspList[24]}}</span>
      </van-cell-group>
      <van-datetime-picker v-model="currentDate" v-show="showDatatwo" :min-date="new Date()" type="date" class="contract-date" />
      <van-field v-model="cspList[25]" label="保证金比例(%)" disabled />
      <van-field v-model="cspList[26]" label="保质期处理期限(天)" disabled />
      <van-field v-model="cspList[27]" label="保质期处理备注" disabled />
      <van-field v-model="cspList[28]" label="乙方违约(‰)" type="number" />
      <van-field v-model="cspList[29]" label="甲方违约(‰)" type="number" />
      <div class="title-delivery">甲方信息</div>
      <van-field v-model="cspList[31]" label="甲方(盖章签名处)" disabled />
      <van-field v-model="cspList[32]" label="甲方银行账号" disabled />
      <van-field v-model="cspList[33]" label="甲方开户行" disabled />
      <van-field v-model="cspList[34]" label="甲方纳税识别码" disabled />
      <van-field v-model="cspList[36]" label="甲方电话" disabled />
      <van-field v-model="cspList[37]" label="甲方代表人" />
      <van-cell-group class="con-price">
        <span class="con-label">甲方签订日期</span>
        <span class="con-select">{{cspList[38]}}</span>
      </van-cell-group>
      <van-field v-model="cspList[35]" label="甲方地址" disabled />
      <div class="title-delivery">乙方信息</div>
      <van-field v-model="cspList[39]" label="乙方(盖章签名处)" disabled />
      <van-field v-model="cspList[40]" label="乙方银行账号" disabled />
      <van-field v-model="cspList[41]" label="乙方开户行" disabled />
      <van-field v-model="cspList[42]" label="乙方纳税识别码" disabled />
      <van-field v-model="cspList[44]" label="乙方电话" disabled />
      <van-field v-model="cspList[45]" label="乙方代表人" disabled />
      <van-cell-group class="con-price">
        <span class="con-label">乙方签订日期</span>
        <span class="con-select">{{cspList[46]}}</span>
      </van-cell-group>
      <van-field v-model="cspList[43]" label="乙方地址" disabled />
    </van-cell-group>
    <div class="title-delivery">合同附件</div>
    <van-cell title="附件" is-link value="" @click="$router.push({name: 'contractAnnex'})" />
    <div class="title-delivery">清单</div>
    <van-cell-group>
      <van-cell title="清单详情" is-link @click="jumpInfo()" />
    </van-cell-group>
    <div class="invoice-button" v-if="contractParams[20] != '发货情况：全部发货'">
      <a :href="'tel:'+contractParams[21]">联系供应商</a>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { conprice } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      cspList: [],
      payment: "请选择付款方式",
      currentDate: new Date(),
      columns: ["第一种付款方式", "第二种付款方式", "第三种付款方式"],
      paymentShow: false,
      showDate: false, // 确认时间
      showDateone: false, //交货时间
      showDatatwo: false, //保质结束时间
      showDatathree: false, //甲方
      showDatafour: false //乙方
    };
  },
  computed,
  methods: {
    conContract() {
      conprice.conContract(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.cspList = eval("[[" + csp[0])[0];

          if (this.cspList[9] && this.cspList[9] != "1900-01-01 00:00:00") {
            this.cspList[9] = this.$util.formatDate(this.cspList[9]);
          } else {
            this.cspList[9] = ""; // 确认时间
          }
          if (this.cspList[23] && this.cspList[23] != "1900-01-01 00:00:00") {
            this.cspList[23] = this.$util.formatDate(this.cspList[23]);
          } else {
            this.cspList[23] = ""; // 交货时间
          }
          if (this.cspList[24] && this.cspList[24] != "1900-01-01 00:00:00") {
            this.cspList[24] = this.$util.formatDate(this.cspList[24]);
          } else {
            this.cspList[24] = ""; // 保质结束时间
          }
          if (this.cspList[38] && this.cspList[38] != "1900-01-01 00:00:00") {
            this.cspList[38] = this.$util.formatDate(this.cspList[38]);
          } else {
            this.cspList[38] = ""; // 甲方
          }
          if (this.cspList[46] && this.cspList[46] != "1900-01-01 00:00:00") {
            this.cspList[46] = this.$util.formatDate(this.cspList[46]);
          } else {
            this.cspList[46] = ""; // 乙方
          }
          const i = this.cspList[12];
          this.payment = this.columns[i - 1];
        }
      });
    },
    jumpInfo() {
      this.$router.push({
        name: "contractdetails"
      });
    }
  },
  mounted() {
    this.conContract();
  }
};
</script>
<style lang="less" scoped>
.contractwork {
  width: 100%;
  padding-bottom: 50px;
  .invoice-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .con-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
    .con-label {
      min-width: 130px;
      flex: 1;
    }
    .con-select {
      flex: 5;
    }
  }
  .contract-date {
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 0;
    padding-right: 30px;
  }
  .tact-price {
    display: flex;
    padding: 4px 15px;
    box-sizing: border-box;
    line-height: 32px;
    position: relative;
    background-color: #fff;
    font-size: 14px;
    overflow: hidden;
  }
  .tact-label {
    min-width: 129px;
    flex: 1;
  }
  .tact-select {
    flex: 5;
  }
  .button {
    width: 100%;
    display: flex;
    justify-content: center;
    margin: 20px 0;
    button {
      width: 95%;
      text-align: center;
    }
  }
  .invoice-button {
    position: fixed;
    bottom: 0;
    width: 100%;
    padding: 10px;
    text-align: center;
    background-color: #fff;
  }
}
</style>
<style lang="less">
.contractwork {
  .van-field .van-cell__title {
    color: black;
    max-width: 130px !important;
  }
}
</style>

