<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="edit" />
      <van-field v-model="data[27]" label="工程编号" :disabled="edit" />
      <van-field v-model="data[28]" label="工程名称" :disabled="edit" />
      <van-field v-model="data[17]" label="到款日期" :disabled="edit" />
      <van-field v-model="data[34]" label="到款金额" :disabled="edit" />
      <van-field v-model="data[12]" label="到款账号" :disabled="edit" />
      <van-field v-model="data[11]" label="开户行" :disabled="edit" />
      <van-field v-model="data[13]" label="经手人" :disabled="edit" />
      <van-field v-model="data[9]" label="批款金额" :disabled="edit" />
      <van-field v-model="data[16]" label="批款说明" :disabled="edit" />
      <van-field v-model="data[29]" label="操作员" :disabled="edit" />
      <van-field v-model="data[17]" label="创建日期" :disabled="edit" />
    </van-cell-group>
    <van-cell-group>
      <taskTabs :data="taskTabs" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import taskTabs from "./../../components/TaskWait/Tabs";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      data: [],
      taskTabs: {}
    };
  },
  methods: {},
  computed,
  components: {
    taskTabs
  },
  mounted() {
    // 获取数据
    task.getTaskYCInfo(this.taskParams).then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        this.data = eval(sp[0].split("=")[1])[0];
        console.log(this.data);
        // console.log(this.data);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  .task-title {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .center {
      margin: 0 auto;
    }
  }
}
</style>