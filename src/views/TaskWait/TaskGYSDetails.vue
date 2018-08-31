<template>
  <div class="taskgysDetails">
    <div class="title-contract">法人身份证</div>
    <div class="taskcontract">
      <div class="taskimage">
        <img :src="(servePath+data[46]).replace('~','')" alt="法人身份证1" @click="preView" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">营业许可证</div>
      <div class="taskimage">
        <img :src="(servePath+data[39]).replace('~','')" alt="营业许可证1" @click="preViewtwo"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">开户许可证</div>
      <div class="taskimage">
        <img :src="(servePath+data[45]).replace('~','')" alt="开户许可证1" @click="preViewthree"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">税种核定通知书(国)</div>
      <div class="taskimage">
        <img :src="(servePath+data[40]).replace('~','')" alt="税种核定通知书(国)1" @click="preViewfour"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">上月增值税完税证明</div>
      <div class="taskimage">
        <img :src="(servePath+data[50]).replace('~','')" alt="上月增值税完税证明1" @click="preViewfive"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">上季度企业所得税完税证明</div>
      <div class="taskimage">
        <img :src="(servePath+data[51]).replace('~','')" alt="上季度企业所得税完税证明1" @click="preViewexit"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">税种核定通知书(地)</div>
      <div class="taskimage">
        <img :src="(servePath+data[43]).replace('~','')" alt="税种核定通知书(地)1" @click="preViewend"/>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { ImagePreview } from "vant";
import { task } from "./../../assets/js/api.js";
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
    }
  },
  mounted() {
    this.$parent.title = this.taskParams.name;
    task.getInquiry(this.taskParams.TaskGYSID).then(result => {
      console.log(result);
      if (result && result.status === 1) {
        // console.log(result.status)
        const sp = result.text.split(";");
        console.log(sp);
        this.data = eval(sp[0].split("=")[1])[0];
        console.log(this.data);
      }
    });
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
<style lang="less">
</style>

