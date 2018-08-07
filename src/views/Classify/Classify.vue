<template>
  <div class="classify">
    <van-tabs v-model="activeTabs" @click="switchTabs">
      <van-tab title="所有分类">
        <cly :topList="allTopList" :detailedList="allDetailedList"></cly>
      </van-tab>
      <van-tab v-for="(item,index) in list" :key="index" :title="item[5]">
        <!-- <cly :topList="topList" :detailedList="detailedList"></cly> -->
      </van-tab>
    </van-tabs>
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
      list: [],
      pages: [],
      topList: [],
      detailedList: [],
      allTopList: [],
      allDetailedList: []
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
  created() {
    classify.getProductType().then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        const list = eval(sp[1].split("=")[1]);

        let topIndex = -1,
          deIndex = -1;
        list.forEach(val => {
          if (val[8] === "00000000-0000-0000-0000-000000000000") {
            this.allTopList.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
            topIndex++;
          } else if (this.allTopList[topIndex].id === val[8]) {
            this.allDetailedList.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
            deIndex++;
          } else if (this.allDetailedList[deIndex].id === val[8]) {
            this.allDetailedList[deIndex].list.push({
              id: val[0],
              code: val[1],
              name: val[2],
              pid: val[8],
              list: []
            });
          } else {
            this.allDetailedList[deIndex].list.forEach(v => {
              if (v.id === val[8]) {
                v.list.push({
                  id: val[0],
                  code: val[1],
                  name: val[2],
                  pid: val[8]
                });
              }
            });
          }
        });
      }
      // console.log(this.allDetailedList);
    });
  },
  mounted() {
    this.getClassifyList();
    this.$nextTick().then(() => {
      if (this.projectInfo.ProjectNo) {
        this.$parent.title = this.projectInfo.ProjectName;
      }
    });
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
