<template>
  <div class="taskgysFrom">
    <van-cell-group>
      <van-field v-model="data[35]" label="供应商编号:"  disabled/>
      <van-field v-model="data[22]" label="单位名称:"  disabled/>
      <van-field v-model="data[24]" label="统一社会信用代码:"  disabled/>
      <van-field v-model="data[22]" label="单位类别:" disabled/>
      <van-field v-model="data[22]" label="纳税人类别:" disabled/>
      <van-field v-model="data[27]" label="税率:" disabled/>
      <van-field v-model="data[28]" label="开户行:" disabled/>
      <van-field v-model="data[29]" label="银行账号:" disabled/>
      <van-field v-model="data[22]" label="公司地址:" disabled/>
      <van-field v-model="data[22]" label="可开票税率:" disabled/>
      <van-field v-model="data[30]" label="详细地址:" disabled/>
      <van-field v-model="data[31]" label="联系人:" disabled/>
      <van-field v-model="data[32]" label="固定电话:" disabled/>
      <van-field v-model="data[33]" label="手机:" disabled/>
      <van-field v-model="data[34]" label="邮箱:" disabled/>
      <van-cell title="附件" is-link value="详情" @click="jumpPage" />
    </van-cell-group>
    <!-- <van-cell-group v-if="taskTabs.codeJson">
      <taskTabs :data="taskTabs" />
    </van-cell-group> -->
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
// import taskTabs from "./../../components/TaskWait/Tabs";
import { task } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      // item: ""
      // taskTabs: {
      //   codeJson: []
      // }
      data:[]
    };
  },
  computed,
  // components: {
  //   taskTabs
  // },
  methods: {
    jumpPage() {
      this.$router.push({
        name: "taskgysDetails"
      });
    }
  },
  mounted() {
    this.$parent.title = this.taskParams.name;
    task.getInquiry(this.taskParams.TaskGYSID).then(result => {
      console.log(result);
      if(result && result.status ===1){
        // console.log(result.status)
        const sp = result.text.split(";");
        console.log(sp);
        this.data = eval(sp[0].split("=")[1])[0];
        console.log(this.data)
      }
    });
  }
};
</script>
<style lang="less" scoped>
.taskgysFrom {
  width: 100%;
}
</style>
<style lang="less">
.taskgysFrom {
  .van-field .van-cell__title {
    max-width: 120px;
  }
}
</style>


