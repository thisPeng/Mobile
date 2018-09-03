<template>
  <div class="task">
    <div class="task-data">
      <!-- <div class="task-button">
        <van-button type="default" class="button" @click="exeTask">{{taskModel === '我的已办' ? '查看详情' : '执行任务'}}</van-button>
        <van-button type="default" class="button">流程跟踪</van-button>
      </div> -->
      <div class="task-card">
        <div class="task-item" v-for="(item,index) in tableData" :key="item[0]" @click="selectItem(index)">
          <div class="item-title">
            <span class="title">{{taskModel === '我的已办' ? item[25] || item[26] : item[33] || item[34]}}</span>
            <span class="icon">
              <van-icon name="arrow" />
            </span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">任务名称：{{taskModel === '我的已办' ? item[2] : item[2]}}</span>
              <span class="row-right">执行人：{{taskModel === '我的已办' ? item[9] : item[13]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">创建日期：{{taskModel === '我的已办' ? item[7] : item[8]}}</span>
              <span class="row-right" v-if="taskModel === '我的已办'">完成日期：{{item[15] !=="1900-01-01 00:00:00" ? item[15] : ''}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="task-table">
        <table>
          <thead>
            <tr>
              <td>项目名称</td>
              <td>任务名称</td>
              <td>创建日期</td>
              <td v-if="taskModel === '我的已办'">完成日期</td>
              <td>执行人</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="item[0]" :class="active === index ? 'visited' : ''" @click="selectItem(index)" @dblclick="exeTask">
              <td>{{taskModel === '我的已办' ? item[25] : item[33]}}</td>
              <td>{{taskModel === '我的已办' ? item[2] : item[2]}}</td>
              <td>{{taskModel === '我的已办' ? item[7] : item[8]}}</td>
              <td v-if="taskModel === '我的已办'">{{item[15] !=="1900-01-01 00:00:00" ? item[15] : ''}}</td>
              <td>{{taskModel === '我的已办' ? item[9] : item[13]}}</td>
            </tr>
          </tbody>
        </table>
      </div> -->
    </div>
    <van-pagination v-model="currentPage" :total-items="tablePages.RecordCount" :items-per-page="10" mode="simple" class="task-pages" @change="getTableData" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { task } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: "",
      tableData: [],
      tablePages: {
        PageCount: 1,
        ReadCount: 1,
        RecordCount: 1,
        StartPos: 0
      },
      currentPage: 1,
      params: {}
    };
  },
  methods: {
    // 获取表格数据
    getTableData() {
      const page = this.currentPage > 0 ? this.currentPage - 1 : 0;
      if (this.taskModel === "我的已办") {
        task.getCompleteData(page, this.tablePages.RecordCount).then(res => {
          if (res) {
            try {
              const sp = res.text.split(";");
              this.tableData = eval("[[" + sp[0].split("[[")[1]);
              const pages = "(" + sp[1].split("=")[1] + ")";
              this.tablePages = eval(pages);
              // console.log(this.tableData)
            } catch (e) {
              console.log(e);
            }
          }
        });
      } else {
        task.getWaitData(page).then(res => {
          if (res) {
            try {
              const sp = res.text.split(";");
              this.tableData = eval("[[" + sp[0].split("[[")[1]);
              console.log(this.tableData);
              const pages = "(" + sp[1].split("=")[1] + ")";
              this.tablePages = eval(pages);
            } catch (e) {
              console.log(e);
            }
          }
        });
      }
    },
    // 选中项
    selectItem(i) {
      if (this.taskModel === "我的已办") {
        this.params = {
          TaskID: this.tableData[i][8],
          InstanceID: this.tableData[i][4],
          name: this.tableData[i][2],
          bpoName: this.tableData[i][3],
          TaskGYSID: "InstanceID='" + this.tableData[i][4] + "'"
        };
      } else {
        this.params = {
          TaskID: this.tableData[i][9],
          InstanceID: this.tableData[i][5],
          name: this.tableData[i][2],
          bpoName: this.tableData[i][3],
          TaskGYSID: "InstanceID='" + this.tableData[i][5] + "'"
        };
      }
      this.exeTask();
      /*
      if (this.active === i) {
        this.exeTask();
      } else {
        this.active = i;
        if (this.taskModel === "我的已办") {
          this.params = {
            TaskID: this.tableData[i][8],
            InstanceID: this.tableData[i][4],
            name: this.tableData[i][2],
            bpoName: this.tableData[i][3]
          };
        } else {
          this.params = {
            TaskID: this.tableData[i][9],
            InstanceID: this.tableData[i][5],
            name: this.tableData[i][2],
            bpoName: this.tableData[i][3]
          };
        }
      }
      */
    },
    // 执行任务
    exeTask() {
      this.$store.commit("taskParams", this.params);
      if (this.params.name.indexOf("预存") >= 0) {
        this.$router.push({
          name: "taskYCFrom"
        });
      } else if (this.params.name.indexOf("支付") >= 0) {
        this.$router.push({
          name: "taskZFFrom"
        });
      } else if (this.params.name.indexOf("扣款") >= 0) {
        this.$router.push({
          name: "taskKKFrom"
        });
      } else if (this.params.name.indexOf("解冻") >= 0) {
        this.$router.push({
          name: "taskJDFrom"
        });
      } else if (this.params.name.indexOf("批款") >= 0) {
        this.$router.push({
          name: "taskPKFrom"
        });
      } else if (this.params.name.indexOf("冻结") >= 0) {
        this.$router.push({
          name: "taskDJFrom"
        });
      } else if (this.params.name.indexOf("供应商") >= 0) {
        this.$router.push({
          name: "taskGYSFrom"
        });
      }
    }
  },
  computed,
  mounted() {
    const model = this.$router.history.current.params.model || this.taskModel;
    this.$parent.title = model;
    this.$store.commit("taskModel", model);
    this.getTableData();
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  padding: 10px;
  .task-data {
    margin-bottom: 40px;
    .task-button {
      padding: 10px 0;
      .button {
        margin: 0 10px;
        color: #fff;
        border-radius: 5px;
        background-color: #3d95d5;
      }
    }
    .task-card {
      width: 100%;
      .task-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          padding: 10px 0;
          border-bottom: 1px solid #f6f6f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .title {
            font-weight: 600;
            font-size: 16px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 12px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
            .row-left {
              flex: 1;
            }
            .row-right {
              flex: 1;
            }
          }
        }
      }
    }
    /*
    .task-table {
      border-top: 1px solid #d2d2d2;
      padding-bottom: 5px;
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
    */
  }
  .task-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
