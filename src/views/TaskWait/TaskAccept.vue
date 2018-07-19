<template>
  <div class="taskAccept">
    <div class="task-button">
      <van-button type="default" class="button" @click="exit">接受任务</van-button>
      <van-button type="default" class="button" @click="apply">申请变更</van-button>
    </div>
    <van-dialog v-model="show" show-cancel-button :before-close="beforeClose" title="任务变更申请确认">
      <van-field v-model="username" label="变更理由" placeholder="请输入变更理由" />
    </van-dialog>
    <van-cell-group>
      <div class="ap-access">
        <van-col span="6">完成百分比</van-col>
        <van-col span="19">
          <van-progress :percentage="50" /></van-col>
      </div>
      <van-cell title="任务名称" value="" />
      <van-cell title="任务内容" value="" />
      <van-cell title="下达人" value="" />
      <van-cell title="下达时间" value="" />
      <van-cell title="主办人" value="" />
      <van-cell title="主办部门" value="" />
      <van-cell title="参与部门" value="" />
      <van-cell title="截止时间" value="" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      show: false,
      username: ""
    };
  },
  methods: {
    exit() {
      this.$dialog
        .confirm({
          title: "提示",
          message: "是否接受此任务？"
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
.taskAccept {
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
}
</style>


