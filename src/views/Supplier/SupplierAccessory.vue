<template>
  <div class="taskgysDetails">
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
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { supplier } from "./../../assets/js/api.js";
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
    preView(path = "") {
      ImagePreview([(this.servePath + path).replace("~", "")]);
    },
    getData() {
      supplier
        .getSuppInfo(this.projectInfo.DemandID, this.suppParams[0])
        .then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split("]]");
            this.data = eval("[[" + csp[0] + "]]")[0];
          }
        });
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
