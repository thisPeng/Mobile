<template>
  <div class="home">
    <van-nav-bar :title="title" :left-arrow="isBack" @click-left="onBack" @click-right="onMenu">
      <!-- <van-icon name="pending-evaluate" slot="right" class="home-icon" /> -->
      <i slot="right" class="iconfont icon-qiehuan home-icon" v-if="isMenu" />
    </van-nav-bar>

    <keep-alive>
      <transition :name="transitionName">
        <router-view class="content" v-if="$route.meta.keepAlive"></router-view>
      </transition>
    </keep-alive>
    <transition :name="transitionName">
      <router-view class="content" v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <van-tabbar v-model="active" v-show="isTabbar" v-if="userType === 1">
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="tosend" @click="jumpTabs('classify')">物资</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="jumpTabs('cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
    <van-tabbar v-model="active" v-show="isTabbar" v-else>
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="records" @click="jumpTabs('inquiry')">询价单</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index, users } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      title: "材博汇",
      transitionName: "slide-left",
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

        // 监听路由的路径，可以通过不同的路径去选择不同的切换效果
        const toDepth = to.path.split("/").length;
        const fromDepth = from.path.split("/").length;

        this.transitionName =
          toDepth < fromDepth ? "slide-right" : "slide-left";

        if (
          to.name !== "index" &&
          to.name !== "classify" &&
          to.name !== "cart" &&
          to.name !== "users" &&
          to.name !== "inquiry"
        ) {
          this.isBack = true;
          this.isTabbar = false;
        } else {
          this.isBack = false;
          this.isTabbar = true;
          this.transitionName = "";
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
              this.active = this.userType === 1 ? 3 : 2;
              break;
            case "inquiry":
              this.active = this.userType === 1 ? 0 : 1;
              break;
          }
        }
        if (from.name === "projectList" || from.name === "customerlist") {
          if (to.meta.keepAlive && this.isReload) {
            this.$store.commit("isReload", false);
            this.$router.go(0);
          }
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
      current.name !== "users" &&
      current.name !== "inquiry"
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
          this.active = this.userType === 1 ? 3 : 2;
          break;
        case "inquiry":
          this.active = this.userType === 1 ? 0 : 1;
          break;
      }
    }

    if (current.name !== "goodsSearch") {
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
        const params = {
          id: this.userInfo.oid,
          code:
            "OrderType|CodeTable_Unit|CodeTable_TaxClass|CodeTable_Status|CodeTable_CalArea|CodeTable_CalType|" +
            "CodeTable_ProjectType|CodeTable_BusinessType|CodeTable_opening|CodeTable_YesNo|CodeTable_SkuStatus|" +
            "CodeTable_Taxrate_Can|CodeTable_Labor_Pay|CodeTable_CoType|CodeTable_Pay_Info|CodeTable_Approve|" +
            "CodeTable_Deliver_Type"
        };
        // 获取配置表数据
        index.getConfig(params).then(res => {
          if (res && res.status === 1) {
            this.$store.commit("codeValue", JSON.parse(res.text));
            // console.log(this.codeValue);
          }
        });
      });
    } else if (current.name === "goodsSearch" && !this.userInfo.oid) {
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
    transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  }
}
</style>
