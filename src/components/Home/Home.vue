<template>
  <div class="home">
    <van-nav-bar :title="title" :left-arrow="isBack" @click-left="onBack" @click-right="onMenu">
      <!-- <i slot="right" class="iconfont icon-qiehuan home-icon" v-if="isMenu && userType <= 3" /> -->
    </van-nav-bar>

    <keep-alive>
      <router-view class="content" v-input v-if="$route.meta.keepAlive" ref="route"></router-view>
    </keep-alive>
    <router-view class="content" v-input v-if="!$route.meta.keepAlive"></router-view>

    <van-tabbar v-model="active" v-show="isTabbar" v-if="userType <= 2">
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="records" @click="jumpTabs('working')">工作台</van-tabbar-item>
      <van-tabbar-item icon="cart" @click="jumpTabs('cart')">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="jumpTabs('users')">我的</van-tabbar-item>
    </van-tabbar>
    <van-tabbar v-model="active" v-show="isTabbar" v-else>
      <van-tabbar-item icon="wap-home" @click="jumpTabs('index')">首页</van-tabbar-item>
      <van-tabbar-item icon="records" @click="jumpTabs('working')">工作台</van-tabbar-item>
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
      isBack: false,
      isTabbar: true,
      isMenu: true,
      active: 0
    };
  },
  watch: {
    $route(to) {
      try {
        this.title = to.meta.title;
        if (
          to.name !== "index" &&
          to.name !== "working" &&
          // to.name !== "classify" &&
          to.name !== "cart" &&
          to.name !== "users"
        ) {
          this.isBack = true;
          this.isTabbar = false;
        } else {
          this.isBack = false;
          this.isTabbar = true;
        }
        if (this.isReload) {
          this.$store.commit("isReload", false);
          location.reload();
        } else if (to.meta.keepAlive) {
          this.$nextTick(() => {
            if (this.$refs.route.pageInit) {
              this.$refs.route.pageInit();
            }
          });
        }
      } catch (e) {
        console.log(e);
      }
    },
    active() {
      this.$store.commit("tabsActive", this.active);
    }
  },
  methods: {
    onBack() {
      this.$router.go(-1);
    },
    onMenu() {
      if (this.userType <= 2) {
        this.$router.push({ name: "projectList" });
      } else {
        this.$router.push({ name: "customerList" });
      }
    },
    jumpTabs(name) {
      this.$router.replace({ name });
    }
  },
  computed,
  created() {
    this.active = this.tabsActive;
    const current = this.$router.history.current;
    this.title = current.meta.title;

    if (
      current.name !== "index" &&
      current.name !== "working" &&
      // current.name !== "classify" &&
      current.name !== "cart" &&
      current.name !== "users"
    ) {
      this.isBack = true;
      this.isTabbar = false;
    } else {
      this.isBack = false;
      this.isTabbar = true;
    }

    if (current.name !== "goodsSearch") {
      users.userInfo().then(result => {
        if (result && this.userInfo.oid !== result.oid) {
          this.$store.commit("cleanStore", true);
          this.$store.commit("userInfo", result);
          users.userId(result.oid).then(res => {
            try {
              if (res && res.status === 1) {
                const uId = JSON.parse(res.text)[0];
                this.$store.commit("userId", uId);
                users.userType(uId.UCML_OrganizeOID).then(r => {
                  if (r && r.status === 1) {
                    this.$store.commit("userType", JSON.parse(r.text).UserType);
                  }
                });
              }
            } catch (e) {
              location.reload();
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
  overflow-x: hidden;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .van-nav-bar {
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
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>
