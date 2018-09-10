<template>
  <!-- 资金流水 -->
  <div class="capitalflow">
    <div class="count-number">
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-baoyi- text-blue" /> 结存金额(￥)
          </div>
          <div class="row-content">{{$util.formatMoney(data[4])}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-blue" /> 占用金额
          </div>
          <div class="row-content">{{$util.formatMoney(data[5])}}</div>
        </van-col>
      </van-row>
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-icon3 text-green" /> 可用金额(￥)
          </div>
          <div class="row-content">{{$util.formatMoney(data[4]-data[5]-data[6])}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-green" />冻结资金
          </div>
          <div class="row-content">{{$util.formatMoney(data[6])}}</div>
        </van-col>
      </van-row>
    </div>

    <div class="with-data">
      <div class="with-card">
        <div class="with-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">交易单号:{{item[7]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">资金标识:{{item[5] | transState}}</span>
              <span class="row-right">交易金额:{{item[4]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">日期时间:{{new Date(item[8]).Format("yyyy-MM-dd")}}</span>
              <span class="row-right">交易类型:{{item[6] | tradeState}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">余额:{{item[9]}}</span>
              <span class="row-right">备注:{{item[23]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { arrival } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      data: [],
      list: []
    };
  },
  computed,
  methods: {
    getData() {
      arrival.getClahFlow(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("=");
            const csp = sp[1].split(";");
            this.data = eval(csp[0])[0];
            // console.log(this.data);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    getInfo() {
      arrival.getClahFlowDetails(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            const csp = sp[0].split("=");
            this.list = eval(csp[1]);
            console.log(this.list);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    pageInit() {
      this.getData();
      this.getInfo();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.capitalflow {
  width: 100%;
  padding-bottom: 50px;
  .count-number {
    background-color: #fff;
    margin-bottom: 10px;
    .count-row {
      .van-col {
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        .row-title {
          color: #999;
          font-size: 12px;
        }
        .row-content {
          padding-top: 10px;
          font-weight: 800;
          font-size: 16px;
        }
      }
    }
  }
  .with-data {
    margin-bottom: 40px;
    .with-card {
      width: 100%;
      .with-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
}
</style>



