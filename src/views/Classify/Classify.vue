<template>
  <div class="classify">
    <van-tabs v-model="activeTabs" @click="switchTabs">
      <van-tab title="所有分类">
        <cly :topList="allTopList" :detailedList="allDetailedList"></cly>
      </van-tab>
      <van-tab v-for="(item,index) in list" :key="index" :title="item[5]">
        <stp />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import cly from "./../../components/Classify/Classify";
import stp from "./../../components/Classify/Supplier";
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
    cly,
    stp
  },
  methods: {
    // 切换选项卡
    switchTabs(i) {
      if (i > 0) {
        this.$store.commit("suppParams", this.list[i - 1]);
      }
    },
    // 选择分类
    onNavClick(index) {
      this.active = index;
    },
    // 跳转分类商品列表
    onItemClick(id) {
      this.$store.commit("goodsParams", { id });
      this.$router.push({
        name: "goodsList"
      });
    },
    // 获取分类列表
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
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            topIndex++;
          } else if (this.allTopList[topIndex].id === val[8]) {
            this.allDetailedList.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            deIndex++;
          } else if (this.allDetailedList[deIndex].id === val[8]) {
            this.allDetailedList[deIndex].list.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16]
                ? val[16].replace("~", this.servePath)
                : this.servePath +
                  "/SupplyChain/Images/MaterialType/default.jpg",
              list: []
            });
          } else {
            this.allDetailedList[deIndex].list.forEach(v => {
              if (v.id === val[8]) {
                v.list.push({
                  id: val[0],
                  mid: val[4],
                  code: val[1],
                  name: val[2],
                  img: val[16]
                    ? val[16].replace("~", this.servePath)
                    : this.servePath +
                      "/SupplyChain/Images/MaterialType/default.jpg",
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
  .van-tabs {
    height: 100%;
  }
}
</style>


