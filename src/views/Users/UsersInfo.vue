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
        <van-field :value="userInfo.parterid" label="合作商编号" disabled />
      </van-cell-group>
      <!-- 姓名 -->
      <van-cell-group>
        <van-field :value="userInfo.loginid" label="合作商名称" disabled />
      </van-cell-group>
      <!-- 性别 -->
      <van-cell-group class="info-sex">
        <span class="sex-label">性别</span>
        <span class="sex-select" @click="sexShow=true">{{userInfo.sex || '请选择性别'}}</span>
        <van-popup v-model="sexShow" position="bottom">
          <van-picker show-toolbar title="请选择" :columns="columns" @cancel="sexShow=false" @confirm="onConfirm" />
        </van-popup>
      </van-cell-group>
      <!-- 签约单位名称 -->
      <van-cell-group>
        <van-field v-model="userInfo.nowparner" label="签约单位名称" required placeholder="请输入签约单位名称" />
      </van-cell-group>
      <!-- 法定代表人 -->
      <van-cell-group>
        <van-field v-model="userInfo.represent" label="法定代表人" required placeholder="请输入法定代表人" />
      </van-cell-group>
      <!-- 法人身份证号 -->
      <van-cell-group>
        <van-field v-model="userInfo.facard" label="法人身份证号" required placeholder="请输入法人身份证号" />
      </van-cell-group>
      <!-- 法人电话 -->
      <van-cell-group>
        <van-field v-model="userInfo.worktelno" label="法人电话" required placeholder="请输入法人电话" />
      </van-cell-group>
      <!-- 联系人姓名 -->
      <van-cell-group>
        <van-field v-model="userInfo.lxname" label="联系人姓名" placeholder="请输入联系人姓名" required />
      </van-cell-group>
      <!-- 联系人电话 -->
      <van-cell-group>
        <van-field v-model="userInfo.telno" label="联系人电话" placeholder="请输入联系人电话" required />
      </van-cell-group>
      <!-- 联系人邮箱 -->
      <van-cell-group>
        <van-field v-model="userInfo.email" label="联系人邮箱" required placeholder="请输入联系人邮箱" />
      </van-cell-group>

      <!-- 状态 -->
      <van-cell-group class="info-type">
        <span class="type-label">状态</span>
        <span class="type-select" @click="typeShow=true">{{userInfo.type || '请选择状态'}}</span>
        <van-popup v-model="typeShow" position="bottom">
          <van-picker show-toolbar title="请选择" :columns="types" @cancel="typeShow=false" @confirm="Confirm" />
        </van-popup>
      </van-cell-group>
      <!-- 公司地址 -->
      <van-cell-group class="info-gaddress">
        <span class="gaddress-label">公司地址</span>
        <span class="gaddress-select" @click="gaddressShow=true">{{userInfo.gaddress || '请选择公司地址'}}</span>
        <van-popup v-model="gaddressShow" position="bottom">
          <van-area :area-list="areaList" @cancel="gaddressShow=false" @confirm="gaConfirm" />
        </van-popup>
      </van-cell-group>
      <!-- 地址 -->
      <van-cell-group>
        <van-field v-model="userInfo.address" label="地址" required placeholder="请输入地址" />
      </van-cell-group>
      <!-- 备注 -->
      <van-cell-group>
        <van-field v-model="userInfo.remarks" label="备注" required placeholder="请输入备注" />
      </van-cell-group>
      <van-cell-group>
        <van-cell title="供应商" is-link value="附件" @click="jumpPage('supplierAnnex')" v-if="userType === 2" />
      </van-cell-group>
      <div class="pwd-button" @click="saveMessage">
        <van-button size="normal">
          <span class="pwd-icon">
            <van-icon name="success" />
          </span>保存</van-button>
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
      sexShow: false,
      columns: ["男", "女"],
      typeShow: false,
      types: ["已补充资料", "不通过", "未审核", "终审通过", "初审通过"],
      gaddressShow: false,
      areaList
    };
  },
  methods: {
    onConfirm(res) {
      const info = this.userInfo;
      info.sex = res;
      this.$store.commit("userInfo", info);
      this.sexShow = false;
    },
    Confirm(res) {
      const info = this.userInfo;
      info.type = res;
      this.$store.commit("userInfo", info);
      this.typeShow = false;
    },
    gaConfirm(res) {
      const info = this.userInfo;
      let str = "";
      res.forEach(val => {
        str += val.name + " ";
      });
      info.gaddress = str;
      this.$store.commit("userInfo", info);
      this.gaddressShow = false;
    },
    saveInfo() {
      const params = {
        sex: this.userInfo.sex,
        telno: this.userInfo.telno,
        email: this.userInfo.email,
        worktelno: this.userInfo.worktelno
      };
      users.saveInfo(params).then(res => {
        console.log(res);
        if (res) {
          this.$store.commit("userInfo", this.userInfo);
          this.$toast.success("保存成功");
        }
      });
    },
    //保存
    saveMessage() {
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Partner: [
              {
                _attr: {
                  UpdateKind: "ukModify"
                }
              },
              {
                SC_PartnerOID: this.userId.UCML_OrganizeOID
              }
            ]
          },
          {
            BC_SC_Partner: [
              {
                _attr: {
                  UpdateKind: ""
                }
              },
              {
                SC_PartnerOID: "null"
              },
              {
                Second_Name: this.userInfo.nowparner //签约单位名称
              },
              {
                Representative: this.userInfo.represent //法定代表人
              },
              {
                IdCard_NO: this.userInfo.facard //法人身份证
              },
              {
                Telephone: this.userInfo.worktelno //法人电话
              },
              {
                Contacts:this.userInfo.lxname//联系人姓名
              },
              {
                Mobilehone:this.userInfo.telno//联系人电话
              },
              {
                Mailbox:this.userInfo.email//联系人邮箱
              },
              // {
              //   WorkStatus:this.userInfo.type//状态
              // },
              // {
              //   //公司地址
              // },
               {
                Address:this.userInfo.address//公司地址
              },
               {
                Remark:this.userInfo.remarks//备注
              }
            ]
          }
        ]
      });
      console.log(xmlString);
       this.$dialog
        .confirm({
          title: "保存",
          message: "确认保存该询价单？"
        })
        .then(() => {
          users.saveMessage(xmlString).then(res => {
            console.log(res);
            try {
              if (res.status === 1) {
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("保存成功");
                  }, 300);
                });
                return;
              }
              throw "保存失败，请刷新页面重试";
            } catch (e) {
              this.$toast.fail(e);
            }
          });
        });
    },
    //获取用户信息
    getData(){
      users.getUserInfo(this.userId.UCML_OrganizeOID).then(res =>{
        console.log(res);
      })
    },
    preView() {
      ImagePreview([
        (this.servePath + this.data).replace("~", ""),
        (this.servePath + this.data).replace("~", "")
      ]);
    },
    jumpPage(name) {
      this.$router.push({
        name
      });
    }
  },
  computed,
  mounted(){
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
    .info-type {
      display: flex;
      padding: 10px 15px;
      box-sizing: border-box;
      line-height: 24px;
      position: relative;
      background-color: #fff;
      color: #333;
      font-size: 14px;
      overflow: hidden;
      .type-label {
        min-width: 90px;
        flex: 1;
      }
      .type-select {
        flex: 5;
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
    padding-top: 10px;
    text-align: center;
    button {
      color: #fff;
      background-color: #3d95d5;
    }
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


