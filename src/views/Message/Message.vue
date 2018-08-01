<template>
  <div class="message">
    <van-tabs v-model="active">
      <!--未读信息-->
      <van-tab title="未读信息">
        <task-list :listData="unReadData" :currentPage="1" :pages="unReadPages" @click="onRead" @change="getUnReadData" @select="selectItem" />
      </van-tab>
      <!--已读信息-->
      <van-tab title="已读信息">
        <task-list :listData="readData" :currentPage="1" :pages="readPages" buttonText="删除" @click="onDelete" @change="getReadData" @select="selectItem" />
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
      readChk: [],
      unReadData: [],
      unReadPages: {
        RecordCount: 1,
        PageCount: 1
      },
      unReadChk: [],
      selItem: ""
    };
  },
  methods: {
    // 标记已读
    onRead() {
      index.markRead(this.selItem).then(res => {
        if (res && res.status === 1) {
          this.getUnReadData();
          this.$toast("已标记");
        }
      });
    },
    // 获取未读消息
    getUnReadData(page) {
      page = page > 1 ? page - 1 : 0;
      index.getUnReadMsg(page).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          this.unReadData = eval(sp[0].split("=")[1]);
          this.unReadPages = eval("(" + sp[1].split("=")[1] + ")");
        } else {
          this.$toast(res.text);
        }
      });
    },
    // 删除消息
    onDelete() {
      index.deleteMsg(this.selItem).then(res => {
        if (res && res.status === 1) {
          this.getReadData();
          this.$toast("已删除");
        }
      });
    },
    // 获取已读消息
    getReadData(page) {
      page = page > 1 ? page - 1 : 0;
      index.getReadMsg(page).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split(";");
          this.readData = eval(sp[0].split("=")[1]);
          this.readPages = eval("(" + sp[1].split("=")[1] + ")");
        } else {
          this.$toast(res.text);
        }
      });
    },
    // 选中项
    selectItem(item) {
      let str = "";
      item.forEach(val => {
        str += val + ",";
      });
      this.selItem = str.substr(0, str.length - 1);
    }
  },
  components: {
    "task-list": taskList
  },
  computed,
  mounted() {
    // 初始化获取数据
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
