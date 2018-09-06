<template>
  <!-- 合同信息 -->
  <div class="trancontract">
    <div class="tran-data">
      <div class="tran-card">
        <div class="tran-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <!--  @click="jumpPage('pricedetails')" -->
          <div class="item-title">
            <span class="title">{{item[11]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">{{item[15]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[13]}}</span>
              <span class="row-right">{{item[20]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[16]}}</span>
              <span class="row-left">{{item[14]}}</span>
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
    getData() {
      const params = {
        pid: this.clientInfo[0],
        sid: this.userInfo.oid
      };
      offer.getContract(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          //  console.log(csp);
          this.list = eval("[[" + csp[0]);
          //  console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    },
    jumpPage(item) {
      this.$store.commit("confirmParams", item);
      this.$router.push({
        name: "inventory"
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.trancontract {
  width: 100%;
  padding: 10px;
  .tran-data {
    margin-bottom: 40px;
    .tran-card {
      width: 100%;
      .tran-item {
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
