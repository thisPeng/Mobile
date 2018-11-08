<template>
  <div class="index">
    <!--轮播图-->
    <div class="index-banner" v-if="images.length > 0">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item, index) in images" :key="index">
          <img :src="item.ImagePath.replace('~',servePath)" :alt="item.ImageTitle" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--动态-->
    <div class="index-marquee">
      <div class="marquee-title" v-if="marqueeList.isShowTitle == 1">
        <span>{{marqueeList.title}}</span>
      </div>
      <div class="marquee-list">
        <ul :class="{animate}">
          <li v-for="(item, index) in marqueeList.data" :key="index">
            <span class="marquee-text">{{item.Describe}}</span>
          </li>
        </ul>
      </div>
    </div>

    <!--搜索框-->
    <van-search placeholder="搜物资、找品牌" v-model="keyword" @search="onSearch" @cancel="filterReset" />

    <!--页面版块-->
    <div class="index-pages">
      <div class="pages-row" v-for="(item,index) in pages" :key="index">
        <div class="pages-title" v-if="item.isShowTitle == 1">{{item.title}}</div>
        <div class="pages-content">
          <div :class="item.RowNum == 2 ? 'content-item-2' : 'content-item-4'" v-for="(ite,idx) in item.data" :key="idx" @click="jumpPage(ite)">
            <div class="content-image">
              <img :src="(ite.icon).replace('~',servePath)" :alt="ite.text">
            </div>
            <div class="content-text" v-if="ite.isShowTitle == 1">{{ite.text}}</div>
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
    jumpPage(item) {
      this.$store.commit("goodsParams", { keyword: item.Param });
      this.$store.commit("suppParams", { id: item.Param });
      this.$router.push({
        name: item.action
      });
    },
    onSearch() {
      this.$store.commit("goodsParams", { keyword: this.keyword });
      this.$router.push({
        name: "goodsList"
      });
    },
    filterReset() {
      this.keyword = "";
      this.$store.commit("goodsParams", "");
    },
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
        // console.log(this.images);
      }
    });
    index.getHomePageInfo().then(res => {
      try {
        const arr = JSON.parse(res.text);
        this.pages = [];
        arr.forEach(val => {
          if (val.ActionType == 1) {
            this.marqueeList = val;
          } else {
            this.pages.push(val);
          }
        });
        // console.log(this.pages);
        setInterval(this.showMarquee, 2000);
      } catch (e) {
        this.pages = [];
        this.marqueeList = [];
      }
    });
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  background-color: #fff;
  padding-bottom: 60px;
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
    background-color: #49b1e0;
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
      padding: 0 10px;
      width: 100%;
      margin-top: 10px;
      background-color: #fff;
      .pages-title {
        color: #49b1e0;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }
      .pages-content {
        width: 100%;
        padding: 5px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        .content-item-2 {
          width: 180px;
          height: 130px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .content-image {
            width: 175px;
            height: 85px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .content-text {
            font-size: 13px;
            padding-top: 10px;
            text-align: center;
          }
        }
        .content-item-4 {
          width: 90px;
          height: 130px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .content-image {
            width: 85px;
            height: 85px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          .content-text {
            font-size: 13px;
            padding-top: 10px;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
<style lang="less">
.index {
  .van-search {
    .van-cell {
      border: 1px solid #eee;
    }
  }
}
</style>
