<template>
  <div class="index">
    <!--轮播图-->
    <div class="index-banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <!--应用-->
    <div class="index-apply" v-if="userType === 1">
      <div class="apply">
        <div class="apply-item" @click="jumpPage('taskWait','我的待办')">
          <div class="item-icon bg-blue">
            <i class="iconfont icon-daiban" />
          </div>
          <div class="apply-text">我的待办</div>
        </div>
        <div class="apply-item" @click="jumpPage('taskWait','我的已办')">
          <div class="item-icon bg-green">
            <i class="iconfont icon-yiban" />
          </div>
          <div class="apply-text">我的已办</div>
        </div>

        <div class="apply-item" @click="jumpPage('project', '自营项目')">
          <div class="item-icon bg-orange">
            <i class="iconfont icon-ziying" />
          </div>
          <div class="apply-text">自营项目</div>
        </div>
        <div class="apply-item" @click="jumpPage('project', '合作项目')">
          <div class="item-icon bg-yellow">
            <i class="iconfont icon-hezuo" />
          </div>
          <div class="apply-text">合作项目</div>
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

export default {
  data() {
    return {
      images: [
        "banner/baaner1.png",
        "banner/baaner2.png",
        "banner/baaner3.png"
      ],
      data: [],
      model: true,
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  components: {
    count
  },
  methods: {
    jumpPage(name, model = "") {
      this.$router.push({
        name,
        params: {
          model: model
        }
      });
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.index {
  width: 100%;
  background-color: #fff;
  .index-banner {
    img {
      width: 100%;
      height: 200px;
    }
  }
  .index-apply {
    margin-bottom: 10px;
    background-color: #fff;
    .apply {
      display: flex;
      align-items: center;
      .apply-item {
        height: 100px;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        .item-icon {
          width: 50px;
          height: 50px;
          border-radius: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          .iconfont {
            color: #fff;
            font-size: 25px;
          }
        }
      }
      .apply-text {
        padding-top: 10px;
      }
    }
  }
}
</style>
