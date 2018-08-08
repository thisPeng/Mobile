<template>
  <div class="classify">
    <cly :topList="topList" :detailedList="detailedList"></cly>
  </div>
</template>
<script>
import cly from "./../../components/Classify/Classify";
import computed from "./../../assets/js/computed.js";
import { classify, supplier } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      activeTabs: 0,
      pages: [],
      topList: [],
      detailedList: []
    };
  },
  components: {
    cly
  },
  methods: {
    switchTabs(i) {
      if (i > 0) {
        this.getSuppClassify(this.list[i - 1][2]);
      }
    },
    getSuppClassify(id) {
      classify.getSupplierType(id).then(res => {
        if (res && res.status === 1) {
          const sp = eval(res.text);
          console.log(sp);
        }
      });
    },
    onNavClick(index) {
      this.active = index;
    },
    onItemClick(id) {
      this.$store.commit("goodsParams", { id });
      this.$router.push({
        name: "goodsList"
      });
    },
    getClassifyList() {
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
    }
  },
  computed,
  mounted() {
    this.getClassifyList();
    this.$nextTick().then(() => {});
  }
};
</script>
<style lang="less" scoped>
.classify {
  width: 100%;
  bottom: 50px !important;
  overflow: hidden !important;
  .actives {
    border-bottom: 1px solid #3190e8;
    color: #3190e8;
  }
  .left {
    top: 41px;
    float: left;
    width: 25%;
    height: 100%;
    overflow-y: scroll;
    ul {
      list-style: none;
      li {
        padding: 15px 5px;
        text-align: center;
      }
    }
    .active {
      background: #fff;
      border-left: 2px solid #3190e8;
    }
  }
  .right {
    float: left;
    width: 75%;
    height: 100%;
    overflow-y: scroll;
    ul {
      list-style: none;
      .class-title {
        padding: 7px 10px;
        background: #eee;
      }
      .item {
        overflow: hidden;
        width: 100%;
        height: 44px;
        padding: 10px 15px;
        font-size: 14px;
        background: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        .item-left {
          float: left;
          .item-img {
            width: 100px;
            height: 100px;
            background: #eee;
          }
        }
      }
      .van-collapse-item__content {
        .title {
          font-size: 12px !important;
        }
      }
    }
  }
}
</style>
