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
      dataTable: [],
      dataMoney: [],
      taskTabs: {},
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
    task.getTaskZFInfo(this.taskParams).then(res => {
      if (res && res.status === 1) {
        //console.log(res);
        const sp = res.text.split(";");
        if (sp[0].split("=")[1] != "[]") {
          this.data = eval(sp[0].split("=")[1])[0];
        }
        //console.log(sp);
        this.dataTable = eval(sp[2].split("=")[1]);
        // console.log(this.data);
        this.payment = this.columns[this.data[9] - 1];

        task.getTaskZFMoney(this.data[2]).then(res => {
          // console.log(res);
          if (res && res.status === 1) {
            this.dataMoney = res.text.split(",");
            // console.log(this.dataMoney);
          }
        });
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
    border-top: 1px solid #d2d2d2;
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      margin-bottom: 40px;
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