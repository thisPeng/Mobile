<template>
  <!-- 付款信息 -->
  <div class="tranpayment">
    <div class="pay-data">
      <div class="pay-card">
        <div class="pay-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">收款单位：{{item[38]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">申请单号：{{item[40]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">支付金额：{{item[9]}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[6] == '0'">单据状态：{{item[6] | codeValue("CodeTable_Pay_Info")}}</van-tag>
                <van-tag type="success" v-else-if="item[6] == '1'">单据状态：{{item[6] | codeValue("CodeTable_Pay_Info")}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">支付日期：{{item[18] | formatDate}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">银行账号：{{item[12]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  computed,
  methods: {
    getData() {
      offer.getPayment(this.userInfo.oid).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.list = eval("[[" + csp[0]);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.tranpayment {
  width: 100%;
  padding: 10px;
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

