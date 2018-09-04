<template>
  <!-- 报价单 -->
  <div class="quotation">
    <div class="quo-data">
      <div class="quo-card">
        <div class="quo-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <!--  -->
          <div class="item-title">
            <span class="title">{{item[9]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">{{item[14]}}</span>
              <span class="row-right">{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[11]}}</span>
              <span class="row-right">{{item[12]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[15]}}</span>
              <span class="row-left">{{item[16]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  computed,
  methods: {
    getClient() {
      const params = {
        pid: this.clientInfo[0],
        sid: this.userInfo.oid
      };
      offer.getPriceList(params).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          // console.log(sp);
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "tranrial"
      });
    }
  },
  mounted() {
    this.getClient();
  }
};
</script>
<style lang="less" scoped>
.quotation {
  width: 100%;
  padding: 10px;
  .quo-data {
    margin-bottom: 40px;
    .quo-card {
      width: 100%;
      .quo-item {
        background-color: #fff;
        padding: 10px 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
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
        .item-content {
          padding: 5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
        }
      }
    }
  }
}
</style>

