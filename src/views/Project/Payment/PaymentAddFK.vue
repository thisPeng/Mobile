<template>
  <div class="task" :style="edit ? 'padding-bottom: 75px' : ''">
    <div class="task-data">
      <van-cell-group>
        <div class="task-title">基础信息</div>
        <van-field v-model="data[1]" label="单号" disabled />
        <van-field v-model="data[38]" label="收款单位" disabled />
        <van-field v-model="data[42]" label="联系人" disabled />
        <van-field v-model="data[43]" label="联系电话" disabled />
        <van-field v-model="data[40]" label="申请单号" disabled />
        <van-field :value="$util.formatDate(data[10]) || '请选择汇款日期'" label="汇款日期：" required readonly @click="edit ? showDate : ''" />
        <van-datetime-picker v-model="currentDate" title="汇款日期" v-show="dateShow" :min-date="new Date(new Date().Format('yyyy'))" type="date" class="task-date" @confirm="saveDate" @cancel="dateShow=false" />
        <van-field v-model="data[9]" label="支付金额" disabled />
        <van-field v-model="data[12]" label="银行账号" required placeholder="请输入银行账号" :disabled="!edit" />
        <van-field v-model="data[11]" label="开户行" required placeholder="请输入开户行" :disabled="!edit" />
        <van-field v-model="data[13]" label="经手人" required placeholder="请输入经手人" :disabled="!edit" />
        <van-field v-model="data[16]" label="汇款说明" type="textarea" required :disabled="!edit" />
        <!--资金凭证-->
        <div class="task-title">资金凭证</div>
        <van-cell-group class="task-upload">
          <div class="task-content" v-if="edit">
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
          <div class="task-content" v-else>
            <div class="task-imgage">
              <img :src="image1" alt="资金凭证1">
            </div>
            <div class="task-imgage">
              <img :src="image2" alt="资金凭证2">
            </div>
          </div>
        </van-cell-group>
        <!--制单信息-->
        <div class="task-title">制单信息</div>
        <van-field :value="data[29] || userInfo.name" label="制单人" disabled />
        <van-field :value="$util.formatDate(data[17]) || new Date().Format('yyyy-MM-dd')" label="制单日期：" disabled />
        <van-field :value="$util.formatDate(data[18]) || new Date().Format('yyyy-MM-dd')" label="修改日期" disabled v-if="data[18] && data[18] != '1900-01-01 00:00:00'" />
      </van-cell-group>
      <div class="payment-button" v-if="edit && buttonValue.length > 0">
        <div class="button-value" v-for="(item,index) in buttonValue" :key="index" v-if="item.Allowvisible === '1'">
          <van-button @click="onSave" v-if="item.text === '保存'" :disabled="item.Enabled !== '1'">保存</van-button>
          <van-button type="primary" @click="onSumbit" v-if="item.text === '审核'" :disabled="item.Enabled !== '1'">审核</van-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, financial } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      edit: false,
      data: [],
      dateShow: false,
      currentDate: new Date(),
      names: [],
      image1: "",
      image2: "",
      images: [],
      businessKey: "",
      buttonValue: []
    };
  },
  methods: {
    // 显示时间选择
    showDate() {
      this.currentDate = this.data[10] || new Date();
      this.dateShow = true;
    },
    // 确认时间
    saveDate(val) {
      this.data[10] = this.$util.formatDate(val, "yyyy-MM-dd hh:mm:ss");
      this.dateShow = false;
    },
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

          const xml = require("xml");
          let xmlString = xml({
            BC_FK_Money_InOut: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_Money_InOutOID: this.data[0] }
            ]
          });
          xmlString += xml({
            BC_FK_Money_InOut: [
              { _attr: { UpdateKind: "" } },
              { SC_Money_InOutOID: "null" },
              { InOut_Date: this.data[10] },
              { InOut_Amt: this.data[9] },
              { Bank_Account: this.data[12] },
              { Bank_Name: this.data[11] },
              { Operator: this.data[13] },
              { Remark: this.data[16] },
              { Certificate1: img[0] || "null" },
              { Certificate2: img[1] || "null" },
              { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") },
              { SYS_LAST_UPD_BY: this.userInfo.oid }
            ]
          });
          xmlString = "<root>" + xmlString + "</root>";
          financial
            .saveOrder("BPO_Pay_Info_EditService", xmlString)
            .then(res => {
              if (res.status === 1) {
                this.data[14] = img[0] || this.data[14];
                this.data[15] = img[1] || this.data[15];
                this.$store.commit("taskParams", this.data);
                this.edit = true;
                this.$toast.success("保存成功");
                return;
              }
              throw res.text;
            });
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    onSumbit() {
      financial.PaymentExamine(this.data[0]).then(res => {
        if (res.status === 1) {
          this.$toast.success({
            forbidClick: true, // 禁用背景点击
            message: "审核成功"
          });
          this.$nextTick().then(() => {
            setTimeout(() => {
              this.$router.go(-1);
            }, 800);
          });
        } else {
          this.$toast.fail(res.text);
        }
      });
    },
    pageInit() {
      if (this.taskParams) {
        this.data = this.taskParams;
        this.image1 = this.taskParams[14].replace("~", this.servePath);
        this.image2 = this.taskParams[15].replace("~", this.servePath);
        if (!this.data[10] || this.data[10] == "1900-01-01 00:00:00") {
          this.data[10] = new Date().Format("yyyy-MM-dd hh:mm:ss");
        }
        if (this.userType === 1 && this.data[30] === 0) {
          this.edit = true;
        }
      }

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_SC_OAPay_Add")
        .then(res => {
          if (res.status) {
            this.buttonValue = JSON.parse(res.text);
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
.task {
  width: 100%;
  overflow: hidden !important;
  .task-data {
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    .task-title {
      font-size: 16px;
      padding: 10px;
      color: #00a0e9;
      background-color: #f7f7f7;
    }
    .payment-button {
      width: 100%;
      padding: 5px;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      .button-value {
        display: inline-block;
        button {
          width: 191.5px;
          margin: 5px;
        }
      }
    }

    .task-upload {
      padding: 15px 0;
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
    .task-date {
      width: 100%;
      position: fixed;
      z-index: 9999;
      bottom: 0;
    }
  }
}
</style>