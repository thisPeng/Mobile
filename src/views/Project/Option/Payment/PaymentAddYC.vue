<template>
  <!-- 新增预存列表 -->
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <!-- <van-field v-model="data[1]" label="单号" :disabled="true" /> -->
      <van-field :value="projectInfo.ProjectNo" label="工程编号" :disabled="true" />
      <van-field v-model="projectInfo.ProjectName" label="工程名称" :disabled="true" />
      <van-field v-model="data[10]" label="汇款日期" readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" v-show="dateShow" type="datetime" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
      <van-field v-model="data[9]" label="汇款金额(￥)" />
      <van-field v-model="data[12]" label="银行账号" />
      <van-field v-model="data[11]" label="开户行" />
      <van-field v-model="data[13]" label="经手人" />
      <van-field v-model="data[16]" label="汇款说明" />
      <van-field v-model="data[29]" label="制单人" />
      <van-field v-model="data[17]" label="制单日期" />
      <van-field v-model="data[18]" label="修改日期" />
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
    <div class="payment-button">
      <van-button @click="onSave">保存</van-button>
      <van-button type="primary">提交</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { ImagePreview } from "vant";
import { task, financial } from "../../../../assets/js/api.js";

export default {
  data() {
    return {
      edit: true,
      dateShow: false,
      currentDate: new Date(),
      data: [],
      businessKey: ""
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
      this.currentDate = new Date(this.data[10]);
      this.dateShow = true;
    },
    // 确认时间
    saveDate(val) {
      this.data[10] = new Date(val).Format("yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    },
    //保存先获取单号
    onSave() {
      if (this.data[10] == "" || typeof this.data[10] != "string") {
        this.$toast.fail("请选择汇款日期");
        return;
      }
      if (this.data[9] == "" || typeof this.data[9] != "string") {
        this.$toast.fail("请输入汇款金额");
        return;
      }
      if (this.data[12] == "" || typeof this.data[12] != "string") {
        this.$toast.fail("请输入银行账号");
        return;
      }
      if (this.data[11] == "" || typeof this.data[11] != "string") {
        this.$toast.fail("请输入开户行");
        return;
      }
      if (this.data[13] == "" || typeof this.data[13] != "string") {
        this.$toast.fail("请输入经手人");
        return;
      }
      if (this.data[16] == "" || typeof this.data[16] != "string") {
        this.$toast.fail("请输入汇款说明");
        return;
      }
      financial.getmemorySheetNo("YC").then(res => {
        // console.log(res);
        try {
          if (res && res.status === 1) {
            const xml = require("xml");
            if (this.businessKey == "") {
              const uuidv1 = require("uuid/v1");
              this.businessKey = uuidv1();
            }
            let xmlString = "";
            if (this.edit) {
              xmlString = xml({
                BC_SC_Money_InOut: [
                  {
                    _attr: { UpdateKind: "ukModify" }
                  },
                  {
                    SC_Money_InOutOID: this.businessKey
                  }
                ]
              });
            }
            xmlString += xml({
              BC_SC_Money_InOut: [
                { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                { SC_Money_InOutOID: this.edit ? "null" : this.businessKey },
                { InOut_SheetNO: res.text },
                { ProjectID: this.projectInfo.SC_ProjectOID },
                { PartnerID: this.projectInfo.PartnerID },
                { DemandID: this.projectInfo.DemandID },
                { Sheet_Type: "YC" },
                { Approve_Flag: 0 },
                { InOut_Date: this.data[10] },
                { InOut_Amt: this.data[9] },
                { Bank_Account: this.data[12] },
                { Bank_Name: this.data[11] },
                { Operator: this.data[13] },
                { Remark: this.data[16] },
                { SYS_CreatedBy: this.userId.UCML_UserOID },
                { SYS_POSTN: this.userId.UCML_PostOID },
                { SYS_DIVISION: this.userId.UCML_DivisionOID },
                { SYS_ORG: this.userId.UCML_OrganizeOID },
                { EmployeeName: this.userId.PersonName },
                { SYS_Created: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                { SYS_LAST_UPD_BY: this.userInfo.oid }
              ]
            });
            xmlString = "<root>" + xmlString + "</root>";
            console.log(xmlString);
            financial.prememoryConservation(xmlString).then(res => {
              console.log(res);
              if (res.status === 1) {
                this.$toast.success("保存成功");
                return;
              }
              this.$toast.fail(res.text);
            });
          } else {
            this.$toast.fail(res.text);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed,
  mounted() {
    // 获取数据
    task.getTaskYCInfo(this.taskParams).then(result => {
      try {
        if (result && result.status === 1) {
          let sp = result.text.split(";");
          this.data = eval(sp[0].split("=")[1]);
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
  .payment-button {
    width: 100%;
    padding: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    position: fixed;
    bottom: 0;
    background-color: #fff;
    button {
      width: 49%;
    }
  }
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