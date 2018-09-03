<template>
<!-- 发货单编辑 -->
  <div class="shippingDetails">
    <van-cell-group>
      <van-field v-model="item" label="发货单号:" disabled/>
      <van-field v-model="item" label="工程名称:" disabled/>
      <van-field v-model="item" label="发货时间:" disabled/>
      <van-field v-model="item" label="工程地址:" disabled/>
      <van-field v-model="item" label="发货方式:" disabled/>
      <van-field v-model="item" label="单据状态:" disabled/>
      <van-field v-model="item" label="审核人:" disabled/>
      <van-field v-model="item" label="发货数量:" disabled/>
      <van-field v-model="item" label="签收状态:" disabled/>
      <van-field v-model="item" label="签收时间:" disabled/>
      <van-field v-model="item" label="签收人:" disabled/>
      <van-field v-model="item" label="发货金额:" disabled/>
      <van-field v-model="item" label="备注:" disabled type="textarea"/>
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
.shippinginfo {
  width: 100%;
}
</style>
