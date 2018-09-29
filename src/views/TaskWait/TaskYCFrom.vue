<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="true" />
      <van-field v-model="data[27]" label="工程编号" :disabled="true" />
      <van-field v-model="data[28]" label="工程名称" :disabled="true" />
      <van-field v-model="data[10]" label="汇款日期" :disabled="edit" readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" v-show="dateShow" type="datetime" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
      <van-field v-model="data[9]" label="汇款金额(￥)" :disabled="edit" />
      <van-field v-model="data[12]" label="银行账号" :disabled="edit" />
      <van-field v-model="data[11]" label="开户行" :disabled="edit" />
      <van-field v-model="data[13]" label="经手人" :disabled="edit" />
      <van-field v-model="data[16]" label="汇款说明" :disabled="edit" />
      <van-field v-model="data[29]" label="制单人" :disabled="true" />
      <van-field v-model="data[17]" label="制单日期" :disabled="true" />
      <van-field v-model="data[18]" label="修改日期" :disabled="true" />
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
      dateShow: false,
      currentDate: new Date(),
      data: [],
      taskTabs: {
        codeJson: []
      }
    };
  },
  methods: {
    // 图片预览
    preView() {
      ImagePreview([
        (this.servePath + this.data[14]).replace("~", ""),
        (this.servePath + this.data[15]).replace("~", "")
      ]);
    },
    // 显示时间选择
    showDate() {
      this.currentDate = this.$util.formatDate(this.data[10]);
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
    this.$parent.title = this.taskParams.name;
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
            InOut_Amt: this.data[9],
            Bank_Account: this.data[12],
            Bank_Name: this.data[11],
            Operator: this.data[13],
            Remark: this.data[16],
            SYS_LAST_UPD_BY: this.data[25],
            SYS_LAST_UPD: this.data[17]
          };
          this.taskTabs.arrays = [0, 10, 9, 12, 11, 13, 16, 25, 17];

          task.getFlowAssignData(this.data[32]).then(res => {
            try {
              if (res && res.status === 1) {
                sp = res.text.split(";");
                const tmp = eval(sp[1].split("=")[1])[0];
                this.taskTabs.TaskOID = tmp[0];
                this.taskTabs.ActivityID = tmp[5];
                if (tmp[13]) {
                  this.taskTabs.codeJson = JSON.parse(tmp[13]);
                } else if (this.taskModel === "我的待办") {
                  this.edit = false;
                }
              }
            } catch (e) {
              console.log(e);
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
  .task-img {
    .img {
      width: 100%;
      height: 150px;
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