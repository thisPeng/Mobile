<template>
  <!-- 付款信息列表 -->
  <div class="paymentlabel">
    <van-tabs v-model="active" @change="jumpPage">
      <van-tab title='支付申请信息' />
      <van-tab title='预存列表' />
      <van-tab title='支付信息' />
      <van-tab title='批款信息' />
      <van-tab title='冻结信息' />
      <van-tab title='扣款信息' />
      <van-tab title='资金流水' />
      <van-tab title='OA批款信息' />
    </van-tabs>
    <router-view />
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";

export default {
  data() {
    return {
      active: 0
    };
  },
  computed,
  methods: {
    jumpPage(i) {
      switch (i) {
        case 0:
          this.$router.replace({
            name: "application"
          });
          break;
        case 1:
          this.$router.replace({
            name: "preMemory"
          });
          break;
        case 2:
          this.$router.replace({
            name: "payInfomation"
          });
          break;
        case 3:
          this.$router.replace({
            name: "appropriation"
          });
          break;
        case 4:
          this.$router.replace({
            name: "frozen"
          });
          break;
        case 5:
          this.$router.replace({
            name: "withholding"
          });
          break;
        case 6:
          this.$router.replace({
            name: "capitalFlow"
          });
          break;
        case 7:
          this.$router.replace({
            name: "oainformation"
          });
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.paymentlabel {
  width: 100%;
  .van-tab__pane {
    height: 100%;
  }
}
</style>
<style lang="less">
.paymentlabel {
  .van-tabs__content {
    height: 100%;
  }
  .van-tab {
    min-width: inherit !important;
  }
}
</style>

