<template>
  <div class="supplier">
    <van-tabs v-model="active">
      <van-tab title="常用供应商">
        <div class="supplier-option">
          <van-search v-model="keyword" placeholder="请输入供应商名称" @search="onSearch"></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in list" :key="index">
            <div class="item-title">
              <span class="title">{{item[5]}}</span>
              <span class="option" @click="onUnCollect(item)">取消收藏</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">联系人：{{item[10]}}</span>
                <span class="row-right">生产类别：{{item[6]}}</span>
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
          <van-search v-model="allKeyword" placeholder="请输入供应商名称" @search="onSearch"></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in allList" :key="index">
            <div class="item-title">
              <span class="title">{{item[2]}}</span>
              <span class="option" @click="onCollect(item)">收藏</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">联系人：{{item[13]}}</span>
                <span class="row-right">生产类别：{{item[6]}}</span>
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
  methods: {
    getList() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      supplier.getList(page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.list = eval(sp[0].split("=")[1] + "]]");
            this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    getAllList() {
      const page = this.curAllPage > 0 ? this.curAllPage - 1 : 0;
      supplier.getAllList(page).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.allList = eval(sp[0].split("=")[1] + "]]");
            this.allPages = eval(
              "(" + sp[1].split("=")[1].replace(";", "") + ")"
            );
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    onSearch(res) {
      console.log(res);
    },
    onCancel() {},
    // 添加收藏
    onCollect(item) {
      const params = {
        pid: this.userId.UCML_PostOID,
        sid: item[0]
      };
      supplier.addCollect(params).then(res => {
        if (res && res.status === 1) {
          this.$toast("添加收藏成功");
        } else {
          this.$toast(res.text);
        }
      });
    },
    onUnCollect(item) {
      console.log(item);
      this.$toast("取消收藏成功");
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


