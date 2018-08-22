<template>
  <div class="home">
    <van-nav-bar :title="title" :left-arrow="isBack" @click-left="onBack" @click-right="onMenu">
      <!-- <van-icon name="pending-evaluate" slot="right" class="home-icon" /> -->
      <i slot="right" class="iconfont icon-qiehuan home-icon" />
    </van-nav-bar>
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view class="content" ref="routerView"></router-view>
    </keep-alive>
    <router-view class="content" ref="routerView" v-else></router-view>
    <van-tabbar v-model="active" v-show="isTabbar">
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="tosend" @click="jumpTabs('classify')">物资</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="jumpTabs('cart')" v-if="userType === 1">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";

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
    $route(to, from) {
      if (this.projectInfo.SC_ProjectOID) {
        this.title = this.projectInfo.ProjectName;
      } else {
        this.title = to.meta.title;
      }
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
      if (from.name === "projectList" && to.meta.keepAlive) {
        try {
          if (typeof this.$refs.routerView.pageInit === "function") {
            this.$refs.routerView.pageInit();
          }
        } catch (e) {
          console.log(e);
        }
      }
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onMenu() {
      if (this.userType === 1) {
        this.$router.push({ name: "projectList" });
      } else {
        this.$router.push({ name: "customerlist" });
      }
    },
    jumpTabs(name) {
      this.$store.commit("tabActive", this.active);
      this.$router.replace({ name });
    }
  },
  computed,
  created() {
    const current = this.$router.history.current;
    if (this.projectInfo.SC_ProjectOID) {
      this.title = this.projectInfo.ProjectName;
    } else {
      this.title = current.meta.title;
    }

    users.userInfo().then(result => {
      if (result && this.userInfo.oid !== result.oid) {
        this.$store.commit("cleanStore", true);
        this.$store.commit("userInfo", result);
        users.userId(result.oid).then(res => {
          if (res && res.status === 1) {
            this.$store.commit("userId", JSON.parse(res.text)[0]);
          }
        });
      }
    });

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
  -webkit-overflow-scrolling: touch;
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
    -webkit-overflow-scrolling: touch;
  }
}
</style>
