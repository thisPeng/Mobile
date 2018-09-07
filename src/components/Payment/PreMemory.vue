<template>
  <!-- 预存列表 -->
  <div class="prememory">
    <div class="pre-data">
      <div class="pre-card">
        <div class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">收款账号:{{item[12]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">经手人:{{item[13]}}</span>
              <span class="row-right">预存金额:{{item[9]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">单据状态:{{item[6]}}</span>
              <span class="row-right">审核日期:{{new Date(item[8]).Format("yyyy-MM-dd")}}</span>
            </div>
            <div class="content-row">
              <span>单号:{{item[1]}}</span>
            </div>
            <div class="content-row">
              <span>备注:{{item[16]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="pageInit" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { arrival } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      curPage:1,
      pages:{}
    };
  },
  computed,
  methods: {
    getData(){
      arrival.getPremomey(this.projectInfo.SC_ProjectOID).then(res =>{
        // console.log(res);
        if(res &&res.status ===1){
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[["+csp[0]);
          // console.log(this.list);
        }
      })
    },
    pageInit(){
      this.getData();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.prememory {
  width: 100%;
  padding: 10px;
  .pre-data {
    margin-bottom: 40px;
    .pre-card {
      width: 100%;
      .pre-item {
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
          .icon {
            font-size: 14px;
          }
        }
        .item-content {
          padding: 5px 0;
          font-size: 13px;
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


