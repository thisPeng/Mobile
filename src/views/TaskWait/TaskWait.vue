<template>
  <div class="task">
    <div class="task-data">
      <div class="task-button" v-if="taskModel === 'wait'">
        <van-button type="default" class="button" @click="exeTask">执行任务</van-button>
        <!-- <van-button type="default" class="button">流程跟踪</van-button> -->
      </div>
      <div class="task-table">
        <table>
          <thead>
            <tr>
              <td>项目名称</td>
              <td>任务名称</td>
              <td>创建日期</td>
              <td v-if="taskModel === 'complete'">完成日期</td>
              <td>执行者</td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in tableData" :key="item[0]" :class="active === index ? 'visited' : ''" @click="selectItem(index)">
              <td>{{taskModel === 'complete' ? item[25] : item[33]}}</td>
              <td>{{taskModel === 'complete' ? item[2] : item[2]}}</td>
              <td>{{taskModel === 'complete' ? item[7] : item[4]}}</td>
              <td v-if="taskModel === 'complete'">{{item[15] !=="1900-01-01 00:00:00" ? item[15] : ''}}</td>
              <td>{{taskModel === 'complete' ? item[9] : item[13]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <van-pagination v-model="currentPage" :total-items="tablePages.RecordCount" :items-per-page="tablePages.PageCount" mode="simple" class="task-pages" @change="getTableData" />
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
      if (this.taskModel === "complete") {
        task.getCompleteData(page, this.tablePages.RecordCount).then(res => {
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
      } else {
        task.getWaitData(page).then(res => {
          if (res) {
            try {
              const sp = res.text.split(";");
              this.tableData = eval("[[" + sp[0].split("[[")[1]);
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
      this.active = i;
      const params = {
        TaskID: this.tableData[i][9],
        InstanceID: this.tableData[i][5],
        name: this.tableData[i][2],
        bpoName: this.tableData[i][3]
      };
      // console.log(params);
      // console.log(this.tableData[i]);
      this.params = params;
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
      }
    }
  },
  computed,
  mounted() {
    const model = this.$router.history.current.params.model || this.taskModel;
    this.$store.commit("taskModel", model);
    this.getTableData();
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  .task-data {
    height: 100%;
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
  .task-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
