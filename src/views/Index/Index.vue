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
    <div class="index-apply">
      <div class="apply">
        <div class="apply-item" @click="jumpPage('taskWait','我的待办')">
          <div class="item-icon bg-red">
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
        <div class="apply-item" @click="jumpPage('message')">
          <div class="item-icon bg-orange">
            <i class="iconfont icon-xiaoxi" />
          </div>
          <div class="apply-text">内部消息</div>
        </div>
        <div class="apply-item" @click="jumpPage('')">
          <div class="item-icon bg-blue">
            <i class="iconfont icon-chaxun" />
          </div>
          <div class="apply-text">物资查询</div>
        </div>

        <!-- <div class="apply-item" @click="jumpPage('project', '自营项目')">
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
        </div> -->
      </div>
      <van-swipe class="apply-project" v-if="userType === 1">
        <van-swipe-item>
          <div class="project">
            <div class="project-item" @click="jumpPage('material')">
              <div class="item-icon bg-blue">
                <i class="iconfont icon-wuzi" />
              </div>
              <div class="project-text">物资列表</div>
            </div>
            <div class="project-item" @click="jumpPage('conprice')">
              <div class="item-icon bg-mint">
                <i class="iconfont icon-icon-price" />
              </div>
              <div class="project-text">确认价格</div>
            </div>
            <div class="project-item" @click="jumpPage('contractinfo')">
              <div class="item-icon bg-red">
                <i class="iconfont icon-hetong" />
              </div>
              <div class="project-text">合同信息</div>
            </div>
            <div class="project-item" @click="jumpPage('arrivalinformation')">
              <div class="item-icon bg-green">
                <i class="iconfont icon-daohuofangshi" />
              </div>
              <div class="project-text">到货信息</div>
            </div>
            <div class="project-item" @click="jumpPage('paymentinfo')">
              <div class="item-icon bg-orange">
                <i class="iconfont icon-fukuan" />
              </div>
              <div class="project-text">付款信息</div>
            </div>
          </div>
        </van-swipe-item>
        <van-swipe-item>
          <div class="project">
            <div class="project-item" @click="jumpPage('infoitem')">
              <div class="item-icon bg-blue">
                <i class="iconfont icon-gongcheng" />
              </div>
              <div class="project-text">项目信息</div>
            </div>
            <div class="project-item"></div>
            <div class="project-item"></div>
            <div class="project-item"></div>
            <div class="project-item"></div>
          </div>
        </van-swipe-item>
      </van-swipe>
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
  mounted() {
    this.$nextTick().then(() => {
      if (this.projectInfo.ProjectNo) {
        this.$parent.title = this.projectInfo.ProjectName;
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
            font-size: 30px;
          }
        }
      }
      .apply-text {
        padding-top: 10px;
      }
    }
    .apply-project {
      border-top: 1px solid #eee;
      .project {
        display: flex;
        align-items: center;
        .project-item {
          height: 100px;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          .item-icon {
            width: 40px;
            height: 40px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            .iconfont {
              color: #fff;
              font-size: 25px;
            }
          }
        }
        .project-text {
          padding-top: 5px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
