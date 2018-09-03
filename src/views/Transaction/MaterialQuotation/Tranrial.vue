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
      <van-cell title="报价单明细" is-link value="详情" />
      <van-cell title="报价单附件" is-link value="详情" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
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
  .van-cell {
    font-size: 15px;
  }
  .title-delivery {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
}
</style>
