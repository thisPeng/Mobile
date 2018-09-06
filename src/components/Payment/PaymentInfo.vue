<template>
  <!-- 付款信息列表 -->
  <div class="paymentinfo">
    <van-cell-group>
      <van-cell title="支付申请信息" is-link @click="jumpPage('application')" />
      <van-cell title="预存列表" is-link @click="jumpPage('prememory')" />
      <van-cell title="支付信息" is-link @click="jumpPage('payinfomation')" />
      <van-cell title="批款信息" is-link @click="jumpPage('appropriation')" />
      <van-cell title="冻结信息" is-link @click="jumpPage('frozen')" />
      <van-cell title="扣款信息" is-link @click="jumpPage('withholding')" />
      <van-cell title="资金流水" is-link @click="jumpPage('capitalflow')" />
      <van-cell title="OA批款信息" is-link @click="jumpPage('oainformation')" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {};
  },
  computed,
  methods: {
    jumpPage(name) {
      this.$router.push({
        name
      });
    }
  },
  mounted() {
    if (!this.projectInfo.SC_ProjectOID) {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.paymentinfo {
  width: 100%;
}
</style>


