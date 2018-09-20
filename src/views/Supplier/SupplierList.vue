<template>
  <div class="supplierList">
    <van-search placeholder="请输入搜索关键词" v-model="keyword" @change="searchData" @cancel="getData" show-action />
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
              <span class="row-left">单位类别：{{item[3]  | codeValue('CodeTable_Unit')}}</span>
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
  </div>
</template>
<script>
import { supplier } from "./../../assets/js/api.js";
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      keyword: "",
      list: []
    };
  },
  computed,
  methods: {
    getData(keyword = "") {
      supplier.getSupplierDetails(keyword).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split("]]");
          this.list = eval("[[" + csp[0] + "]]");
          // console.log(this.list);
        }
      });
    },
    //搜索
    searchData() {
      this.getData(this.keyword);
    },
    jumpPage(item) {
      this.$store.commit("suppParams", item);
      this.$router.push({
        name: "supplierDetails"
      });
    }
  },
  mounted() {
    this.getData();
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
}
</style>
<style lang="less">
.supplierDetails {
  .van-field .van-cell__title {
    max-width: 126px;
  }
}
</style>

