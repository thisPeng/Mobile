<template>
  <div class="cart">
    <van-list v-model="loading" :finished="finished" @load="onLoad">
      <van-cell-swipe>
        <div class="check-shop" v-for="(item,index) in list" :key="index">
          <van-checkbox v-model="check"></van-checkbox>
          <van-card :title="item[14]" :desc="item[16] + ' | 单位：' + item[15]" price="2.00" :thumb="item[32]">
            <div slot="footer">
              <van-stepper v-model="shopmodel" :integer="true" />
            </div>
          </van-card>
        </div>
        <span slot="right" class="right">删除</span>
      </van-cell-swipe>
    </van-list>
    <van-submit-bar button-text="发起询价" @submit="onSubmit">
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
      checked: false,
      check: false,
      shopmodel: 1,
      list: [],
      loading: false,
      finished: false
    };
  },
  methods: {
    onLoad() {},
    onSubmit() {}
  },
  computed,
  mounted() {
    this.$nextTick().then(() => {
      if (this.projectInfo.ProjectNo) {
        this.$parent.title = this.projectInfo.ProjectName;
        cart.getList(this.projectInfo.SC_ProjectOID).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            const list = eval(sp[0].split("=")[1]);
            list.forEach(val => {
              if (val[32]) {
                val[32] = val[32].replace("~", this.servePath);
              } else {
                val[32] =
                  this.servePath +
                  "/SupplyChain/Images/MaterialType/default.jpg";
              }
            });
            this.list = list;
            console.log(list);
          }
        });
      } else {
        this.$toast.fail("请先点击屏幕右上角按钮，选择项目");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.cart {
  width: 100%;
  .van-list {
    padding: 10px;
    margin-bottom: 40px;
    .check-shop {
      display: flex;
      align-items: center;
      padding: 0 15px;
      background-color: white;
      border-radius: 5px;
      margin-bottom: 10px;
      .van-card {
        width: 100%;
        background-color: white;
      }
    }
  }

  .van-submit-bar {
    bottom: 50px;
    .van-checkbox {
      margin-left: 20px;
      background-color: white;
    }
  }
}
</style>
