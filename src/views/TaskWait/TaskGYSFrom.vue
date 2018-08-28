<template>
  <div class="taskgysFrom">
    <van-cell-group>
      <van-field v-model="item" label="供应商编号:" required disabled/>
      <van-field v-model="item" label="单位名称:" required />
      <van-field v-model="item" label="统一社会信用代码:" required />
      <van-field v-model="item" label="单位类别:" disabled/>
      <van-field v-model="item" label="纳税人类别:" disabled/>
      <van-field v-model="item" label="税率:" disabled/>
      <van-field v-model="item" label="开户行:" disabled/>
      <van-field v-model="item" label="银行账号:" disabled/>
      <van-field v-model="item" label="公司地址:" disabled/>
      <van-field v-model="item" label="可开票税率:" disabled/>
      <van-field v-model="item" label="详细地址:" disabled/>
      <van-field v-model="item" label="联系人:" disabled/>
      <van-field v-model="item" label="固定电话:" disabled/>
      <van-field v-model="item" label="手机:" disabled/>
      <van-field v-model="item" label="邮箱:" disabled/>
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
export default {
  data() {
    return {
      item: "",
      // taskTabs: {
      //   codeJson: []
      // }
    };
  },
  computed,
  // components: {
  //   taskTabs
  // },
  methods: {
    jumpPage(){
      this.$router.push({
        name:"taskgysDetails"
      })
    }
  },
  mounted() {}
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


