<template>
  <!-- /project/payinfomationlist -->
  <div class="payinfomationlist">
    <div class="app-data">
      <div class="app-card">
        <van-cell-group class="app-item" v-for="(item,index) in list" :key="index">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">收款单位：{{item[38] || item[39]}}</span>
          </div>
          <van-cell class="item-content" is-link @click="jumpPage(item)">
            <div class="content-row">
              <span>银行账号：{{item[12]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">支付日期：{{item[10] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="danger">单据状态：{{item[6]}}</van-tag>
                <!-- <van-tag type="success" v-else-if="item[30] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[31] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
                <van-tag v-else>单据状态：关闭</van-tag> -->
              </span>
            </div>
            <div class="content-row">
              <span>支付类型：{{item[37]}}</span>
            </div>
            <div class="content-row">
              <span>支付金额：{{item[9]}}</span>
            </div>
            <div class="content-row">
              <span>申请单号：{{item[40]}}</span>
            </div>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { financial } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      curPage: 1,
      pages: {}
    };
  },
  methods: {
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      return financial
        .getPaymentInfo(this.userId.UCML_OrganizeOID, page, this.filter)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.list = eval("[[" + csp[0]);
              // console.log(this.list);
              this.pages = eval("(" + csp[1].split("=")[1] + ")");
              return true;
            }
            return false;
          } catch (e) {
            console.log(e);
            return false;
          }
        });
    },
    jumpPage(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "InfoPayment"
      });
    }
  },
  computed,
  mounted() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.payinfomationlist {
  width: 100%;
  padding: 10px;
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  .app-data {
    .app-card {
      width: 100%;
      padding-bottom: 60px;
      .app-item {
        background-color: #fff;
        padding: 2.5px 15px;
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
          padding: 2.5px 0;
          font-size: 13px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
}
</style>

