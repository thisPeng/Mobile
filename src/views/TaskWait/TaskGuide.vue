<template>
  <div class="taskGuide">
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

    <van-tabs v-model="active">
      <van-tab>
        <div slot="title">
          执行进度汇报
        </div>
        <div class="task-table">
          <table>
            <thead>
              <tr>
                <td>汇报时间</td>
                <td>汇报执行情况</td>
                <td v-if="taskModel === 'complete'">完成日期</td>
                <td>进度</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="item[0]" :class="active === index ? 'visited' : ''" @click="selectItem(index)">
                <td>{{item[5]}}</td>
                <td>{{item[7]}}</td>
                <td v-if="taskModel === 'complete'">{{item[40] !=="1900-01-01 00:00:00" ? item[40] : ''}}</td>
                <td>{{item[18]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </van-tab>
      <van-tab>
        <div slot="title">
          变更申请记录
        </div>
        <div class="task-table">
          <table>
            <thead>
              <tr>
                <td>时间</td>
                <td>变更理由</td>
                <td v-if="taskModel === 'complete'">完成日期</td>
                <td>变更结果</td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item,index) in tableData" :key="item[0]" :class="active === index ? 'visited' : ''" @click="selectItem(index)">
                <td>{{item[5]}}</td>
                <td>{{item[7]}}</td>
                <td v-if="taskModel === 'complete'">{{item[40] !=="1900-01-01 00:00:00" ? item[40] : ''}}</td>
                <td>{{item[18]}}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 2,
      tableData: []
    };
  },
  methods: {},
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
.taskGuide {
  width: 100%;
  .details {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 14px;
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


