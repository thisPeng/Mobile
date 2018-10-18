<template>
  <!-- 预存列表 -->
  <div class="prememory">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">收款账号：{{item[12]}}</span>
            <span v-if="item[30] != '1'">
              <van-button type="danger" size="mini" plain @click="onDelete(item[0])">删除</van-button>
            </span>
          </div>
          <van-cell is-link class="item-content" @click="jumpInfo(item)">
            <div class="content-row">
              <span class="row-left">审核日期：{{item[8] | formatDate}}</span>
              <span class="row-right">
                <van-tag v-if="item[31] == 'false'">单据状态：未提交</van-tag>
                <van-tag type="danger" v-else-if="item[6] == '0'">单据状态：未审核</van-tag>
                <van-tag type="success" v-else-if="item[30] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[31] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>预存单号：{{item[1]}}</span>
            </div>
            <div class="content-row">
              <span>预存金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>经手人：{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span>备注：{{item[16]}}</span>
            </div>
          </van-cell>
        </div>
      </div>
      <!-- <div class="margin-top-sm" v-if="projectInfo.SC_ProjectOID">
        <van-button type="primary" size="large" @click="onAdd">新增预存登记</van-button>
      </div> -->
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
    jumpInfo(item) {
      if (item[31] == "true") {
        const params = {
          InstanceID: item[32],
          name: "预存登记详情",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "taskYCFrom"
        });
      } else {
        const params = {
          InstanceID: item[0],
          name: "编辑预存登记",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "paymentAddYC"
        });
      }
    },
    // 新增预存单
    onAdd() {
      this.$store.commit("taskParams", "");
      this.$router.push({
        name: "paymentAddYC"
      });
    },
    // 删除预存单
    onDelete(id) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删除订单？"
        })
        .then(() => {
          financial.deleteStored(id).then(res => {
            if (res && res.status === 1) {
              if (res.text == "0") {
                this.$toast.fail("单据已审核，不能删除！");
              } else if (res.text == "1") {
                this.getData().then(() => {
                  this.$toast.success("删除数据成功");
                });
              } else {
                this.$toast.fail("删除数据失败");
              }
            } else if (res && res.text) {
              this.$toast(res.text);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      return financial
        .getPremomey(this.projectInfo.SC_ProjectOID, page)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.list = eval("[[" + csp[0]);
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
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.$parent.active = 1;
      this.pageInit();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
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


