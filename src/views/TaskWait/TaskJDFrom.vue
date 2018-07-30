<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="true" />
      <van-field v-model="data[27]" label="工程编号" :disabled="true" />
      <van-field v-model="data[28]" label="工程名称" :disabled="true" />
      <van-field v-model="data[10]" label="解冻日期" :disabled="true" readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" v-show="dateShow" type="datetime" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
      <van-field v-model="data[16]" label="解冻说明" :disabled="edit" />
      <van-field v-model="data[34]" label="冻结金额(￥)" :disabled="true" />
      <van-field v-model="data[9]" label="解冻金额(￥)" :disabled="true" />
      <van-field v-model="data[13]" label="经手人" :disabled="edit" />
      <van-field v-model="data[29]" label="操作员" :disabled="true" />
      <van-field v-model="data[17]" label="创建日期" :disabled="true" />
      <van-field v-model="data[18]" label="修改日期" :disabled="true" />
    </van-cell-group>
    <van-cell-group v-if="taskTabs.codeJson">
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
      dateShow: false,
      currentDate: new Date(),
      data: [],
      taskTabs: {
        codeJson: []
      }
    };
  },
  methods: {
    // 显示时间选择
    showDate() {
      this.currentDate = new Date(this.data[10]);
      this.dateShow = true;
    },
    // 确认时间
    saveDate(val) {
      this.data[10] = new Date(val).Format("yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    }
  },
  computed,
  components: {
    taskTabs
  },
  mounted() {
    this.$parent.title = this.taskParams.name;
    // 获取数据
    task.getTaskYCInfo(this.taskParams).then(result => {
      try {
        if (result && result.status === 1) {
          let sp = result.text.split(";");
          this.data = eval(sp[0].split("=")[1])[0];
          this.data[9] = this.$util.formatMoney(this.data[9]);
          this.data[34] = this.$util.formatMoney(this.data[34]);
          this.taskTabs.InstanceID = this.data[32];
          this.taskTabs.FlowID = this.data[33];

          this.taskTabs.params = {
            SC_Money_InOutOID: this.data[0],
            Remark: this.data[16],
            Operator: this.data[13],
            SYS_LAST_UPD_BY: this.data[25],
            SYS_LAST_UPD: this.data[17]
          };
          this.taskTabs.arrays = [0, 16, 13, 25, 17];

          task.getFlowAssignData(this.data[32]).then(res => {
            if (res && res.status === 1) {
              sp = res.text.split(";");
              const tmp = eval(sp[1].split("=")[1])[0];
              this.taskTabs.TaskOID = tmp[0];
              this.taskTabs.ActivityID = tmp[5];
              if (tmp[13]) {
                this.taskTabs.codeJson = JSON.parse(tmp[13]);
              } else {
                this.edit = false;
              }
            }
          });
        }
      } catch (e) {
        this.$router.go(-1);
        console.log(e);
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
  .task-date {
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 0;
  }
}
</style>