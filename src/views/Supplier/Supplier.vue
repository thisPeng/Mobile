<template>
  <div class="supplier">
    <div class="van-cell van-cell--borderless van-field">
      <div class="van-cell__title">工程名称：</div>
      <div class="van-cell__value flex-between">
        <span class="text-truncate text-left text-gray">{{projectInfo.ProjectName || '请选择工程项目'}}</span>
        <van-button type="primary" size="mini" @click="$router.push({ name: 'projectList' })">选择</van-button>
      </div>
    </div>
    <van-tabs v-model="active">
      <van-tab title="收藏">
        <div class="supplier-option">
          <van-search v-model="keyword" placeholder="请输入供应商名称" @search="searchList" @cancel="cleanSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item[2])">
            <div class="item-title">
              <span class="title">{{item[5]}}</span>
              <span class="icon">
                <van-icon name="success" color="#00A0E9" v-if="item[2] === suppParams.id" />
              </span>
            </div>
            <van-cell>
              <div class="item-content">
                <div class="content-row">
                  <span class="row-left">联系人：{{item[10]}}</span>
                  <span class="row-right">状态：
                    <van-tag type="danger" v-if="item[26] === '1'">待审批</van-tag>
                    <van-tag type="primary" v-else-if="item[26] === '2'">审批中</van-tag>
                    <van-tag type="success" v-else-if="item[26] === '3'">已审批</van-tag>
                    <van-tag v-else>未审批</van-tag>
                  </span>
                </div>
                <div class="content-row">
                  <span class="row-left">联系电话：{{item[11]}}</span>
                  <span class="row-right">固定电话：{{item[12]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">开票税率：{{item[14]}}</span>
                  <span class="row-right">生产类别：{{item[6] | type}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">营业执照：{{item[7]}}</span>
                </div>
              </div>
            </van-cell>
          </div>
        </div>
        <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="supplier-pages" @change="getList" />
      </van-tab>
      <van-tab title="全部">
        <div class="supplier-option">
          <van-search v-model="allKeyword" placeholder="请输入供应商名称" @search="searchAllList" @cancel="cleanAllSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in allList" :key="index" @click="jumpPage(item[0])">
            <div class="item-title">
              <span class="title">{{item[2]}}</span>
              <span class="icon">
                <van-icon name="success" color="#00A0E9" v-if="item[0] === suppParams.id" />
              </span>
            </div>
            <van-cell>
              <div class="item-content">
                <div class="content-row">
                  <span class="row-left">联系人：{{item[13]}}</span>
                  <span class="row-right">状态：
                    <van-tag type="danger" v-if="item[44] === '1'">待审批</van-tag>
                    <van-tag type="primary" v-else-if="item[44] === '2'">审批中</van-tag>
                    <van-tag type="success" v-else-if="item[44] === '3'">已审批</van-tag>
                    <van-tag v-else>未审批</van-tag>
                  </span>
                </div>
                <div class="content-row">
                  <span class="row-left">联系电话：{{item[14]}}</span>
                  <span class="row-right">固定电话：{{item[15]}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">开票税率：{{item[24]}}</span>
                  <span class="row-right">生产类别：{{item[3] | type}}</span>
                </div>
                <div class="content-row">
                  <span class="row-left">营业执照：{{item[4]}}</span>
                </div>
              </div>
            </van-cell>
          </div>
        </div>
        <van-pagination v-model="curAllPage" :total-items="allPages.RecordCount" :items-per-page="10" mode="simple" class="supplier-pages" @change="getAllList" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { supplier } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      keyword: "",
      allKeyword: "",
      list: [],
      allList: [],
      curPage: 1,
      curAllPage: 1,
      pages: {},
      allPages: {}
    };
  },
  filters: {
    type: val => {
      return val === 1 ? "生产厂家" : "经销商";
    }
  },
  methods: {
    searchList() {
      this.curPage = 1;
      this.getList();
    },
    searchAllList() {
      this.curAllPage = 1;
      this.getAllList();
    },
    cleanSearch() {
      this.curPage = 1;
      this.keyword = "";
      this.getList();
    },
    cleanAllSearch() {
      this.curAllPage = 1;
      this.allKeyword = "";
      this.getAllList();
    },
    // 获取常用供应商
    getList() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      supplier
        .getList(page, this.keyword, this.projectInfo.DemandID)
        .then(res => {
          try {
            const sp = res.text.split("]]");
            this.list = eval(sp[0].split("=")[1] + "]]");
            this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
          } catch (e) {
            this.list = [];
            this.pages = {};
          }
        });
    },
    // 获取所有供应商
    getAllList() {
      const page = this.curAllPage > 0 ? this.curAllPage - 1 : 0;
      supplier
        .getAllList(page, this.allKeyword, this.projectInfo.DemandID)
        .then(res => {
          try {
            const sp = res.text.split("]]");
            this.allList = eval(sp[0].split("=")[1] + "]]");
            this.allPages = eval(
              "(" + sp[1].split("=")[1].replace(";", "") + ")"
            );
          } catch (e) {
            this.allList = [];
            this.allPages = {};
          }
        });
    },
    // 选择供应商分类商品
    jumpPage(id) {
      this.$store.commit("suppParams", { id });
      this.$router.go(-1);
    },
    // 页面初始化
    pageInit() {
      if (this.projectInfo.SC_ProjectOID) {
        this.getList();
        this.getAllList();
      } else {
        this.$toast.fail("请选择项目");
      }
    }
  },
  computed,
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.supplier {
  width: 100%;
  .supplier-option {
    width: 100%;
  }
  .supplier-list {
    width: 100%;
    padding: 10px;
    margin-bottom: 40px;
    .supplier-item {
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
        .option {
          width: 75px;
          padding: 10px;
          font-size: 12px;
          color: #00a0e9;
          text-align: right;
          text-decoration: underline;
        }
      }
      .van-cell {
        padding: 5px 0;
      }
      .item-content {
        font-size: 12px;
        color: #666;
        .content-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .row-left {
            flex: 1;
          }
          .row-right {
            flex: 1;
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


