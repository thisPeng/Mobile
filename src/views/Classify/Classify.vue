<template>
  <div class="classify">
    <div class="van-cell van-cell--borderless van-field" v-if="userInfo.oid">
      <div class="van-cell__title">工程名称：</div>
      <div class="van-cell__value flex-between">
        <span class="text-truncate text-left text-gray">{{projectInfo.ProjectName || '请选择工程项目'}}</span>
        <van-button type="primary" size="mini" @click="$router.push({ name: 'projectList' })">选择</van-button>
      </div>
    </div>
    <van-cell v-else title="未登录账号" value="" @click="$router.push({ name: 'login' })" icon="setting" is-link />

    <van-tabs v-model="activeTabs" type="card">
      <van-tab title="系统分类">
        <cly :topList="topList" :detailedList="detailedList"></cly>
      </van-tab>
      <van-tab title="供应商">
        <stp ref="suppTabs" />
      </van-tab>
      <div class="classify-icon" v-show="activeTabs === 1 && suppParams.id">
        <van-icon name="like" color="#fa7815" @click="onUnCollect" v-if="isColect" />
        <van-icon name="like-o" color="#fa7815" @click="onCollect" v-else />
        <van-icon name="warn" color="#fa7815" @click="jumpInfo" />
      </div>
    </van-tabs>
  </div>
</template>
<script>
import cly from "./../../components/Classify/Classify";
import stp from "./../../components/Classify/Supplier";
import computed from "./../../assets/js/computed.js";
import { classify, supplier } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      activeTabs: 0,
      isColect: false,
      pages: [],
      topList: [],
      detailedList: []
    };
  },
  components: {
    cly,
    stp
  },
  methods: {
    jumpInfo() {
      supplier
        .getSuppTaskId(
          this.projectInfo.DemandID || this.confirmParams[24],
          this.suppParams.id
        )
        .then(res => {
          try {
            if (res.status === 1) {
              const params = {
                name: "供应商详情",
                TaskGYSID: "SC_Company_SupplierOID='" + res.text + "'"
              };
              this.$store.commit("taskParams", params);
              this.$router.push({
                name: "taskGYSFrom"
              });
            }
          } catch (e) {
            this.$toast.fail(e);
          }
        });
    },
    // 获取收藏状态
    getColectStatus() {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: this.suppParams.id
      };
      supplier.getColectStatus(params).then(res => {
        if (res.status && res.text === "True") {
          this.isColect = true;
        } else {
          this.isColect = false;
        }
      });
    },
    // 添加收藏
    onCollect() {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: this.suppParams.id
      };
      supplier.addCollect(params).then(res => {
        if (res && res.status === 1) {
          if (res.text == "1") {
            this.$toast.fail("已收藏供应商");
            this.isColect = true;
          } else if (res.text == "2") {
            this.$toast.success("添加收藏成功");
            this.isColect = true;
          } else {
            this.$toast.fail("添加收藏失败，请重试");
            this.isColect = false;
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 取消收藏
    onUnCollect() {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: this.suppParams.id
      };
      supplier.cancelCollect(params).then(res => {
        if (res && res.status === 1) {
          if (res.text === "1") {
            this.$toast.fail("该供应商未收藏");
            this.isColect = false;
          } else if (res.text === "2") {
            this.$toast.success("取消收藏成功");
            this.isColect = false;
          } else {
            this.$toast.fail("取消收藏失败，请重试");
            this.isColect = true;
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 选择分类
    onNavClick(index) {
      this.active = index;
    },
    // 跳转分类商品列表
    onItemClick(id) {
      this.$store.commit("goodsParams", { id });
      this.$router.push({
        name: "goodsList"
      });
    },
    // 页面初始化
    pageInit() {
      this.$nextTick(() => {
        if (this.activeTabs) {
          this.$refs["suppTabs"].pageInit();
          if (this.suppParams.id) {
            this.getColectStatus();
          }
        }
      });
    }
  },
  computed,
  created() {
    classify.getProductType().then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        const list = eval(sp[1].split("=")[1]);

        let topIndex = -1,
          deIndex = -1;
        list.forEach(val => {
          if (val[8] === "00000000-0000-0000-0000-000000000000") {
            this.topList.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            topIndex++;
          } else if (this.topList[topIndex].id === val[8]) {
            this.detailedList.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            deIndex++;
          } else if (this.detailedList[deIndex].id === val[8]) {
            this.detailedList[deIndex].list.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16]
                ? val[16].replace("~", this.servePath)
                : this.servePath +
                  "/SupplyChain/Images/MaterialType/default.jpg",
              list: []
            });
          } else {
            this.detailedList[deIndex].list.forEach(v => {
              if (v.id === val[8]) {
                v.list.push({
                  id: val[0],
                  mid: val[4],
                  code: val[1],
                  name: val[2],
                  img: val[16]
                    ? val[16].replace("~", this.servePath)
                    : this.servePath +
                      "/SupplyChain/Images/MaterialType/default.jpg",
                  pid: val[8]
                });
              }
            });
          }
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  overflow: hidden !important;
  .van-tabs {
    height: 100%;
    background-color: #fff;
    position: relative;
    .classify-icon {
      position: absolute;
      top: 8px;
      right: 10px;
      .van-icon {
        margin: 0 15px;
        font-size: 22px;
      }
    }
  }
}
</style>
<style lang="less">
.classify {
  .van-tabs__wrap {
    width: 180px;
    z-index: 1;
    .van-tabs__nav {
      // margin: 0;
      border-color: #fa7815;
      .van-tab--active {
        color: #fff !important;
        background-color: #fa7815 !important;
      }
      .van-tab {
        color: #fa7815;
      }
    }
  }
}
</style>


