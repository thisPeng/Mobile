<template>
  <!--报价单编辑 -->
  <div class="tranrial">
    <div class="title-delivery">发货单</div>
    <van-cell-group>
      <van-field value="" label="单据编号:" disabled />
      <van-field value="" label="工程名称:" disabled />
      <van-field value="" label="联系人:" disabled />
      <van-field value="" label="联系电话:" disabled />
      <van-field value="" label="工程地址:" disabled />
      <van-field value="" label="订单数量:" disabled />
      <van-field value="" label="订单金额:" disabled />
      <van-field value="" label="订单状态:" disabled />
      <van-field value="" label="订货有效期:" disabled />
      <van-field value="" label="业务员:" disabled />
      <van-field value="" label="创建日期:" disabled />
      <van-field value="" label="备注:" disabled type="textarea" />
    </van-cell-group>
    <div class="title-delivery">报价单明细</div>
    <div class="delivery-data">
      <div class="delivery-card">
        <div class="delivery-item">
          <div class="item-title">
            <span class="title">合同编号:{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span>名称:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">规格型号:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">数量:{{item}}</span>
              <span class="row-right">赠送数量:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">售价:{{item}}</span>
              <span class="row-right">金额:{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">产品编码:{{item}}</span>
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
.tranrial {
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
