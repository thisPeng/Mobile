<template>
  <div class="task">
    <div class="task-content">
      <van-cell-group>
        <van-field :value="data[1] || '系统生成'" label="单号" :disabled="true" />
        <van-field :value="taskParams.params[27]" label="工程编号" :disabled="true" />
        <van-field :value="taskParams.params[28]" label="工程编号" :disabled="true" />
        <van-field :value="taskParams.params[9]" label="冻结金额(￥)" :disabled="true" />
        <van-field :value="taskParams.params[9]" label="解冻金额(￥)" :disabled="true" />
        <van-field :value="$util.formatDate(data[10]) || '请选择解冻日期'" label="解冻日期" required readonly @click="showDate" />
        <van-datetime-picker v-model="currentDate" v-show="dateShow" :min-date="new Date()" type="date" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
        <van-field v-model="data[16]" label="解冻说明" placeholder="请输入解冻说明" type="textarea" required />
        <van-field v-model="data[13]" placeholder="请输入经手人" label="经手人" required />
        <van-field :value="data[29] || userId.PersonName" label="制单人" :disabled="true" />
        <van-field :value="$util.formatDate(data[17])" label="制单日期" :disabled="true" />
        <van-field :value="$util.formatDate(data[18])" label="修改日期" :disabled="true" v-if="data[18]" />
      </van-cell-group>
      <div class="payment-button">
        <van-button @click="onSave">保存</van-button>
        <van-button type="primary" @click="onSubmit">提交</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { financial } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      edit: false,
      dateShow: false,
      currentDate: new Date(),
      bpoName: "BPO_Start_JD_InOutFormService",
      data: [],
      projectShow: false,
      projectList: [],
      currProject: []
    };
  },
  methods: {
    // 显示时间选择
    showDate() {
      this.currentDate = this.$util.formatDate(this.data[10]);
      this.dateShow = true;
    },
    // 确认时间
    saveDate(val) {
      this.data[10] = this.$util.formatDate(val, "yyyy-MM-dd");
      this.dateShow = false;
    },
    //保存先获取单号
    onSave() {
      if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
        this.$toast("请选择解冻日期");
        return;
      }
      if (!this.data[13]) {
        this.$toast("请输入经手人");
        return;
      }
      if (!this.data[16]) {
        this.$toast("请输入解冻说明");
        return;
      }
      financial.getMemorySheetNo("JD").then(result => {
        try {
          if (result && result.status === 1) {
            const xml = require("xml");
            if (!this.businessKey) {
              const uuidv1 = require("uuid/v1");
              this.businessKey = uuidv1();
            }
            let xmlString = "";
            if (this.edit) {
              xmlString = xml({
                BC_SC_Money_InOut: [
                  { _attr: { UpdateKind: "ukModify" } },
                  { SC_Money_InOutOID: this.businessKey }
                ]
              });
            }
            xmlString += xml({
              BC_SC_Money_InOut: [
                { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                {
                  SC_Money_InOutOID: this.edit ? "null" : this.businessKey
                },
                { InOut_SheetNO: this.taskParams.params[1] || result.text },
                { ProjectID: this.taskParams.params[2] },
                { PartnerID: this.taskParams.params[3] },
                { DemandID: this.taskParams.params[4] },
                { Sheet_Type: "JD" },
                { Approve_Flag: 0 },
                { InOut_Date: this.data[10] },
                { InOut_Amt: this.taskParams.params[9] },
                { Operator: this.data[13] },
                { Remark: this.data[16] },
                { ProjectNo: this.taskParams.params[27] },
                { ProjectName: this.taskParams.params[28] },
                { Project_InAmt: this.taskParams.params[9] },
                { SYS_CreatedBy: this.userId.UCML_UserOID },
                { SYS_POSTN: this.userId.UCML_PostOID },
                { SYS_DIVISION: this.userId.UCML_DivisionOID },
                { SYS_ORG: this.userId.UCML_OrganizeOID },
                { EmployeeName: this.userId.PersonName },
                {
                  SYS_Created: this.data[17] || new Date().Format("yyyy-MM-dd")
                },
                { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd") },
                { SYS_LAST_UPD_BY: this.userInfo.oid }
              ]
            });
            xmlString = "<root>" + xmlString + "</root>";
            financial.saveOrder(this.bpoName, xmlString).then(ress => {
              if (result.status) {
                financial
                  .updateOrigID(this.businessKey, this.taskParams.params[0])
                  .then(res => {
                    if (res.status && res.text === "True") {
                      this.edit = true;
                      this.$toast.success("保存成功");
                      return;
                    } else {
                      this.$toast.fail("保存失败，请刷新重试");
                    }
                  });
              } else {
                this.$toast.fail(ress.text);
              }
            });
          }
          throw result.text;
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    onSubmit() {
      try {
        financial
          .submitPremomery(this.businessKey, this.userId.UCML_DivisionOID)
          .then(result => {
            if (result.status === 1) {
              financial
                .submitOrder(this.bpoName, "FLow_10603VER10", this.businessKey)
                .then(res => {
                  if (res.status === 1) {
                    this.$toast.success({
                      forbidClick: true, // 禁用背景点击
                      message: "提交成功"
                    });
                    setTimeout(() => {
                      this.$router.go(-1);
                    }, 800);
                  } else {
                    this.$toast.fail(res.text);
                  }
                });
            } else {
              this.$toast.fail("提交失败，请先保存内容再提交");
            }
          });
      } catch (e) {
        this.$toast.fail(e);
        console.log(e);
      }
    },
    pageInit() {
      if (this.taskParams) {
        // 获取数据
        financial.getTaskYCInfo(this.taskParams).then(result => {
          try {
            if (result && result.status === 1) {
              const sp = result.text.split(";");
              const data = eval(sp[0].split("=")[1])[0];
              if (data) {
                this.data = data;
                this.businessKey = data[0];
                this.edit = true;
                if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
                  this.data[10] = new Date().Format("yyyy-MM-dd");
                }
              }
            }
          } catch (e) {
            console.log(e);
          }
        });
      }
    }
  },
  computed,
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.task {
  width: 100%;
  padding-bottom: 75px;
  overflow: hidden !important;
  .task-content {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
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
  }
}
</style>