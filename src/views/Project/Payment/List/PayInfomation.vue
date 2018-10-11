<template>
  <!-- 支付信息 -->
  <div class="payinfomation">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">银行账号：{{item[12]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">支付日期：{{item[10] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="success" v-if="item[6] === '1'">单据状态：{{item[6] | payStatus}}</van-tag>
                <van-tag type="danger" v-else>单据状态：{{item[6] | payStatus}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>申请单号：{{item[40]}}</span>
            </div>
            <div class="content-row">
              <span>支付金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>支付类型：{{item[37] | paytypeStatus}}</span>
            </div>
            <div class="content-row">
              <span>收款单位：{{item[38]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { financial } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      curPage: 1,
      pages: {}
    };
  },
  computed,
  methods: {
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      financial
        .getPaymentInfo(this.projectInfo.SC_ProjectOID, page)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.list = eval("[[" + csp[0]);
              this.pages = eval("(" + csp[1].split("=")[1] + ")");
            }
          } catch (e) {
            console.log(e);
          }
        });
    },
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.$parent.active = 2;
      this.pageInit();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.payinfomation {
  width: 100%;
  padding: 10px;
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  .pre-data {
    margin-bottom: 40px;
    .pre-card {
      width: 100%;
      .pre-item {
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


