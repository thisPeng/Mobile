<template>
  <div class="task">
    <van-cell-group :style="tabsShow ? 'padding-bottom: 280px;' : 'padding-bottom: 30px;'">
      <van-field v-model="data[1]" label="单号" :disabled="true" />
      <van-field v-model="data[27]" label="工程编号" :disabled="true" />
      <van-field v-model="data[28]" label="工程名称" :disabled="true" />
      <van-field v-model="data[10]" label="冻结日期" readonly @click="showDate" />
      <van-datetime-picker v-model="currentDate" v-show="dataShow" type="datetime" class="task-date" @confirm="saveDate" @cancel="dataShow=false" />
      <van-field v-model="data[16]" label="冻结说明" />
      <van-field v-model="data[34]" label="可用资金(￥)" :disabled="true" />
      <van-field v-model="data[9]" label="冻结金额(￥)" />
      <van-field v-model="data[13]" label="经手人" />
      <van-field v-model="data[29]" label="制单人" :disabled="true" />
      <van-field v-model="data[17]" label="制单日期" :disabled="true" />
      <van-field v-model="data[18]" label="修改日期" :disabled="true" />
    </van-cell-group>
    <div class="payment-button">
      <van-button @click="onSave">保存</van-button>
      <van-button type="primary" @click="onSubmit">提交</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { task, financial } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      edit: false,
      dataShow: false,
      currentDate: new Date(),
      data: [],
      businessKey: ""
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
    },
    //保存先获取单号
    onSave() {
      if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
        this.$toast.fail("请选择汇款日期");
        return;
      }
      if (isNaN(parseInt(this.data[9]))) {
        this.$toast.fail("请输入正确汇款金额");
        return;
      }
      if (!this.data[12]) {
        this.$toast.fail("请输入银行账号");
        return;
      }
      if (!this.data[11]) {
        this.$toast.fail("请输入开户行");
        return;
      }
      if (!this.data[13]) {
        this.$toast.fail("请输入经手人");
        return;
      }
      if (!this.data[16]) {
        this.$toast.fail("请输入汇款说明");
        return;
      }
      if (!this.image1 && !this.image2) {
        this.$toast.fail("请上传支付凭证");
        return;
      }
      let img = [];
      const params = {
        UserPhoto: this.images.join(","),
        PhotoName: this.names.join(",")
      };
      financial.uploadImage(params).then(result => {
        try {
          if (result.status == 1) {
            img = result.text.split(",");
            // 修正资金凭证1
            if (img.length > 0 && img[0].length <= 33) {
              img[0] = "null";
            }
          }
          financial.getMemorySheetNo("YC").then(ress => {
            if (ress && ress.status === 1) {
              const xml = require("xml");
              if (this.businessKey == "") {
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
                  { InOut_SheetNO: ress.text },
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
                  { Certificate1: img[0] || "null" },
                  { Certificate2: img[1] || "null" },
                  { SYS_CreatedBy: this.userId.UCML_UserOID },
                  { SYS_POSTN: this.userId.UCML_PostOID },
                  { SYS_DIVISION: this.userId.UCML_DivisionOID },
                  { SYS_ORG: this.userId.UCML_OrganizeOID },
                  { EmployeeName: this.userId.PersonName },
                  {
                    SYS_Created:
                      this.data[17] || new Date().Format("yyyy-MM-dd hh:mm:ss")
                  },
                  { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
                  { SYS_LAST_UPD_BY: this.userInfo.oid }
                ]
              });
              xmlString = "<root>" + xmlString + "</root>";
              financial.preMemoryConservation(xmlString).then(res => {
                if (res.status === 1) {
                  this.$toast.success("保存成功");
                  return;
                }
                throw res.text;
              });
            } else {
              throw ress.text;
            }
          });
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    onSubmit() {
      try {
        financial
          .submitPremomery(this.businessKey, this.projectInfo.DemandID)
          .then(result => {
            if (result.status === 1) {
              financial.conservationSubmit(this.businessKey).then(res => {
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
      // 获取数据
      financial.getTaskYCInfo(this.taskParams).then(result => {
        try {
          if (result && result.status === 1) {
            let sp = result.text.split(";");
            this.data = eval(sp[0].split("=")[1])[0];
            this.businessKey = this.data[0];
            this.edit = true;
            this.image1 = this.data[14].replace("~", this.servePath);
            this.image2 = this.data[15].replace("~", this.servePath);
          }
          if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
            this.data[10] = new Date().Format("yyyy-MM-dd hh:mm:ss");
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  computed,
  mounted() {
    this.pageInit();
    /*
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
        }
      } catch (e) {
        this.$router.go(-1);
        console.log(e);
      }
    });
    */
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
</style>