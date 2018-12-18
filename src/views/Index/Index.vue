<template>
  <div class="index">
    <!--轮播图-->
    <!-- <div
      class="index-banner"
      v-if="images.length > 0"
    >
      <van-swipe :autoplay="3000">
        <van-swipe-item
          v-for="(item, index) in images"
          :key="index"
        >
          <img
            :src="item.ImagePath.replace('~',servePath)"
            alt=""
          />
        </van-swipe-item>
      </van-swipe>
    </div> -->

    <!--动态-->
    <div class="index-marquee">
      <div
        class="marquee-title"
        v-if="marqueeList.isShowTitle == 1"
      >
        <span>{{marqueeList.title}}</span>
      </div>
      <div class="marquee-list">
        <ul :class="{animate}">
          <li
            v-for="(item, index) in marqueeList.data"
            :key="index"
          >
            <span class="marquee-text">{{item.Describe || item.text || item.id}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div class="searchItem">
      <div class="logos">
        <h2>物资查询</h2>
      </div>

      <!--搜索框-->
      <van-search
        placeholder="搜物资、找品牌"
        v-model="keyword"
        @search="onSearch"
        @cancel="filterReset"
      />
      <!-- 快速查询 -->
      <div
        class="button-option"
        @click="jumpItem"
      >
        <van-button
          type="main"
          native-type="submit"
        >快速查询</van-button>
      </div>
    </div>
    <!--页面版块-->
    <div class="index-pages">
      <div
        class="pages-row"
        v-for="(item,index) in pages"
        :key="index"
      >
        <div
          class="pages-title"
          v-if="item.isShowTitle == 1"
        >{{item.title}}</div>
        <div class="pages-content">
          <div
            :class="'content-item content-item-'+item.RowNum"
            v-for="(ite,idx) in item.data"
            :key="idx"
            @click="jumpPage(ite,item.ActionType)"
          >
            <div class="content-image">
              <img
                :src="(ite.icon).replace('~',servePath)"
                alt=""
              >
            </div>
            <div
              class="content-text"
              v-if="ite.isShowTitle == 1"
            >{{ite.text}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      images: [],
      pages: [],
      keyword: "",
      animate: false,
      marqueeList: []
    };
  },
  computed,
  methods: {
    jumpPage(item, type) {
      if (this.userInfo.oid) {
        switch (type) {
          case "2":
            this.$store.commit("goodsParams", { id: item.id });
            this.$router.push({
              name: "goodsList"
            });
            break;
          case "4":
            this.$store.commit("suppParams", {
              id: item.id,
              icon: item.icon,
              action: item.action,
              param: item.Param
            });
            this.$router.push({
              name: "supplierInfo"
            });
            break;
          case "5":
            this.$store.commit("goodsParams", { id: item.id });
            this.$router.push({
              name: this.userInfo.oid ? "goodsList" : "goodsSearch"
            });
            break;
          default:
            if (item.action.indexOf(".") >= 0) {
              window.location.href = item.action;
            } else if (item.action === "alert") {
              this.$dialog
                .alert({
                  title: "提示",
                  message: item.Param
                })
                .then(() => {
                  // on close
                });
            } else if (item.action === "projectSelf" && this.userType != 1) {
              this.$dialog
                .alert({
                  title: "提示",
                  message: "暂无权限，请联系工程商。"
                })
                .then(() => {
                  // on close
                });
            } else {
              this.$router.push({
                name: item.action
              });
            }
        }
      } else {
        this.$toast.fail("请先登录账号");
      }
    },
    // 搜索
    onSearch() {
      if (this.userInfo.oid) {
        this.$store.commit("goodsParams", { keyword: this.keyword });
        this.$router.push({
          name: "goodsList"
        });
      } else {
        this.$toast.fail("请先登录账号");
      }
    },
    // 搜索重置
    filterReset() {
      this.keyword = "";
      this.$store.commit("goodsParams", "");
    },
    jumpItem() {
      this.$router.push({
        name: "classify"
      });
    },
    // 动态
    showMarquee() {
      this.animate = true;
      setTimeout(() => {
        this.marqueeList.data.push(this.marqueeList.data[0]);
        this.marqueeList.data.shift();
        this.animate = false;
      }, 500);
    }
  },
  mounted() {
    index.getBanner().then(res => {
      if (res && res.status === 1 && res.text) {
        this.images = JSON.parse(res.text);
      }
    });
    index.getHomePageInfo(this.userInfo.oid).then(res => {
      try {
        const arr = JSON.parse(res.text);
        this.pages = [];
        this.marqueeList = [];
        arr.sort((x, y) => {
          return x.Index - y.Index;
        });
        arr.forEach(val => {
          if (val.ActionType == 1) {
            this.marqueeList = val;
          } else {
            this.pages.push(val);
          }
        });
        setInterval(this.showMarquee, 2000);
      } catch (e) {
        this.pages = [];
        this.marqueeList = [];
      }
    });
    this.$parent.active = 0;
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  background-color: #ffffff;
  padding-bottom: 60px;
  .button-option {
    width: 100%;
    > button {
      width: 100%;
      height: 45px;
      font-size: 18px;
      border: 0;
      border-radius: 130px;
      margin-top: 30px;
    }
  }
  .searchItem {
    margin-top: 90px;
  }
  .van-button--danger {
    color: #fff;
    background-color: #3d95d5;
    border: 1px solid #ebedf0;
  }
  .logos {
    width: 100%;
  }
  .logos h2 {
    display: flex;
    justify-content: center;
    color: #00a0e9;
    // padding-bottom: 20px;
  }
  .index-banner {
    height: 200px;
    .van-swipe-item {
      height: 200px !important;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }

  .index-marquee {
    width: 100%;
    align-items: center;
    color: #fff;
    background-color: #333;
    display: flex;
    .marquee-title {
      padding: 0 20px;
      height: 20px;
      font-size: 14px;
      border-right: 1px solid #fff;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .marquee-list {
      width: 70%;
      height: 30px;
      overflow: hidden;
      .animate {
        transition: all 0.5s;
        margin-top: -30px;
      }
      li {
        height: 30px;
        line-height: 30px;
        font-size: 14px;
        padding-left: 20px;
        word-wrap: normal;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        .marquee-text {
          font-size: 12px;
        }
      }
    }
  }

  // 搜索框
  .van-search {
    // margin: 10px 0;
    padding: 15px 10px !important;
    background: #fff !important;
  }
  // 版块
  .index-pages {
    .pages-row {
      padding: 5px 10px;
      width: 100%;
      margin-top: 10px;
      background-color: #fff;
      .pages-title {
        font-size: 14px;
        color: #49b1e0;
        padding: 7.5px 0;
        border-bottom: 1px solid #eee;
      }
      .pages-content {
        width: 100%;
        padding: 5px 0;
        display: flex;
        flex-wrap: wrap;
        // justify-content: space-between;
        .content-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 2.5px;
          .content-image {
            width: 100%;
            height: 100%;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .content-text {
            height: 45px;
            font-size: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            white-space: normal;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .content-item-1 {
          width: 100%;
        }
        .content-item-2 {
          width: 197px;
        }
        .content-item-3 {
          width: 130.5px;
        }
        .content-item-4 {
          width: 98.5px;
        }
        .content-item-5 {
          width: 78.5px;
        }
        .content-item-6 {
          width: 65.5px;
        }
        .content-item-7 {
          width: 55.5px;
        }
        .content-item-8 {
          width: 47.5px;
        }
        .content-item-9 {
          width: 42.5px;
        }
      }
    }
  }
  .index .van-search[data-v-1744366b] {
    padding-bottom: 50px;
  }
}
</style>
<style lang="less">

.index {
  .van-search {
    padding: 10px 2px 40px 2px;
    .van-cell {
      border: 1px solid #eee;
      padding: 13px 20px;
    }
  }
}

// .index {
//   .van-search {

//   }
// }
</style>

