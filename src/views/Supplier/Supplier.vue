<template>
  <div class="supplier">
    <van-tabs v-model="active">
      <van-tab title="常用供应商">
        <div class="supplier-option">
          <van-search v-model="keyword" placeholder="请输入供应商名称" @search="searchList" @cancel="cleanSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in list" :key="index" @click="jumpPage(item)">
            <div class="item-title">
              <span class="title">{{item[5]}}</span>
              <span class="option" @click.stop="onUnCollect(item)">取消收藏</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">联系人：{{item[10]}}</span>
                <span class="row-right">生产类别：{{item[6] | type}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">联系电话：{{item[11]}}</span>
                <span class="row-right">固定电话：{{item[12]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">营业执照：{{item[7]}}</span>
                <span class="row-right">开票税率：{{item[14]}}</span>
              </div>
            </div>
          </div>
        </div>
        <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="supplier-pages" @change="getList" />
      </van-tab>
      <van-tab title="全部供应商">
        <div class="supplier-option">
          <van-search v-model="allKeyword" placeholder="请输入供应商名称" @search="searchAllList" @cancel="cleanAllSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in allList" :key="index" @click="jumpPage(item)">
            <div class="item-title">
              <span class="title">{{item[2]}}</span>
              <span class="option" @click.stop="onCollect(item)">收藏</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">联系人：{{item[13]}}</span>
                <span class="row-right">生产类别：{{item[3] | type}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">联系电话：{{item[14]}}</span>
                <span class="row-right">固定电话：{{item[15]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">营业执照：{{item[9]}}</span>
                <span class="row-right">开票税率：{{item[24]}}</span>
              </div>
            </div>
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
      supplier.getList(page, this.keyword).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.list = eval(sp[0].split("=")[1] + "]]");
            this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
            console.log(sp);
          }
        } catch (e) {
          this.list = [];
          this.pages = {};
        }
      });
    },
    // 获取所有供应商
    getAllList() {
      const page = this.curAllPage > 0 ? this.curAllPage - 1 : 0;
      supplier.getAllList(page, this.allKeyword).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.allList = eval(sp[0].split("=")[1] + "]]");
            this.allPages = eval(
              "(" + sp[1].split("=")[1].replace(";", "") + ")"
            );
          }
        } catch (e) {
          this.allList = [];
          this.allPages = {};
        }
      });
    },
    // 添加收藏
    onCollect(item) {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: item[0]
      };
      supplier.addCollect(params).then(res => {
        if (res && res.status === 1) {
          if (res.text === "1") {
            this.$toast("供应商已经是常用供应商");
          } else if (res.text === "2") {
            this.getList();
            this.$toast("添加收藏成功");
          } else {
            this.$toast("添加收藏失败，请刷新页面重试");
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 取消收藏
    onUnCollect(item) {
      console.log(item);
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: item[2]
      };
      supplier.cancelCollect(params).then(res => {
        if (res && res.status === 1) {
          if (res.text === "1") {
            this.$toast("该供应商未收藏");
          } else if (res.text === "2") {
            this.getList();
            this.$toast("取消收藏供应商成功");
          } else {
            this.$toast("供应商ID或合作商ID不存在");
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 跳转供应商分类商品
    jumpPage(item) {
      this.$store.commit("suppParams", item);
      this.$router.push({
        name: "supplierType"
      });
    }
  },
  computed,
  mounted() {
    this.getList();
    this.getAllList();
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
          font-size: 12px;
          color: #00a0e9;
          text-decoration: underline;
        }
      }
      .item-content {
        padding: 5px 0;
        font-size: 12px;
        color: #666;
        .content-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 0;
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


