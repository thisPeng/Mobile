<template>
  <!-- 支付信息 -->
  <div class="payinfomation">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">银行账号:{{item[12]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">收款单位:{{item[38]}}</span>
              <span class="row-right">支付类型:{{item[37]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">支付金额:{{item[9]}}</span>
              <span class="row-right">单据状态:{{item[6]}}</span>
            </div>
            <div class="content-row">
              <span>支付日期:{{item[10]}}</span>
            </div>
            <div class="content-row">
              <span>申请单号:{{item[40]}}</span>
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
      list: [],
    };
  },
  computed,
  methods: {
    getData(){
      arrival.getPaymentInfo(this.projectInfo.SC_ProjectOID).then(res =>{
        // console.log(res);
        if(res && res.status===1){
          const sp= res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[["+csp[0]);
          console.log(this.list);
        }
      })
    },
    pageInit(){
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.payinfomation {
  width: 100%;
  padding: 10px;
  .pre-data {
    margin-bottom: 40px;
    .pre-card {
      width: 100%;
      .pre-item {
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


