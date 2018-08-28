<template>
  <div class="classify">
    <van-tabs v-model="activeTabs">
      <van-tab title="所有分类">
        <cly :topList="topList" :detailedList="detailedList"></cly>
      </van-tab>
      <van-tab title="常用供应商">
        <stp :suppList="list" />
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
      detailedList: []
    };
  },
  components: {
    cly,
    stp
  },
  methods: {
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
      supplier.getSuppList(this.projectInfo.DemandID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("]]");
            this.list = eval(sp[0].split("=")[1] + "]]");
            // console.log(this.list);
            // this.pages = eval("(" + sp[1].split("=")[1].replace(";", "") + ")");
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    // 页面初始化
    pageInit() {
      this.getClassifyList();
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
            this.topList.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            topIndex++;
          } else if (this.topList[topIndex].id === val[8]) {
            this.detailedList.push({
              id: val[0],
              mid: val[4],
              code: val[1],
              name: val[2],
              pid: val[8],
              img: val[16].replace("~", this.servePath),
              list: []
            });
            deIndex++;
          } else if (this.detailedList[deIndex].id === val[8]) {
            this.detailedList[deIndex].list.push({
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
            this.detailedList[deIndex].list.forEach(v => {
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
      // console.log(this.detailedList);
    });
  },
  mounted() {
    this.pageInit();
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


