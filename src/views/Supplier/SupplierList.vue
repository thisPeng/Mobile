<template>
  <div class="supplierList">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" @change="searchData" @cancel="onCancel" show-action />
    <div class="info-data">
      <div class="info-card">
        <div class="info-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
          <div class="item-title">
            <span class="title">供应商名称：{{item[2]}}</span>
          </div>
          <van-cell is-link class="item-content">
            <div class="content-row">
              <span class="row-left">统一社会信用代码：{{item[5]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">纳税人类别：{{item[6] | codeValue('CodeTable_TaxClass')}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[44] === '1'">待审批</van-tag>
                <van-tag type="primary" v-else-if="item[44] === '2'">审批中</van-tag>
                <van-tag type="success" v-else-if="item[44] === '3'">已审批</van-tag>
                <van-tag v-else>未审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">联系人：{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">联系电话：{{item[14]}}</span>
            </div>
          </van-cell>
        </div>
      </div>
    </div>
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="supplier-pages" @change="getData" />
  </div>
</template>
<script>
import { supplier } from "./../../assets/js/api.js";
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      keyword: "",
      list: [],
      curPage: 1,
      pages: {}
    };
  },
  computed,
  methods: {
    // 获取列表数据
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      supplier
        .getSupplierDetails(this.projectInfo.DemandID, this.keyword, page)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split("]]");
              this.list = eval("[[" + csp[0] + "]]");
              this.pages = eval(
                "(" + sp[1].split("=")[1].replace(";", "") + ")"
              );
            }
          } catch (e) {
            this.list = [];
            this.pages = {};
          }
        });
    },
    // 搜索
    searchData() {
      this.curPage = 1;
      this.getData();
    },
    onCancel() {
      this.keyword = "";
      this.curPage = 1;
      this.getData();
    },
    // 跳转详情
    jumpPage(item) {
      this.$store.commit("suppParams", item);
      this.$router.push({
        name: "supplierDetails"
      });
    },
    // 页面初始化
    pageInit() {
      this.$nextTick().then(() => {
        if (this.projectInfo.SC_ProjectOID) {
          this.getData();
        } else {
          this.$toast.fail("请选择项目");
        }
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.supplierList {
  width: 100%;
  .info-data {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    padding: 10px;
    padding-bottom: 70px;
    .info-card {
      width: 100%;
      .info-item {
        background-color: #fff;
        padding: 5px 10px;
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
          .option {
            padding: 10px;
          }
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px;
          padding-right: 0;
          font-size: 12px;
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
  .supplier-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
<style lang="less">
.supplierDetails {
  .van-field .van-cell__title {
    max-width: 126px;
  }
}
</style>

