<template>
  <!-- 付款信息列表 -->
  <div class="paymentlabel">
    <van-tabs>
      <van-tab title='支付申请信息'>
        <application v-if="isLoad" />
      </van-tab>
      <van-tab title='预存列表'>
        <preMemory v-if="isLoad" />
      </van-tab>
      <van-tab title='支付信息'>
        <payInfomation v-if="isLoad" />
      </van-tab>
      <van-tab title='批款信息'>
        <appropriation v-if="isLoad" />
      </van-tab>
      <van-tab title='冻结信息'>
        <frozen v-if="isLoad" />
      </van-tab>
      <van-tab title='扣款信息'>
        <withholding v-if="isLoad" />
      </van-tab>
      <van-tab title='资金流水'>
        <capitalFlow v-if="isLoad" />
      </van-tab>
      <!-- <van-tab title='OA批款信息'>
        <oainformation v-if="isLoad" />
      </van-tab> -->
    </van-tabs>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
import application from "./../../../../components/Payment/Application"; //支付申请信息
import preMemory from "./../../../../components/Payment/PreMemory"; //预存列表
import payInfomation from "./../../../../components/Payment/PayInfomation"; //支付信息
import appropriation from "./../../../../components/Payment/Appropriation"; //批款信息
import frozen from "./../../../../components/Payment/Frozen"; //冻结信息
import withholding from "./../../../../components/Payment/Withholding"; //扣款信息
import capitalFlow from "./../../../../components/Payment/CapitalFlow"; //资金流水
import oainformation from "./../../../../components/Payment/OAinformation"; //OA批款信息

export default {
  data() {
    return {
      isLoad: false
    };
  },
  components: {
    application,
    preMemory,
    payInfomation,
    appropriation,
    frozen,
    withholding,
    capitalFlow,
    oainformation
  },
  computed,
  methods: {},
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.isLoad = true;
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
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

