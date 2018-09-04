<template>
  <!-- 发货单编辑 -->
  <div class="shippingDetails">
    <van-cell-group v-for="(item,index) in list" :key="index">
      <van-field v-model="item[2]" label="发货单号:" disabled/>
      <van-field v-model="item[39]" label="工程名称:" disabled/>
      <van-field v-model="item[27]" label="发货时间:" disabled/>
      <van-field v-model="item[7]" label="工程地址:" disabled/>
      <van-field v-model="item[13]" label="发货方式:" disabled/>
      <van-field v-model="item[41]" label="单据状态:" disabled/>
      <van-field v-model="item[22]" label="审核人:" disabled/>
      <van-field v-model="item[10]" label="发货数量:" disabled/>
      <van-field v-model="item[42]" label="签收状态:" disabled/>
      <van-field v-model="item[27]" label="签收时间:" disabled/>
      <van-field v-model="item[28]" label="签收人:" disabled/>
      <van-field v-model="item[11]" label="发货金额:" disabled/>
      <van-field v-model="item[29]" label="备注:" disabled type="textarea" />
      <van-cell title="发货单明细" is-link value="详情" @click="jumpPage(item)" />
    </van-cell-group>
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
    getDetails() {
      offer.getDeliveryDetail(this.contractParams[0]).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
        }
      });
    },
    pageInit() {
      this.getDetails();
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "deliveryDetail"
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.shippinginfo {
  width: 100%;
}
</style>
