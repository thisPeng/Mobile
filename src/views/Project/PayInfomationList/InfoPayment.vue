<template>
  <div class="infoPayment">
    <van-cell-group>
      <van-field v-model="data[1]" label="单号" />
      <van-field v-model="data[38]" label="收款单位" />
      <van-field v-model="data[42]" label="联系人" />
      <van-field v-model="data[43]" label="联系电话" />
      <van-field v-model="data[40]" label="申请单号" />
      <van-field v-model="data[10]" label="汇款日期" />
      <van-field v-model="data[9]" label="支付金额" />
      <van-field v-model="data[12]" label="银行账号" />
      <van-field v-model="data[11]" label="开户行" />
      <van-field v-model="data[13]" label="经手人" />
      <van-field v-model="data[16]" label="汇款说明" />
      <van-field v-model="data[29]" label="制单人" />
      <van-field v-model="data[8]" label="制单日期" />
      <van-cell-group class="task-upload">
        <div class="task-title">
          <span>资金凭证：</span>
        </div>
        <div class="task-content">
          <van-uploader class="task-imgage" :after-read="onReadFile1" accept="image/jpeg, image/png" :max-size="2097152" @oversize="$toast.fail('图片大小不能超过2M')">
            <img :src="image1" alt="资金凭证1" v-if="image1">
            <div class="content-upload" v-else>
              <van-icon name="photograph" />
              <span>点击上传凭证</span>
            </div>
          </van-uploader>
          <van-uploader class="task-imgage" :after-read="onReadFile2" accept="image/jpeg, image/png" :max-size="2097152" @oversize="$toast.fail('图片大小不能超过2M')">
            <img :src="image2" alt="资金凭证2" v-if="image2">
            <div class="content-upload" v-else>
              <van-icon name="photograph" />
              <span>点击上传凭证</span>
            </div>
          </van-uploader>
        </div>
      </van-cell-group>
    </van-cell-group>
    <div class="payment-button">
      <van-button @click="onSave">保存</van-button>
      <van-button type="primary" @click="onSumbit">审核</van-button>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { financial } from "../../../assets/js/api.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      data: [],
      names: [],
      image1: "",
      image2: "",
      images: [],
      businessKey: ""
    };
  },
  methods: {
    onReadFile1(file) {
      this.names[0] = file.file.name;
      this.image1 = file.content;
      this.images[0] = file.content.split(",")[1];
    },
    onReadFile2(file) {
      this.names[1] = file.file.name;
      this.image2 = file.content;
      this.images[1] = file.content.split(",")[1];
    },
    // 图片预览
    preView() {
      ImagePreview([
        (this.servePath + this.data[14]).replace("~", ""),
        (this.servePath + this.data[15]).replace("~", "")
      ]);
    },
    pageInit() {
      this.data = this.contractParams;
    },
    onSave() {
      let img = [];
      const params = {
        bpoName: "BPO_Pay_Info_EditService",
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
          financial.getMemorySheetNo("FK").then(ress => {
            if (ress && ress.status === 1) {
              const xml = require("xml");
              if (this.businessKey == "") {
                const uuidv1 = require("uuid/v1");
                this.businessKey = uuidv1();
              }
              let xmlString = "";
              if (this.edit) {
                xmlString = xml({
                  BC_FK_Money_InOut: [
                    { _attr: { UpdateKind: "ukModify" } },
                    { SC_Money_InOutOID: this.businessKey }
                  ]
                });
              }
              xmlString += xml({
                BC_FK_Money_InOut: [
                  { _attr: { UpdateKind: this.edit ? "" : "ukInsert" } },
                  {
                    SC_Money_InOutOID: this.edit ? "null" : this.businessKey
                  },
                  { InOut_SheetNO: ress.text },
                  { ProjectID: this.projectInfo.SC_ProjectOID },
                  { PartnerID: this.projectInfo.PartnerID },
                  { DemandID: this.projectInfo.DemandID },
                  { Sheet_Type: "FK" },
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
              financial
                .saveOrder("BPO_Pay_Info_EditService", xmlString)
                .then(res => {
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
    onSumbit() {
      financial.PaymentExamine(this.contractParams[0]).then(res => {
        if (res.status === 1) {
          this.$toast.success({
            forbidClick: true, // 禁用背景点击
            message: "审核成功"
          });
          setTimeout(() => {
            this.$router.go(-1);
          }, 800);
        } else {
          this.$toast.fail(res.text);
        }
      });
    }
  },
  computed,
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.infoPayment {
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

  .task-upload {
    padding-bottom: 15px;
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
      &::before {
        content: "*";
        position: absolute;
        left: 7px;
        font-size: 14px;
        color: #f44;
      }
    }
    .task-content {
      display: flex;
      justify-content: space-around;
      .task-imgage {
        width: 120px;
        height: 120px;
        border: 1px solid #ddd;
        img {
          width: 100%;
          height: 100%;
        }
        .content-upload {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          i {
            font-size: 30px;
          }
          span {
            color: #666;
            font-size: 12px;
            padding-top: 10px;
          }
        }
      }
    }
  }
}
</style>