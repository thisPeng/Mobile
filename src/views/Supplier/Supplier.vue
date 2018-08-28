<template>
  <div class="supplier">
    <van-tabs v-model="active">
      <van-tab title="常用供应商">
        <div class="supplier-option">
          <van-search v-model="keyword" placeholder="请输入供应商名称" @search="searchList" @cancel="cleanSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in list" :key="index">
            <div class="item-title">
              <span class="title">{{item[5]}}</span>
              <span class="option" @click.stop="onUnCollect(item)">取消收藏</span>
            </div>
            <van-cell is-link @click="jumpPage(item, 0)">
              <div class="item-content">
                <div class="content-row">
                  <span class="row-left flex-3">联系人：{{item[10]}}</span>
                  <span class="row-right text-right">
                    <van-tag type="danger" v-if="item[27] === '1'">待审批</van-tag>
                    <van-tag type="primary" v-if="item[27] === '2'">审批中</van-tag>
                    <van-tag type="success" v-if="item[27] === '3'">已审批</van-tag>
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
      <van-tab title="全部供应商">
        <div class="supplier-option">
          <van-search v-model="allKeyword" placeholder="请输入供应商名称" @search="searchAllList" @cancel="cleanAllSearch" show-action></van-search>
        </div>
        <div class="supplier-list">
          <div class="supplier-item" v-for="(item,index) in allList" :key="index">
            <div class="item-title">
              <span class="title">{{item[2]}}</span>
              <span class="option" @click.stop="onCollect(item)">添加收藏</span>
            </div>
            <van-cell is-link @click="jumpPage(item, 1)">
              <div class="item-content">
                <div class="content-row">
                  <span class="row-left flex-3">联系人：{{item[13]}}</span>
                  <span class="row-right text-right">
                    <van-tag type="danger" v-if="item[46] === '1'">待审批</van-tag>
                    <van-tag type="primary" v-if="item[46] === '2'">审批中</van-tag>
                    <van-tag type="success" v-if="item[46] === '3'">已审批</van-tag>
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
            if (res && res.status === 1) {
              const sp = res.text.split("]]");
              this.list = eval(sp[0].split("=")[1] + "]]");
              this.pages = eval(
                "(" + sp[1].split("=")[1].replace(";", "") + ")"
              );
              // console.log(this.list);
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
      supplier
        .getAllList(page, this.allKeyword, this.projectInfo.DemandID)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("]]");
              this.allList = eval(sp[0].split("=")[1] + "]]");
              this.allPages = eval(
                "(" + sp[1].split("=")[1].replace(";", "") + ")"
              );
              // console.log(this.allList);
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
            this.$toast.fail("供应商已经是常用供应商");
          } else if (res.text === "2") {
            this.getList();
            this.$nextTick().then(() => {
              setTimeout(() => {
                this.$toast.success("添加收藏成功");
              }, 300);
            });
          } else {
            this.$toast.fail("添加收藏失败，请刷新页面重试");
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 取消收藏
    onUnCollect(item) {
      const params = {
        pid: this.userId.UCML_OrganizeOID,
        sid: item[2]
      };
      supplier.cancelCollect(params).then(res => {
        if (res && res.status === 1) {
          if (res.text === "1") {
            this.$toast.fail("该供应商未收藏");
          } else if (res.text === "2") {
            this.getList();
            this.$nextTick().then(() => {
              setTimeout(() => {
                this.$toast.success("取消收藏成功");
              }, 300);
            });
          } else {
            this.$toast.fail("供应商ID或合作商ID不存在");
          }
        } else if (res && res.text) {
          this.$toast(res.text);
        }
      });
    },
    // 跳转供应商分类商品
    jumpPage(item, type) {
      this.$store.commit("suppParams", { id: type ? item[0] : item[2] });
      this.$router.push({
        name: "supplierType"
      });
    },
    // 页面初始化
    pageInit() {
      this.$nextTick().then(() => {
        if (this.projectInfo.SC_ProjectOID) {
          this.getList();
          this.getAllList();
        } else {
          this.$toast("请先点击屏幕右上角按钮，选择项目");
        }
      });
    }
  },
  computed,
  created() {
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
        // padding: 10px 0;
        border-bottom: 1px solid #f6f6f6;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .title {
          font-weight: 600;
          font-size: 16px;
        }
        .option {
          padding: 10px 15px;
          font-size: 12px;
          color: #00a0e9;
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


