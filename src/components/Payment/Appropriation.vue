<template>
  <!-- 批款信息 -->
  <div class="appropriation">
    <div class="app-data">
      <div class="app-card">
        <div class="app-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">单号:{{item[1]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">到款金额:{{item[34]}}</span>
              <span class="row-right">批款金额:{{item[9]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">批款日期:{{item[10]}}</span>
              <span class="row-right">单据状态:{{$util.orderState(item[6])}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">收款账号:{{item[12]}}</span>
              <span class="row-right">经手人:{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span>备注:{{item[16]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="currentPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { arrival } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      pages: {}
    };
  },
  computed,
  methods: {
    getData() {
      const page = this.currentPage > 0 ? this.currentPage - 1 : 0;
      arrival.getApproInfo(this.projectInfo.SC_ProjectOID, page).then(res => {
        // console.log(res);
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.pages = eval("(" + csp[1].split("=")[1] + ")");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.appropriation {
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
    margin-bottom: 40px;
    .app-card {
      width: 100%;
      .app-item {
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

