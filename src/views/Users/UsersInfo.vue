<template>
  <div class="usersinfo">
    <div class="mui-head">
      <!-- <img class="info-img" src="../../../public/img/topbar.jpg" alt=""> -->
      <img src="../../../public/img/ms_ico5.png" alt="" />
      <div id="nName" class="mui-name">{{userInfo.name}}</div>
    </div>
    <div class="info-users">
      <!-- 合作商编号 -->
      <van-cell-group>
        <van-field :value="data[1]" label="合作商编号：" disabled />
      </van-cell-group>
      <!-- 姓名 -->
      <van-cell-group>
        <van-field :value="data[2]" label="合作商名称：" disabled />
      </van-cell-group>
      <!-- 签约单位名称 -->
      <van-cell-group>
        <van-field v-model="data[27]" label="签约单位名称：" placeholder="请输入签约单位名称" />
      </van-cell-group>
      <!-- 法定代表人 -->
      <van-cell-group>
        <van-field v-model="data[22]" label="法定代表人：" placeholder="请输入法定代表人" />
      </van-cell-group>
      <!-- 法人身份证号 -->
      <van-cell-group>
        <van-field v-model="data[26]" label="法人身份证号：" placeholder="请输入法人身份证号" />
      </van-cell-group>
      <!-- 法人电话 -->
      <van-cell-group>
        <van-field v-model="data[10]" label="法人电话：" placeholder="请输入法人电话" />
      </van-cell-group>
      <!-- 联系人姓名 -->
      <van-cell-group>
        <van-field v-model="data[8]" label="联系人姓名：" placeholder="请输入联系人姓名" />
      </van-cell-group>
      <!-- 联系人电话 -->
      <van-cell-group>
        <van-field v-model="data[11]" label="联系人电话：" placeholder="请输入联系人电话" />
      </van-cell-group>
      <!-- 联系人邮箱 -->
      <van-cell-group>
        <van-field v-model="data[12]" label="联系人邮箱：" placeholder="请输入联系人邮箱" />
      </van-cell-group>

      <!-- 状态 -->
      <van-cell-group>
        <van-field :value="data[7] | supplierStatus" label="状态：" disabled />
      </van-cell-group>
      <!-- 公司地址 -->
      <cbh-region :prov="data[30]" :city="data[31]" :district="data[32]" @change="onRegionChange" v-if="data.length>0" />
      <!-- 地址 -->
      <van-cell-group>
        <van-field v-model="data[9]" label="地址：" placeholder="请输入地址" />
      </van-cell-group>
      <!-- 备注 -->
      <van-cell-group>
        <van-field v-model="data[13]" label="备注：" placeholder="请输入备注" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="证照资料" is-link value="" @click="jumpPage('usersInfoAccessory')" />
        <van-cell title="附件" is-link value="" @click="jumpPage('partnerAnnex')" />
      </van-cell-group>
      <div class="pwd-button" @click="saveMessage">
        <van-button type="primary" size="large">保 存</van-button>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      data: []
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
      // console.log(xmlString);
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
    getData() {
      //合作商
      users.getUserInfo(this.userId.UCML_OrganizeOID).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.data = eval("[[" + csp[0])[0];
          // console.log(this.data);
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
    this.getData();
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
    background-size: 100% 50%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .mui-head img {
    display: block;
    margin-bottom: 10px;
    width: 100px;
    height: 100px;
    border-radius: 80px;
    -moz-box-shadow: 0px 0px 3px #999;
    -webkit-box-shadow: 0px 0px 3px #999;
    box-shadow: 0px 0px 3px #999;
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
  .pwd-button {
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


