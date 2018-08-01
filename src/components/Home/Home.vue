<template>
  <div class="home">
    <van-nav-bar :title="title" :left-arrow="isBack" @click-left="onBack" @click-right="onMenu">
      <van-icon name="pending-evaluate" slot="right" class="home-icon" />
    </van-nav-bar>
    <router-view class="content"></router-view>
    <van-tabbar v-model="active" v-show="isTabbar">
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="shop" @click="jumpTabs('classify')">挑货</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="jumpTabs('cart')">购物车</van-tabbar-item>
      <!-- <van-tabbar-item @click="jumpTabs('apply')">
        <i slot="icon" slot-scope="props" class="iconfont icon-yingyong-" />应用</van-tabbar-item> -->
      <!-- <van-tabbar-item icon="records" @click="jumpTabs('contact')">通讯录</van-tabbar-item> -->
      <!-- <van-tabbar-item @click="jumpTabs('count')">
        <i slot="icon" slot-scope="props" class="iconfont icon-icon1" />统计</van-tabbar-item> -->
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {
      title: "材博汇",
      isBack: false,
      isTabbar: true,
      active: 0
    };
  },
  watch: {
    $route(to) {
      this.title = to.meta.title;
      if (
        to.name !== "index" &&
        to.name !== "classify" &&
        to.name !== "cart" &&
        to.name !== "users"
      ) {
        this.isBack = true;
        this.isTabbar = false;
      } else {
        this.isBack = false;
        this.isTabbar = true;
        switch (to.name) {
          case "index":
            this.active = 0;
            break;
          case "classify":
            this.active = 1;
            break;
          case "cart":
            this.active = 2;
            break;
          case "users":
            this.active = 3;
            break;
          default:
            this.active = this.tabActive;
        }
      }
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onMenu() {
      this.$router.push({ name: "msgList" });
    },
    jumpTabs(name) {
      this.$store.commit("tabActive", this.active);
      this.$router.replace({ name });
    }
  },
  computed,
  created() {
    const current = this.$router.history.current;
    this.title = current.meta.title;
    if (
      current.name !== "index" &&
      current.name !== "classify" &&
      current.name !== "cart" &&
      current.name !== "users"
    ) {
      this.isBack = true;
      this.isTabbar = false;
    } else {
      this.isBack = false;
      this.isTabbar = true;
      switch (current.name) {
        case "index":
          this.active = 0;
          break;
        case "classify":
          this.active = 1;
          break;
        case "cart":
          this.active = 2;
          break;
        case "users":
          this.active = 3;
          break;
        default:
          this.active = this.tabActive;
      }
    }
  },
  mounted() {
    // this.active = this.tabActive;
  }
};
</script>
<style lang="less" scoped>
.home {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: auto;
  .van-nav-bar {
    color: #fff;
    background-color: #00a0e9;
    .home-icon {
      font-size: 18px;
      color: #fff;
    }
  }
  .content {
    background-color: #f6f6f6;
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 0;
    overflow-y: auto;
  }
}
</style>
