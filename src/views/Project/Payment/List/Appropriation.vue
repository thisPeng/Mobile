<template>
  <!-- 批款信息 -->
  <div class="appropriation">
    <div class="app-data">
      <div class="app-card">
        <van-cell-group class="app-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">单号：{{item[1]}}</span>
            <span class="option">
              <van-button type="danger" size="mini" plain @click.stop="onDelete(item)">删除</van-button>
            </span>
          </div>
          <van-cell class="item-content" is-link @click="jumpPage(item)">
            <div class="content-row">
              <span>所属项目：{{item[28]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">批款日期：{{item[10] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[6] == '0'">单据状态：未审核</van-tag>
                <van-tag type="success" v-else-if="item[30] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[31] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
                <van-tag v-else>单据状态：关闭</van-tag>
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
          </van-cell>
        </van-cell-group>
        <div class="margin-top-sm" v-if="filterParams === 1">
          <van-button type="primary" size="large" @click="onAdd">新增批款单</van-button>
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
      pages: {},
      filter: ""
    };
  },
  computed,
  methods: {
    // 新增单据
    onAdd() {
      this.$store.commit("taskParams", "");
      this.$router.push({
        name: "paymentAddPK"
      });
    },
    // 获取数据
    getData() {
      const page = this.currentPage > 0 ? this.currentPage - 1 : 0;
      return financial
        .getApproInfo(this.userId.UCML_OrganizeOID, page, this.filter)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.pages = eval("(" + csp[1].split("=")[1] + ")");
              this.list = eval("[[" + csp[0]);
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
      if (item[31] == "true") {
        const params = {
          InstanceID: item[32],
          name: "批款单详情",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "taskPKFrom"
        });
      } else {
        const params = {
          InstanceID: item[0],
          name: "编辑批款单",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "paymentAddPK"
        });
      }
    },
    onDelete() {},
    pageInit() {
      if (this.filterParams === 1) {
        this.filter = "AND SC_Money_InOut.StartFlowFlag is null";
      } else {
        this.filter = "AND SC_Money_InOut.BusinessState='1'";
      }
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

