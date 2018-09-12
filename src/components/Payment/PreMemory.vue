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
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">审核日期：{{item[8] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[6] == '0'">单据状态：未审核</van-tag>
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
          </div>
        </div>
      </div>
      <!-- <div class="margin-top-sm">
        <van-button type="primary" size="large" @click="onAdd">新增预存登记</van-button>
      </div> -->
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { financial } from "./../../assets/js/api.js";
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
    onAdd() {},
    onDelete(id) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删除订单？"
        })
        .then(() => {
          financial.deleteStored(id).then(res => {
            //  console.log(res);
            if (res && res.status === 1) {
              if (res.text === "0") {
                this.$toast.fail("单据已审核，不能删除！");
              } else if (res.text === "1") {
                this.getData();
                this.$nextTick().then(() => {
                  setTimeout(() => {
                    this.$toast.success("删除数据成功");
                  }, 300);
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
      financial.getPremomey(this.projectInfo.SC_ProjectOID, page).then(res => {
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


