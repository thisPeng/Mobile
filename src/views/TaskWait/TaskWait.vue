<template>
  <div class="task">
    <div class="task-list">
      <div class="task-button">
        <van-button type="default" class="button">执行任务</van-button>
        <van-button type="default" class="button">流程跟踪</van-button>
      </div>
      <div>

      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {},
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  .task-list {
    background-color: #fff;
    .task-button {
      padding: 10px 0;
      .button {
        margin: 0 10px;
        color: #fff;
        border-radius: 5px;
        background-color: #3d95d5;
      }
    }
  }
}
</style>
