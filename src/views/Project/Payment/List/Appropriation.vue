<template>
  <!-- 批款信息 -->
  <div class="appropriation">
    <div class="app-data">
      <div class="app-card">
        <div class="app-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">单号：{{item[1]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">批款日期：{{item[10] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[6] == '0'">单据状态：未审核</van-tag>
                <van-tag type="success" v-else-if="item[30] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[31] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>收款账号：{{item[12]}}</span>
            </div>
            <div class="content-row">
              <span>到款金额：{{item[34] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>批款金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>经手人：{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span>备注：{{item[16]}}</span>
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
import computed from "../../../../assets/js/computed.js";
import { financial } from "../../../../assets/js/api.js";
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
      financial.getApproInfo(this.projectInfo.SC_ProjectOID, page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.pages = eval("(" + csp[1].split("=")[1] + ")");
            this.list = eval("[[" + csp[0]);
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
      this.$parent.active = 3;
      this.pageInit();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
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
    margin-bottom: 60px;
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

