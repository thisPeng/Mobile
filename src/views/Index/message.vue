<template>
  <div class="message">
    <van-tabs v-model="active">
      <!--未读信息-->
      <van-tab title="未读信息">
        <task-list :listData="unReadData" :currentPage="unReadPage" :pages="unReadPages" @click="onRead" @change="getUnReadData" />
      </van-tab>
      <!--已读信息-->
      <van-tab title="已读信息">
        <task-list :listData="readData" :currentPage="readPage" :pages="readPages" buttonText="删除" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import taskList from "./../../components/TaskWait/List";
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      readData: [],
      readPages: {
        RecordCount: 1,
        PageCount: 1
      },
      readPage: 1,
      readChk: [],
      unReadData: [],
      unReadPages: {
        RecordCount: 1,
        PageCount: 1
      },
      unReadPage: 1,
      unReadChk: []
    };
  },
  methods: {
    onRead() {
    },
    getUnReadData() {}
  },
  components: {
    "task-list": taskList
  },
  computed,
  mounted() {
    index.getMessage().then(res => {
      if (res) {
        const sp = res.text.split(";");
        this.unReadData = eval(sp[1].split("=")[1]);
        this.readData = eval(sp[2].split("=")[1]);
        this.unReadPages = eval("(" + sp[15].split("=")[1] + ")");
        this.ReadPages = eval("(" + sp[16].split("=")[1] + ")");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.message {
  width: 100%;
  .van-tab__pane {
    background-color: #fff;
  }
}
</style>
