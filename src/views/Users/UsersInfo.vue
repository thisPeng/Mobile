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
        <van-field :value="list[1]" label="合作商编号：" disabled />
      </van-cell-group>
      <!-- 姓名 -->
      <van-cell-group>
        <van-field :value="list[2]" label="合作商名称：" disabled />
      </van-cell-group>
      <!-- 签约单位名称 -->
      <van-cell-group>
        <van-field v-model="list[27]" label="签约单位名称：" placeholder="请输入签约单位名称" />
      </van-cell-group>
      <!-- 法定代表人 -->
      <van-cell-group>
        <van-field v-model="list[22]" label="法定代表人：" placeholder="请输入法定代表人" />
      </van-cell-group>
      <!-- 法人身份证号 -->
      <van-cell-group>
        <van-field v-model="list[26]" label="法人身份证号：" placeholder="请输入法人身份证号" />
      </van-cell-group>
      <!-- 法人电话 -->
      <van-cell-group>
        <van-field v-model="list[10]" label="法人电话：" placeholder="请输入法人电话" />
      </van-cell-group>
      <!-- 联系人姓名 -->
      <van-cell-group>
        <van-field v-model="list[8]" label="联系人姓名：" placeholder="请输入联系人姓名" />
      </van-cell-group>
      <!-- 联系人电话 -->
      <van-cell-group>
        <van-field v-model="list[11]" label="联系人电话：" placeholder="请输入联系人电话" />
      </van-cell-group>
      <!-- 联系人邮箱 -->
      <van-cell-group>
        <van-field v-model="list[12]" label="联系人邮箱：" placeholder="请输入联系人邮箱" />
      </van-cell-group>

      <!-- 状态 -->
      <van-cell-group>
        <van-field :value="list[7] | supplierStatus" label="状态：" disabled />
      </van-cell-group>
      <!-- 公司地址 -->
      <cbh-region :prov="list[30]" :city="list[31]" :district="list[32]" @change="onRegionChange" v-if="list.length>0" />
      <!-- 地址 -->
      <van-cell-group>
        <van-field v-model="list[9]" label="地址：" placeholder="请输入地址" />
      </van-cell-group>
      <!-- 备注 -->
      <van-cell-group>
        <van-field v-model="list[13]" label="备注：" placeholder="请输入备注" />
      </van-cell-group>
      <van-cell-group>
        <div class="task-title">
          <span>用户信息</span>
        </div>
        <van-swipe class="task-img" :loop="true">
          <van-swipe-item>
            <img class="img" :src="(servePath+list[26]).replace('~','')" alt="签约单位法人身份证" @click="preView">
          </van-swipe-item>
          <van-swipe-item>
            <img class="img" :src="(servePath+list[25]).replace('~','')" alt="签约单位营业执照" @click="preView">
          </van-swipe-item>
          <van-swipe-item>
            <img class="img" :src="(servePath+list[24]).replace('~','')" alt="合作商身份证照" @click="preView">
          </van-swipe-item>
        </van-swipe>
      </van-cell-group>
      <van-cell-group v-if="userType === 2">
        <van-cell class="padding-vertical" title="供应商" is-link value="附件" @click="jumpPage('supplierAnnex')" />
        <!-- <van-cell title="合作商" is-link value="附件" @click="jumpPage('supplierAnnex')" v-else /> -->
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
import areaList from "./../../assets/js/area.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      list: [],
      areaList
    };
  },
  methods: {
    onRegionChange(res) {
      this.list[30] = res.prov;
      this.list[32] = res.city;
      this.list[32] = res.district;
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Partner: [
              { _attr: { UpdateKind: "ukModify" } },
              { SC_PartnerOID: this.userId.UCML_OrganizeOID }
            ]
          },
          {
            BC_SC_Partner: [
              { _attr: { UpdateKind: "" } },
              { SC_PartnerOID: "null" },
              { Second_Name: this.list[27] || "null" }, //签约单位名称
              { Representative: this.list[22] || "null" }, //法定代表人
              { IdCard_NO: this.list[26] || "null" }, //法人身份证
              { Telephone: this.list[10] || "null" }, //法人电话
              { Contacts: this.list[8] || "null" }, //联系人姓名
              { Mobilehone: this.list[11] || "null" }, //联系人电话
              { Mailbox: this.list[12] || "null" }, //联系人邮箱
              { Address: this.list[9] || "null" }, //地址
              { Remark: this.list[13] || "null" }, //备注
              { prov_ID: this.list[30] || "null" }, //省ID
              { district_ID: this.list[31] || "null" }, //市ID
              { city_ID: this.list[32] || "null" }, //区ID
              { ProvincesName: this.list[33] || "null" }, //省名
              { DistrictName: this.list[34] || "null" }, //市名
              { CityName: this.list[35] || "null" } //区名
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
      users.getUserInfo(this.userId.UCML_OrganizeOID).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0])[0];
          console.log(this.list);
        }
      });
    },
    preView() {
      ImagePreview([
        (this.servePath + this.list[26]).replace("~", ""),
        (this.servePath + this.list[25]).replace("~", ""),
        (this.servePath + this.list[24]).replace("~", "")
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


