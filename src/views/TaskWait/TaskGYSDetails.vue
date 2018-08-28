<template>
  <div class="taskgysDetails">
    <div class="title-contract">法人身份证</div>
    <div class="taskcontract">
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="法人身份证1" @click="preView" />
        <img src="img/ms_ico1.png" alt="法人身份证2" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">营业许可证</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="营业许可证1"/>
        <img src="img/ms_ico1.png" alt="营业许可证2"/>
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">开户许可证</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="开户许可证1" />
        <img src="img/ms_ico1.png" alt="开户许可证2" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">税种核定通知书(国)</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="税种核定通知书(国)1" />
        <img src="img/ms_ico1.png" alt="税种核定通知书(国)2" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">上月增值税完税证明</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="上月增值税完税证明1" />
        <img src="img/ms_ico1.png" alt="上月增值税完税证明2" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">上季度企业所得税完税证明</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="上季度企业所得税完税证明1" />
        <img src="img/ms_ico1.png" alt="上季度企业所得税完税证明2" />
      </div>
    </div>
    <div class="taskcontract">
      <div class="title-contract">税种核定通知书(地)</div>
      <div class="taskimage">
        <img src="img/ms_ico1.png" alt="税种核定通知书(地)1" />
        <img src="img/ms_ico1.png" alt="税种核定通知书(地)2"/>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { ImagePreview } from "vant";
export default {
  data() {
    return {};
  },
  computed,
  methods: {
    //图片预览
    preView() {
      ImagePreview(["img/ms_ico1.png"]);
    }
  },
  mounted() {}
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
    justify-content: space-between;
    img {
      width: 45%;
      height: 100%;
    }
  }
}
</style>
<style lang="less">
</style>

