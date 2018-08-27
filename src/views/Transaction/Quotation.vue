<template>
  <!-- 报价单 -->
  <div class="quotation">
    <div class="quo-data">
      <div class="quo-card">
        <div class="quo-item" @click="jump('tranrial')">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">项目名称{{item}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">订单编号{{item}}</span>
              <span class="row-right">待报价{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">数量{{item}}</span>
              <span class="row-right">金额{{item}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">制定日期{{item}}</span>
              <span class="row-left">订货有效日期{{item}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
// import {offer} from "./../../assets/js/api.js"
export default {
  data() {
    return {
      list: [],
      item: ""
    };
  },
  computed,
  methods: {
    // getList(a) {
    //   offer.getList(a).then(res => {
    //     if (res && res.status === 1) {
    //       console.log(res)
    //     }
    //   });
    // }
    jump(name) {
      this.$router.push({
        name
      });
    }
  },
  mounted() {
    //   const c = {
    //     pid: "222",
    //     sid: "333"
    //   }
    //   this.getList(c);
    // }
  }
};
</script>
<style lang="less" scoped>
.quotation {
  width: 100%;
  padding: 10px;
  .quo-data {
    margin-bottom: 40px;
    .quo-card {
      width: 100%;
      .quo-item {
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

