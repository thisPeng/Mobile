<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="edit" />
      <van-field v-model="data[27]" label="工程编号" :disabled="edit" />
      <van-field v-model="data[28]" label="工程名称" :disabled="edit" />
      <van-field v-model="data[17]" label="汇款日期" :disabled="edit" />
      <van-field v-model="data[9]" label="汇款金额" :disabled="edit" />
      <van-field v-model="data[12]" label="银行账号" :disabled="edit" />
      <van-field v-model="data[11]" label="开户行" :disabled="edit" />
      <van-field v-model="data[13]" label="经手人" :disabled="edit" />
      <van-field v-model="data[16]" label="汇款说明" :disabled="edit" />
      <van-field v-model="data[29]" label="操作员" :disabled="edit" />
      <van-field v-model="data[17]" label="创建日期" :disabled="edit" />
      <div class="task-title">
        <span>资金凭证</span>
      </div>
      <van-swipe class="task-img" :loop="true">
        <van-swipe-item>
          <img class="img" :src="(servePath+data[14]).replace('~','')" alt="资金凭证1" @click="preView">
        </van-swipe-item>
        <van-swipe-item>
          <img class="img" :src="(servePath+data[15]).replace('~','')" alt="资金凭证2" @click="preView">
        </van-swipe-item>
      </van-swipe>
    </van-cell-group>
    <van-cell-group v-if="taskTabs.codeJson">
      <taskTabs :data="taskTabs" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import taskTabs from "./../../components/TaskWait/Tabs";
import { ImagePreview } from "vant";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      data: [],
      taskTabs: {
        codeJson: []
      }
    };
  },
  methods: {
    preView() {
      ImagePreview([
        (this.servePath + this.data[14]).replace("~", ""),
        (this.servePath + this.data[15]).replace("~", "")
      ]);
    }
  },
  computed,
  components: {
    taskTabs
  },
  mounted() {
    try {
      // 获取数据
      task.getTaskYCInfo(this.taskParams).then(result => {
        if (result && result.status === 1) {
          let sp = result.text.split(";");
          this.data = eval(sp[0].split("=")[1])[0];
          this.taskTabs.InstanceID = this.data[32];
          this.taskTabs.FlowID = this.data[33];

          task.getFlowAssignData(this.data[32]).then(res => {
            if (res && res.status === 1) {
              sp = res.text.split(";");
              let tmp = eval(sp[1].split("=")[1])[0];
              this.taskTabs.TaskOID = tmp[0];
              this.taskTabs.ActivityID = tmp[5];
              if (tmp[13]) {
                this.taskTabs.codeJson = JSON.parse(tmp[13]);
              }
            }
          });
        }
      });
    } catch (e) {
      console.log(e);
    }
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
  .task-img {
    .img {
      width: 100%;
      height: 150px;
    }
  }
}
</style>