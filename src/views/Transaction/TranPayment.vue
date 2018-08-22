<template>
  <!-- 付款信息 -->
  <div class="tranpayment">
    <div class="pay-data">
      <div class="pay-card">
        <div class="pay-item">
          <!-- v-for="(item,index) in list" :key="index" @click="jumpage('pricedetails')" -->
          <div class="item-title">
            <span class="title">工程编号：{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">工程名称{{item}}</span>
            </div>
            <div class="content-row">
              <span>收款账号{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">收款单位：{{item}}</span>
              <span class="row-left">支付类型：{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">支付金额：{{item}}</span>
              <span class="row-left">单据状态：{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">支付日期：{{item}}</span>
              <span class="row-left">申请单号：{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      item: ""
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.tranpayment {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .pay-data {
    margin-bottom: 40px;
    .pay-card {
      width: 100%;
      .pay-item {
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

