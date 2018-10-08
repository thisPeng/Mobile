<template>
  <div class="taskgysDetails">
    <!--工程商-->
    <div v-if="userType == 1">
      <div class="title-contract">法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[22]).replace('~','')" alt="法人身份证" @click="preView(data[22])" />
        </div>
      </div>
      <div class="title-contract">营业许可证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[19]).replace('~','')" alt="营业许可证" @click="preView(data[19])" />
        </div>
      </div>
      <div class="title-contract">开户许可证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[21]).replace('~','')" alt="开户许可证" @click="preView(data[21])" />
        </div>
      </div>
      <div class="title-contract">税种核定通知书(国)</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[20]).replace('~','')" alt="税种核定通知书(国)" @click="preView(data[20])" />
        </div>
      </div>
      <div class="title-contract">税种核定通知书(地)</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[26]).replace('~','')" alt="税种核定通知书(地)" @click="preView(data[26])" />
        </div>
      </div>
    </div>

    <!--合作商-->
    <div v-else-if="userType == 2">
      <div class="title-contract">签约单位法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[24]).replace('~','')" alt="签约单位法人身份证" @click="preView(data[24])" />
        </div>
      </div>
      <div class="title-contract">签约单位营业执照</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[25]).replace('~','')" alt="签约单位营业执照" @click="preView(data[25])" />
        </div>
      </div>
      <div class="title-contract">合作商身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[38]).replace('~','')" alt="合作商身份证" @click="preView(data[38])" />
        </div>
      </div>
    </div>

    <!--供应商-->
    <div v-else>
      <div class="title-contract">法人身份证</div>
      <div class="taskcontract">
        <div class="taskimage">
          <img :src="(servePath+data[46]).replace('~','')" alt="法人身份证" @click="preView(data[46])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">营业许可证</div>
        <div class="taskimage">
          <img :src="(servePath+data[39]).replace('~','')" alt="营业许可证" @click="preView(data[39])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">开户许可证</div>
        <div class="taskimage">
          <img :src="(servePath+data[45]).replace('~','')" alt="开户许可证" @click="preView(data[45])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">税种核定通知书(国)</div>
        <div class="taskimage">
          <img :src="(servePath+data[40]).replace('~','')" alt="税种核定通知书(国)" @click="preView(data[40])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">上月增值税完税证明</div>
        <div class="taskimage">
          <img :src="(servePath+data[50]).replace('~','')" alt="上月增值税完税证明" @click="preView(data[50])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">上季度企业所得税完税证明</div>
        <div class="taskimage">
          <img :src="(servePath+data[51]).replace('~','')" alt="上季度企业所得税完税证明" @click="preView(data[51])" />
        </div>
      </div>
      <div class="taskcontract">
        <div class="title-contract">税种核定通知书(地)</div>
        <div class="taskimage">
          <img :src="(servePath+data[43]).replace('~','')" alt="税种核定通知书(地)" @click="preView(data[43])" />
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
    preView(item) {
      ImagePreview([(this.servePath + item).replace("~", "")]);
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
  padding-bottom: 30px;
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
