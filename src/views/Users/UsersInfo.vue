<template>
  <div class="usersinfo">
    <div class="mui-head">
      <div class="mui-head-img">
        <img src="../../../public/img/ms_ico5.png" alt="" />
      </div>
      <div class="mui-name">{{userInfo.name}}</div>
    </div>
    <div class="info-users">
      <van-cell-group>
        <!-- 合作商编号 -->
        <van-field :value="data[1]" label="合作商编号：" disabled />

        <!-- 姓名 -->
        <van-field :value="data[2]" label="合作商名称：" disabled />

        <!-- 状态 -->
        <van-field :value="data[7] | supplierStatus" label="状态：" disabled />

        <!-- 签约单位名称 -->
        <van-field v-model="data[27]" label="签约单位名称：" placeholder="请输入签约单位名称" :disabled="buttonValue.disabled" />

        <!-- 法定代表人 -->
        <van-field v-model="data[22]" label="法定代表人：" placeholder="请输入法定代表人" :disabled="buttonValue.disabled" />

        <!-- 法人身份证号 -->
        <van-field v-model="data[26]" label="法人身份证号：" placeholder="请输入法人身份证号" :disabled="buttonValue.disabled" />

        <!-- 法人电话 -->
        <van-field v-model="data[10]" label="法人电话：" placeholder="请输入法人电话" :disabled="buttonValue.disabled" />

        <!-- 联系人姓名 -->
        <van-field v-model="data[8]" label="联系人姓名：" placeholder="请输入联系人姓名" :disabled="buttonValue.disabled" />

        <!-- 联系人电话 -->
        <van-field v-model="data[11]" label="联系人电话：" placeholder="请输入联系人电话" :disabled="buttonValue.disabled" />

        <!-- 联系人邮箱 -->
        <van-field v-model="data[12]" label="联系人邮箱：" placeholder="请输入联系人邮箱" :disabled="buttonValue.disabled" />

        <!-- 公司地址 -->
        <cbh-region :prov="data[30]" :city="data[31]" :district="data[32]" @change="onRegionChange" v-if="data.length>0" :disabled="buttonValue.disabled" />

        <!-- 地址 -->
        <van-field v-model="data[9]" label="地址：" placeholder="请输入地址" :disabled="buttonValue.disabled" />

        <!-- 备注 -->
        <van-field v-model="data[13]" label="备注：" placeholder="请输入备注" :disabled="buttonValue.disabled" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="证照资料" is-link value="" @click="jumpPage('usersInfoAccessory')" />
        <van-cell title="附件" is-link value="" @click="jumpPage('partnerAnnex')" />
      </van-cell-group>
      <div class="users-button" v-if="buttonValue.show">
        <van-button type="primary" size="large" @click="saveMessage" :disabled="buttonValue.disabled">保 存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users, index } from "./../../assets/js/api.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      data: [],
      buttonValue: {
        show: false,
        disabled: true
      }
    };
  },
  methods: {
    onRegionChange(res) {
      this.data[30] = res.prov;
      this.data[31] = res.city;
      this.data[32] = res.district;
      this.data[33] = res.provStr;
      this.data[34] = res.cityStr;
      this.data[35] = res.districtStr;
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Partner: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_PartnerOID: this.data[0] }
            ]
          },
          {
            BC_SC_Partner: [
              { _attr: { UpdateKind: "" } },
              { SC_PartnerOID: "null" },
              { Second_Name: this.data[27] || "null" }, //签约单位名称
              { Representative: this.data[22] || "null" }, //法定代表人
              { IdCard_NO: this.data[26] || "null" }, //法人身份证
              { Telephone: this.data[10] || "null" }, //法人电话
              { Contacts: this.data[8] || "null" }, //联系人姓名
              { Mobilehone: this.data[11] || "null" }, //联系人电话
              { Mailbox: this.data[12] || "null" }, //联系人邮箱
              { Address: this.data[9] || "null" }, //地址
              { Remark: this.data[13] || "null" }, //备注
              { prov_ID: this.data[30] || "null" }, //省ID
              { district_ID: this.data[31] || "null" }, //市ID
              { city_ID: this.data[32] || "null" }, //区ID
              { ProvincesName: this.data[33] || "null" }, //省名
              { DistrictName: this.data[34] || "null" }, //市名
              { CityName: this.data[35] || "null" } //区名
            ]
          }
        ]
      });

      users.saveMessage(xmlString).then(res => {
        try {
          if (res.status === 1) {
            this.$toast.success("保存成功");
            return;
          }
          throw "保存失败，请刷新页面重试";
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    //获取用户信息
    pageInit() {
      //合作商
      users.getUserInfo(this.userId.UCML_OrganizeOID).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.data = eval("[[" + csp[0])[0];
        }
      });

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_SC_Partner_Edit")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.Allowvisible === "1" && val.text === "保存并关闭") {
                this.buttonValue.show = true;
                this.buttonValue.disabled = val.Enabled !== "1";
              }
            });
          }
        });
    },
    preView() {
      ImagePreview([
        (this.servePath + this.data[26]).replace("~", ""),
        (this.servePath + this.data[25]).replace("~", ""),
        (this.servePath + this.data[24]).replace("~", "")
      ]);
    },
    jumpPage(name) {
      this.$router.push({
        name
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
.usersinfo {
  width: 100%;
  .mui-head {
    height: 200px;
    background-image: url("../../../public/img/topbar.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mui-head .mui-head-img {
    display: block;
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
    border-radius: 80px;
    box-shadow: 0px 0px 3px #999;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  .info-users {
    .info-sex {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .sex-label {
        min-width: 90px;
        flex: 1;
      }
      .sex-select {
        flex: 4;
      }
    }
    .info-gaddress {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .gaddress-label {
        min-width: 90px;
        flex: 1;
      }
      .gaddress-select {
        flex: 5;
      }
    }
  }
  .users-button {
    padding: 10px;
    text-align: center;
  }
  .pwd-icon {
    margin-right: 10px;
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
}
</style>
<style lang="less">
.usersinfo {
  .van-cell__title {
    max-width: 110px !important;
  }
}
</style>


