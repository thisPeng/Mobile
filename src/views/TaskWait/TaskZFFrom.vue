<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="edit" />
      <van-field v-model="data[27]" label="工程编号" :disabled="edit" />
      <van-field v-model="data[28]" label="工程名称" :disabled="edit" />
      <van-field v-model="data[16]" label="申请方说明" :disabled="edit" />
      <van-field v-model="data[9]" label="可用资金金额" :disabled="edit" />
      <van-field label="员工姓名" disabled />
      <van-field label="创建日期" disabled />
      <van-cell-group class="from-payment">
        <span class="from-label">支付类型</span>
        <span class="from-select" @click="paymentShow=true">{{'请选择支付类型'}}</span>
        <van-popup v-model="paymentShow" position="bottom">
          <van-picker show-toolbar title="请选择" :columns="columns" @cancel="paymentShow=false" @confirm="onConfirm" />
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
          <!-- <tbody>
          <tr v-for="(item,index) in tableData" :key="item[0]" :class="active === index ? 'visited' : ''" @click="selectItem(index)">
            <td>{{item[33]}}</td>
            <td>{{item[2]}}</td>
            <td>{{item[4]}}</td>
            <td v-if="taskModel === 'complete'">{{item[40] !=="1900-01-01 00:00:00" ? item[40] : ''}}</td>
            <td>{{item[13]}}</td>
          </tr>
        </tbody> -->
        </table>
      </div>
    </van-cell-group>
    <van-cell-group>
      <taskTabs :data="data" />
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
      sexShow: false,
      columns: ["支付材料与劳务费用", "退结余额", "余额转预存其它项目"],
      paymentShow: false
    };
  },
  methods: {
    onConfirm(res) {
      console.log(res);
      this.paymentShow = false;
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
        // const sp = res.text.split(";");
        // this.data = eval(sp[0].split("=")[1])[0];
        // console.log(this.data);
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