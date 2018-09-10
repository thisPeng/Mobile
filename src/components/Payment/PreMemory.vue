<template>
  <!-- 预存列表 -->
  <div class="prememory">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">收款账号：{{item[12]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">单号：{{item[1]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">经手人：{{item[13]}}</span>
              <span class="row-right">预存金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">审核日期：{{item[8] | formatDate}}</span>
              <span class="row-right" v-if="item[6] == '0'">
                <van-tag type="danger">单据状态：未审核</van-tag>
              </span>
              <span class="row-right" v-else-if="item[30] == '1'">
                <van-tag type="success">单据状态：已审批</van-tag>
              </span>
              <span class="row-right" v-else-if="item[31] == 'true'">
                <van-tag type="primary">单据状态：审批中</van-tag>
              </span>
              <span class="row-right" v-else-if="item[6] == '1'">
                <van-tag>单据状态：待审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>备注：{{item[16]}}</span>
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
import computed from "./../../assets/js/computed.js";
import { arrival } from "./../../assets/js/api.js";
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
      arrival.getPremomey(this.projectInfo.SC_ProjectOID, page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.list = eval("[[" + csp[0]);
            this.pages = eval("(" + csp[1].split("=")[1] + ")");
            // console.log(this.list);
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
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.prememory {
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


