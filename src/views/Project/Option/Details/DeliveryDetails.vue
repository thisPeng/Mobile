<template>
  <!-- 到货信息-发货单 -->
  <div class="deliverydetails">
    <div class="title-delivery">发货单</div>
    <van-cell-group>
      <van-field value="" label="发货单号:" disabled />
      <van-field value="" label="工程名称:" disabled />
      <van-field value="" label="发货时间:" disabled />
      <van-field value="" label="工程地址:" disabled />
      <van-field value="" label="发货方式:" disabled />
      <van-field value="" label="单据状态:" disabled />
      <van-field value="" label="审核人:" disabled />
      <van-field value="" label="发货数量:" disabled />
      <van-field value="" label="签收状态:" disabled />
      <van-field value="" label="签收时间:" disabled />
      <van-field value="" label="签收人:" disabled />
      <van-field value="" label="发货金额:" disabled />
      <van-field value="" label="备注:" disabled type="textarea" />
    </van-cell-group>
    <div class="title-delivery">发货单明细</div>
    <div class="delivery-data">
      <div class="delivery-card">
        <div class="delivery-item">
          <div class="item-title">
            <span class="title">合同编号:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>产品名称:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">规格型号:{{item}}</span>
              <span class="row-right">单位:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">订单数量:{{item}}</span>
              <span class="row-right">赠送数量:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">发货数量:{{item}}</span>
              <span class="row-right">实价:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">金额:{{item}}</span>
              <span class="row-right">税率:{{item}}</span>
            </div>
            <div class="content-row">
              <span>备注:{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
export default {
  data() {
    return {
      item:""
    };
  },
  computed,
  methods: {},
  mounted() {}
};
</script>
<style lang="less" scoped>
.deliverydetails {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .delivery-data {
    margin-bottom: 40px;
    .delivery-card {
      width: 100%;
      .delivery-item {
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
  .van-cell {
    font-size: 15px;
    color: rgb(153, 148, 148);
  }
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
}
</style>
