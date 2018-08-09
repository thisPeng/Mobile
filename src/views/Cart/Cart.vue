<template>
  <div class="cart">
    <van-submit-bar :price="0" button-text="发起询价" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { cart } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      checked: false
    };
  },
  methods: {
    onSubmit() {}
  },
  computed,
  mounted() {
    this.$nextTick().then(() => {
      if (this.projectInfo.ProjectNo) {
        this.$parent.title = this.projectInfo.ProjectName;
        cart.getList(this.projectInfo.SC_ProjectOID).then(res => {
          console.log(res);
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 20px;
    }
  }
}
</style>
