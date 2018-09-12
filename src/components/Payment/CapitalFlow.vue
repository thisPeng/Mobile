<template>
  <!-- 资金流水 -->
  <div class="capitalflow">
    <div class="count-number" v-if="data.length > 0">
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-baoyi- text-blue" /> 结存金额(￥)
          </div>
          <div class="row-content">{{data[4] | formatMoney}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-blue" /> 占用金额(￥)
          </div>
          <div class="row-content">{{data[5] | formatMoney}}</div>
        </van-col>
      </van-row>
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-icon3 text-green" /> 可用金额(￥)
          </div>
          <div class="row-content">{{data[4]-data[5]-data[6] | formatMoney}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-green" />冻结资金(￥)
          </div>
          <div class="row-content">{{data[6] | formatMoney}}</div>
        </van-col>
      </van-row>
    </div>

    <div class="with-data">
      <div class="with-card">
        <div class="with-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">交易单号：{{item[7]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">交易时间：{{item[8] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="success" v-if="item[5] === '+'">资金标识：{{item[5] | transStatus}}</van-tag>
                <van-tag type="danger" v-else-if="item[5] === '-'">资金标识：{{item[5] | transStatus}}</van-tag>
                <van-tag type="primary" v-else>资金标识：{{item[5] | transStatus}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>交易金额：{{item[4] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>剩余金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>交易类型：{{item[6] | tradeStatus}}</span>
            </div>
            <div class="content-row">
              <span>备注：{{item[23]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getList" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { financial } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      data: [],
      list: [],
      curPage: 1,
      pages: {}
    };
  },
  computed,
  methods: {
    getData() {
      financial.getClahFlow(this.projectInfo.SC_ProjectOID).then(res => {
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
    getList() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      financial
        .getClahFlowDetails(this.projectInfo.SC_ProjectOID, page)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split(";");
              const csp = sp[0].split("=");
              this.pages = eval("(" + sp[1].split("=")[1] + ")");
              this.list = eval(csp[1]);
              // console.log(this.list);
            }
          } catch (e) {
            console.log(e);
          }
        });
    },
    pageInit() {
      this.getData();
      this.getList();
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
  padding-bottom: 10px;
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
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
          word-break: break-all;
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



