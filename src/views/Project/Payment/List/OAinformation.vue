<template>
  <!-- OA批款信息 -->
  <div class="oainformation">
    <div class="oa-data">
      <div class="oa-card">
        <div class="oa-item" v-for="(item,index) in list" :key="index">
          <!-- v-for="(item,index) in data" :key="index" -->
          <div class="item-title">
            <span class="title">批款单号：{{item[8]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">工程名称：{{item[2]}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">合作商名称：{{item[4]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">批款金额：{{item[5]}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">批款ID：{{item[7]}}</span>
            </div>
            <div class="content-row">
              <span>批款日期：{{$util.formatDate(item[10])}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--分页组件-->
    <van-pagination v-model="curPage" :total-items="pages.RecordCount" :items-per-page="10" mode="simple" class="classify-pages" @change="getData" />
  </div>
</template>
<script>
import computed from "../../../../assets/js/computed.js";
import { financial } from "../../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      curPage: 1,
      pages: {}
    };
  },
  computed,
  methods: {
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      financial
        .getAppropriation(this.projectInfo.SC_ProjectOID, page)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("=");
              const csp = sp[1].split(";");
              this.list = eval(csp[0]);
              // console.log(this.list);
            }
          } catch (e) {
            console.log(e);
          }
        });
    },
    pageInit() {
      this.getData();
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.$parent.active = 7;
      this.pageInit();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.oainformation {
  width: 100%;
  padding: 10px;
  /* 分页 */
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  .oa-data {
    margin-bottom: 40px;
    .oa-card {
      width: 100%;
      .oa-item {
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

