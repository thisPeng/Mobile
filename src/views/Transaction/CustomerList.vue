<template>
  <div class="customerlist">
    <div class="customerlist-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
      <div class="customerlist-title">
        <span class="title">{{item[2]}}</span>
        <span class="icon">
          <van-icon name="success" color="#00A0E9" v-if="item[0] === clientInfo[0]" />
        </span>
      </div>
      <div class="customerlist-content">
        <span class="content-left">电话：{{item[6]}}{{item[5] ? '('+item[5]+')' : ''}}</span>
        <span class="content-right">地址：{{item[7]}}</span>
      </div>
      <div class="customerlist-content">
        <span class="content-left">描述：{{item[3]}}</span>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { offer } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: ""
    };
  },
  computed,
  methods: {
    pageInit() {
      offer.getClientList(this.userInfo.oid).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            this.list = eval(sp[0].split("=")[1]);
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    jumpPage(item) {
      this.$store.commit("clientInfo", item);
      this.$store.commit("isReload", true);
      this.$router.go(-1);
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.customerlist {
  width: 100%;
  .customerlist-item {
    background-color: #fff;
    padding: 10px 15px;
    border-bottom: 1px solid #eee;
    border-radius: 5px;
    margin: 10px 0;
    .customerlist-title {
      padding: 10px 0;
      border-bottom: 1px solid #f6f6f6;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .title {
        font-weight: 600;
        font-size: 16px;
      }
      .icon {
        font-size: 14px;
      }
    }
    .customerlist-content {
      padding: 10px 0;
      font-size: 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #666;
    }
  }
}
</style>
