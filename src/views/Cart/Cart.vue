<template>
  <div class="cart">
    <div class="check-model">
      <van-cell-swipe :right-width="65">
        <van-cell-group>
          <van-checkbox v-model="check">
            <van-icon name="shop" />土建</van-checkbox>
        </van-cell-group>
        <span slot="right" class="right">删除</span>
      </van-cell-swipe>
    </div>
    <van-cell-swipe :right-width="65">
      <div class="check-shop">
        <van-checkbox v-model="check" span="2"></van-checkbox>
        <van-card title="钢筋" desc="很多" num="2" price="2.00" :thumb="imageURL" span=23>
          <div slot="footer">
            <van-stepper v-model="shopmodel" />
          </div>
        </van-card>
      </div>
      <span slot="right" class="right">删除</span>
    </van-cell-swipe>
    <van-submit-bar :price="0" button-text="发起询价" @submit="onSubmit">
      <van-checkbox v-model="checked">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
// import { cart } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      checked: false,
      check: false,
      imageURL: "img/ms_ico2.png",
      shopmodel: 1
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
      }
    });
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  .check-model {
    padding: 5px 15px 0px;
    background-color: white;
    .left {
      background-color: red;
    }
  }
  .check-shop {
    display: flex;
    align-items: center;
    padding: 5px 15px 0px;
    background-color: white;
  }
  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 20px;
      background-color: white;
    }
  }
  .van-card {
    width: 94%;
    background-color: white;
  }
}
</style>
