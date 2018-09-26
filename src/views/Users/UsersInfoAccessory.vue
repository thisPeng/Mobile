<template>
  <div class="taskgysDetails">
    <div class="title" v-if="userType == 2">
      <div class="title-contract">签约单位法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[24]).replace('~','')" alt="签约单位法人身份证" @click="preViewInfo" />
        </div>
      </div>
      <div class="title-contract">签约单位营业执照</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[25]).replace('~','')" alt="签约单位营业执照" @click="preViewInfotwo" />
        </div>
      </div>
      <div class="title-contract">合作商身份证照</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[38]).replace('~','')" alt="合作商身份证照" @click="preViewInfothree" />
        </div>
      </div>
    </div>
    <div class="title" v-else-if="userType == 1">
      <div class="title-contract">法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[22]).replace('~','')" alt="法人身份证" @click="preViewcomone" />
        </div>
      </div>
      <div class="title-contract">营业许可证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[19]).replace('~','')" alt="营业许可证" @click="preViewcomtwo" />
        </div>
      </div>
      <div class="title-contract">开户许可证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[21]).replace('~','')" alt="开户许可证" @click="preViewcomthree" />
        </div>
      </div>
      <div class="title-contract">税种核定通知书(国)</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[20]).replace('~','')" alt="税种核定通知书(国)" @click="preViewcomfour" />
        </div>
      </div>
      <div class="title-contract">税种核定通知书(地)</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[26]).replace('~','')" alt="税种核定通知书(地)" @click="preViewcomfive" />
        </div>
      </div>
    </div>
    <div class="contract" v-else>
      <div class="title-contract">法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[46]).replace('~','')" alt="法人身份证" @click="preView" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">营业许可证</div>
        <div class="taskimage">
          <img :src="(servePath+data[39]).replace('~','')" alt="营业许可证" @click="preViewtwo" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">开户许可证</div>
        <div class="taskimage">
          <img :src="(servePath+data[45]).replace('~','')" alt="开户许可证" @click="preViewthree" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">税种核定通知书(国)</div>
        <div class="taskimage">
          <img :src="(servePath+data[40]).replace('~','')" alt="税种核定通知书(国)" @click="preViewfour" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">上月增值税完税证明</div>
        <div class="taskimage">
          <img :src="(servePath+data[50]).replace('~','')" alt="上月增值税完税证明" @click="preViewfive" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">上季度企业所得税完税证明</div>
        <div class="taskimage">
          <img :src="(servePath+data[51]).replace('~','')" alt="上季度企业所得税完税证明" @click="preViewexit" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">税种核定通知书(地)</div>
        <div class="taskimage">
          <img :src="(servePath+data[43]).replace('~','')" alt="税种核定通知书(地)" @click="preViewend" />
        </div>
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
  computed,
  methods: {
    //图片预览
    preView() {
      ImagePreview([(this.servePath + this.data[46]).replace("~", "")]);
    },
    preViewtwo() {
      ImagePreview([(this.servePath + this.data[39]).replace("~", "")]);
    },
    preViewthree() {
      ImagePreview([(this.servePath + this.data[45]).replace("~", "")]);
    },
    preViewfour() {
      ImagePreview([(this.servePath + this.data[40]).replace("~", "")]);
    },
    preViewfive() {
      ImagePreview([(this.servePath + this.data[50]).replace("~", "")]);
    },
    preViewexit() {
      ImagePreview([(this.servePath + this.data[51]).replace("~", "")]);
    },
    preViewend() {
      ImagePreview([(this.servePath + this.data[43]).replace("~", "")]);
    },
    preViewInfo() {
      ImagePreview([(this.servePath + this.data[24]).replace("~", "")]);
    },
    preViewInfotwo() {
      ImagePreview([(this.servePath + this.data[24]).replace("~", "")]);
    },
    preViewInfothree() {
      ImagePreview([(this.servePath + this.data[25]).replace("~", "")]);
    },
    preViewcomone() {
      ImagePreview([(this.servePath + this.data[22]).replace("~", "")]);
    },
    preViewcomtwo() {
      ImagePreview([(this.servePath + this.data[19]).replace("~", "")]);
    },
    preViewcomthree() {
      ImagePreview([(this.servePath + this.data[21]).replace("~", "")]);
    },
    preViewcomfour() {
      ImagePreview([(this.servePath + this.data[20]).replace("~", "")]);
    },
    preViewcomfive() {
      ImagePreview([(this.servePath + this.data[26]).replace("~", "")]);
    },
    getData() {
      if (this.userType == 1) {
        //工程商
        users.getCompanyUserInfo(this.userId.UCML_OrganizeOID).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.data = eval("[[" + csp[0])[0];
          }
        });
      } else if (this.userType == 2) {
        //合作商
        users.getUserInfo(this.userId.UCML_OrganizeOID).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.data = eval("[[" + csp[0])[0];
            // console.log(this.data);
          }
        });
      } else {
        //供应商
        users.getSupplierUserInfo(this.userId.UCML_OrganizeOID).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split("]]");
            this.data = eval("[[" + csp[0] + "]]")[0];
            // console.log(this.data);
          }
        });
      }
    }
  },
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.taskgysDetails {
  width: 100%;
  .title-contract {
    font-size: 16px;
    padding: 10px;
    color: #00a0e9;
    background-color: #f7f7f7;
  }
  .taskimage {
    display: flex;
    justify-content: center;
    img {
      width: 80%;
      height: 100%;
    }
  }
}
</style>
