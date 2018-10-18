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
    <!--我的待办-->
    <div class="index-option" v-if="data.wait && data.wait.data.length > 0">
      <div class="option-title">
        <div class="title">{{data.wait.title}}</div>
      </div>
      <div class="option-item">
        <div class="item" v-for="(item, index) in data.wait.data" :key="index" @click="jumpWait(item)">
          <div class="van-info" v-if="item.info > 0">{{item.info}}</div>
          <div class="item-icon bg-blue">
            <i class="iconfont icon-daiban" />
          </div>
          <div class="option-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <!--发起工作-->
    <div class="index-option" v-if="data.start && data.start.data.length > 0">
      <div class="option-title">
        <div class="title">{{data.start.title}}</div>
      </div>
      <div class="option-item">
        <div class="item" v-for="(item, index) in data.start.data" :key="index" @click="jumpStart(item)">
          <div class="van-info" v-if="item.info > 0">{{item.info}}</div>
          <div class="item-icon bg-blue">
            <i class="iconfont icon-daiban" />
          </div>
          <div class="option-text">{{item.text}}</div>
        </div>
      </div>
    </div>
    <!--工作知会-->
    <div class="index-option" v-if="data.notice && data.notice.data.length > 0">
      <div class="option-title">
        <div class="title">{{data.notice.title}}</div>
      </div>
      <div class="option-item">
        <div class="item" v-for="(item, index) in data.notice.data" :key="index" @click="jumpNotice(item)">
          <div class="van-info" v-if="item.info > 0">{{item.info}}</div>
          <div class="item-icon bg-blue">
            <i class="iconfont icon-daiban" />
          </div>
          <div class="option-text">{{item.text}}</div>
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
    // 跳转待办
    jumpWait(item) {
      this.$store.commit("taskModel", item.id);
      this.$router.push({ name: item.action });
    },
    // 跳转发起
    jumpStart(item) {
      this.$store.commit("taskModel", item.id);
      this.$store.commit("filterParams", 1);
      let name = "";
      if (!this.projectInfo.SC_ProjectOID) {
        this.$store.commit("backRouter", item.action);
        name = "projectList";
      } else if (item.Param && parseInt(item.info) > 0) {
        name = item.Param;
      } else {
        name = item.action;
      }
      this.$router.push({ name });
    },
    // 跳转知会
    jumpNotice(item) {
      this.$store.commit("taskModel", item.id);
      this.$store.commit("filterParams", 2);
      if (this.projectInfo.SC_ProjectOID) {
        this.$router.push({ name: item.action });
      } else {
        this.$store.commit("backRouter", item.action);
        this.$router.push({ name: "projectList" });
      }
    }
  },
  mounted() {
    index.getGetWorkSpace(this.userInfo.oid).then(res => {
      if (res && res.status === 1 && res.text) {
        this.data = JSON.parse(res.text)[0];
        console.log(this.data);
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
