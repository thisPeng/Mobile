<template>
  <div class="home">
    <van-nav-bar :title="title" :left-arrow="isBack" @click-left="onBack" @click-right="onMenu">
      <!-- <van-icon name="pending-evaluate" slot="right" class="home-icon" /> -->
      <i slot="right" class="iconfont icon-qiehuan home-icon" v-if="isMenu" />
    </van-nav-bar>
    <keep-alive>
      <router-view class="content" v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view class="content" v-if="!$route.meta.keepAlive"></router-view>
    <van-tabbar v-model="active" v-show="isTabbar" v-if="userType === 1">
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="tosend" @click="jumpTabs('classify')">物资</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="jumpTabs('cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
    <van-tabbar v-model="active" v-show="isTabbar" v-else>
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <!-- <van-tabbar-item icon="records" @click="jumpTabs('conprice')">询价单</van-tabbar-item> -->
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
      isMenu: true,
      active: 0
    };
  },
  watch: {
    $route(to, from) {
      try {
        if (this.projectInfo.SC_ProjectOID) {
          this.title = this.projectInfo.ProjectName;
        } else if (this.clientInfo[0]) {
          this.title = this.clientInfo[2];
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
              this.active = this.userType === 1 ? 3 : 1;
              break;
          }
        }
        if (from.name === "projectList" && to.meta.keepAlive && this.isReload) {
          this.$store.commit("isReload", false);
          this.$router.go(0);
        }
      } catch (e) {
        console.log(e);
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
      this.$router.replace({ name });
    }
  },
  computed,
  created() {
    const current = this.$router.history.current;
    if (this.projectInfo.SC_ProjectOID) {
      this.title = this.projectInfo.ProjectName;
    } else if (this.clientInfo[0]) {
      this.title = this.clientInfo[2];
    } else {
      this.title = current.meta.title;
    }

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
          this.active = this.userType === 1 ? 3 : 1;
          break;
      }
    }

    if (current.name !== "goodsList") {
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
    } else if (current.name === "goodsList" && !this.userInfo.oid) {
      this.title = "物资查询";
      this.isBack = false;
      this.isTabbar = false;
      this.isMenu = false;
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
