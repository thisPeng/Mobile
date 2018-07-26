<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="edit" />
      <van-field v-model="data[25]" label="工程编号" :disabled="edit" />
      <van-field v-model="data[24]" label="工程名称" :disabled="edit" />
      <van-field v-model="data[10]" label="申请方说明" :disabled="edit" />
      <van-field v-model="dataMoney[3]" label="可用资金" :disabled="edit" />
      <van-field v-model="data[31]" label="员工姓名" disabled />
      <van-field v-model="data[16]" label="创建日期" disabled />
      <van-cell-group class="from-payment">
        <span class="from-label">支付类型</span>
        <span class="from-select" v-if="edit">{{payment}}</span>
        <span class="from-select" v-else @click="paymentShow=true">{{payment}}</span>
        <van-popup v-model="paymentShow" v-if="!edit" position="bottom">
          <van-picker show-toolbar :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <div class="task-table">
        <table>
          <thead>
            <tr>
              <td>单位名称</td>
              <td>分配金额</td>
              <td>款项说明</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in dataTable" :key="item[0]">
              <td>{{item[8]}}</td>
              <td>{{item[4]}}</td>
              <td>{{item[5]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
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
      data: [],
      dataTable: [],
      dataMoney: [],
      taskTabs: {
        codeJson: []
      },
      sexShow: false,
      columns: ["支付材料与劳务费用", "退结余额", "余额转预存其它项目"],
      paymentShow: false,
      payment: "请选择支付类型"
    };
  },
  methods: {
    onConfirm(res) {
      // console.log(res);
      this.payment = res;
      this.columns[res] = this.paymentShow = false;
    }
  },
  computed,
  components: {
    taskTabs
  },
  mounted() {
    // 获取数据
    try {
      task.getTaskZFInfo(this.taskParams).then(result => {
        if (result && result.status === 1) {
          let sp = result.text.split(";");

          this.data = eval(sp[0].split("=")[1])[0];
          this.dataTable = eval(sp[2].split("=")[1]);
          this.payment = this.columns[this.data[9] - 1];
          this.taskTabs.InstanceID = this.data[34];
          this.taskTabs.FlowID = this.data[35];

          task.getTaskZFMoney(this.data[2]).then(res => {
            if (res && res.status === 1) {
              this.dataMoney = res.text.split(",");
            }
          });

          task.getFlowAssignData(this.data[34]).then(res => {
            if (res && res.status === 1) {
              sp = res.text.split(";");
              let tmp = eval(sp[1].split("=")[1])[0];
              // console.log(tmp);
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
      height: 200px;
    }
  }
  .from-payment {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .from-label {
      min-width: 90px;
      flex: 1;
    }
    .from-select {
      flex: 5;
    }
  }
  .task-button {
    padding: 10px 0;
    .button {
      margin: 0 10px;
      color: #fff;
      border-radius: 5px;
      background-color: #3d95d5;
    }
  }
  .task-table {
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      thead {
        tr {
          background-color: #e9f8ff;
          font-weight: 600;
        }
        td {
          padding: 10px 0;
        }
      }
      tbody {
        tr:nth-child(2n) {
          background-color: #e9f8ff;
        }
        td {
          height: 50px;
        }
        .visited {
          background-color: #b3e7ff !important;
        }
      }
    }
  }
}
</style>