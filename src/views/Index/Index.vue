<template>
  <div class="index">
    <!--轮播图-->
    <div class="index-banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--工作台-->
    <div class="index-option" v-for="(item, index) in data" :key="index">
      <div class="option-title" v-if="item.isShowTitle == 1">
        <div class="title">{{item.title}}</div>
      </div>
      <div class="option-item">
        <div class="item" v-for="(ite, idx) in item.data" :key="idx" @click="jumpPage(ite)">
          <div class="van-info" v-if="ite.info > 0">{{ite.info}}</div>
          <div class="item-icon bg-blue">
            <i class="iconfont icon-daiban" />
          </div>
          <div class="option-text">{{ite.text}}</div>
        </div>
      </div>
    </div>

    <!--统计数据-->
    <count />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import count from "./../Count/Count";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      images: [
        "banner/baaner1.png",
        "banner/baaner2.png",
        "banner/baaner3.png"
      ],
      data: []
    };
  },
  computed,
  components: {
    count
  },
  methods: {
    jumpPage(item) {
      this.$store.commit("taskModel", item.id);
      this.$store.commit("filterParams", item.Param ? 1 : 2);
      let name = "";
      if (item.Param && parseInt(item.info) > 0) {
        name = item.Param;
      } else {
        this.$store.commit("taskParams", "");
        name = item.action;
      }
      this.$router.push({ name });
    }
  },
  mounted() {
    index.getGetWorkSpace(this.userInfo.oid).then(res => {
      if (res && res.status === 1 && res.text) {
        this.data = JSON.parse(res.text);
        // console.log(this.data);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  background-color: #fff;
  .index-banner {
    height: 210px;
    .van-swipe-item {
      height: 200px !important;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
  .index-option {
    margin-bottom: 10px;
    background-color: #fff;
    .option-title {
      padding: 0 10px;
      .title {
        padding: 10px 0;
        font-size: 16px;
        font-weight: 800;
        border-bottom: 1px solid #eee;
      }
    }
    .option-item {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .item {
        width: 103.5px;
        height: 103.5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
        .van-info {
          left: auto;
          right: 0px;
          top: 3px;
          font-size: 16px;
        }
        .item-icon {
          width: 60px;
          height: 60px;
          border-radius: 15%;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            color: #fff;
            font-size: 35px;
          }
        }
      }
    }
    .option-text {
      font-size: 14px;
      padding-top: 5px;
    }
  }
}
</style>
