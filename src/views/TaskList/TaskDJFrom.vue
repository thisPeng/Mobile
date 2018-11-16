<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 300px;' : 'padding-bottom: 30px;'">
      <div class="task-title">基础信息</div>
      <van-field :value="data[1]" label="单号" :disabled="true" />
      <van-field :value="data[27]" label="工程编号" :disabled="true" />
      <van-field :value="data[28]" label="工程名称" :disabled="true" />
      <van-field :value="$util.formatDate(data[10])" label="冻结日期" :disabled="edit" readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" v-show="dataShow" type="date" class="task-date" @confirm="saveDate" @cancel="dataShow=false" />
      <van-field :value="data[34]" label="可用资金(￥)" :disabled="true" />
      <van-field v-model="data[9]" label="冻结金额(￥)" :disabled="edit" />
      <van-field v-model="data[13]" label="经手人" :disabled="edit" />
      <van-field v-model="data[16]" label="冻结说明" type="textarea" :disabled="edit" />

      <!--制单信息-->
      <div class="task-title">制单信息</div>
      <van-field :value="data[29]" label="制单人" :disabled="true" />
      <van-field :value="$util.formatDate(data[17])" label="制单日期" :disabled="true" />
      <van-field :value="$util.formatDate(data[18])" label="修改日期" :disabled="true" v-if="data[18] && data[18] != '1900-01-01 00:00:00'" />
    </van-cell-group>
    <van-cell-group v-if="taskTabs.codeJson && data[30] === 0">
      <taskTabs :data="taskTabs" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import taskTabs from "./../../components/TaskList/Tabs";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      dataShow: false,
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
      this.data[10] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    }
  },
  computed,
  components: {
    taskTabs
  },
  mounted() {
    // 获取数据
    task.getTaskYCInfo(this.taskParams).then(result => {
      try {
        if (result && result.status === 1) {
          let sp = result.text.split(";");
          this.data = eval(sp[0].split("=")[1])[0];
          this.data[9] = this.$util.formatMoney(this.data[9]);
          this.taskTabs.InstanceID = this.data[32];
          this.taskTabs.FlowID = this.data[33];

          this.taskTabs.params = {
            SC_Money_InOutOID: this.data[0],
            InOut_Date: this.data[10],
            Remark: this.data[16],
            InOut_Amt: this.data[9],
            Operator: this.data[13],
            SYS_LAST_UPD_BY: this.data[29],
            SYS_LAST_UPD: this.data[17]
          };
          this.taskTabs.arrays = [0, 10, 16, 9, 13, 29, 17];

          task.getFlowAssignData(this.data[32]).then(res => {
            try {
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
            } catch (e) {
              console.log(e);
            }
          });
        }
      } catch (e) {
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
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .task-date {
    width: 100%;
    position: fixed;
    z-index: 9999;
    bottom: 0;
  }
}
</style>