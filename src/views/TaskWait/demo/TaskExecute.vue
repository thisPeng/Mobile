<template>
  <div class="taskExecute">
    <div class="task-button">
      <van-button type="default" class="button" @click="exit">汇报工作</van-button>
      <van-button type="default" class="button" @click="apply">申请变更</van-button>
      <van-button type="default" class="button" @click="cloing">完工申请</van-button>
    </div>
    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" title="任务变更申请确认">
      <van-field v-model="username" label="变更理由" placeholder="请输入变更理由" />
    </van-dialog>
    <van-cell-group>
      <div class="ap-access">
        <van-col span="6">任务进度</van-col>
        <van-col span="4">
          <van-field v-model="slider" />
        </van-col>
        <van-col span="14">
          <van-slider v-model="slider" @change="onChange" />
        </van-col>
      </div>
      <van-cell title="执行情况" value="" />
    </van-cell-group>
    <div class="details">任务详情</div>
    <van-cell title="任务名称" value="" />
    <van-cell title="任务内容" value="" />
    <van-cell title="重要程度" value="" />
    <van-cell title="下达人" value="" />
    <van-cell title="下达时间" value="" />
    <van-cell title="主办人" value="" />
    <van-cell title="主办部门" value="" />
    <van-cell title="参与人" value="" />
    <van-cell title="截止时间" value="" />

  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      show: false,
      username: "",
      slider: 50
    };
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要汇报这些内容吗？"
        })
        .catch(() => {
          // on cancel
        });
    },
    apply() {
      this.show = true;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        setTimeout(done, 1000);
      } else {
        done();
      }
    },
    cloing() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要汇报完工申请吗？"
        })
        .catch(() => {
          // on cancel
        });
    },
    onChange(slider) {
      this.$toast("任务进度：" + slider);
    }
  },
  computed,
  mounted() {
    task.getTaskInfo(this.taskParams).then(res => {
      if (res) {
        console.log(res);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.taskExecute {
  width: 100%;
  .task-button {
    padding: 10px 0;
    .button {
      margin: 0 10px;
      color: #fff;
      border-radius: 5px;
      background-color: #3d95d5;
    }
  }
  .ap-access {
    height: 44px;
    display: flex;
    align-items: center;
    padding-left: 14px;
    font-size: 14px;
  }
  .details {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 14px;
  }
}
</style>


