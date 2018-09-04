<template>
  <!-- 发货信息 -->
  <div class="shippinginfo">
    <div class="info-data">
      <div class="info-card">
        <div class="info-item" v-for="(item,index) in list" :key="index" @click="jumpage(item)">
          <!--  @click="jumpage('pricedetails')" -->
          <div class="item-title">
            <span class="title">{{item[8]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">{{item[10]}}</span>
              <span class="row-right">{{item[11]}}</span>
            </div>
             <div class="content-row">
              <span class="row-left">{{item[14]}}</span>
              <span class="row-right">{{item[16]}}</span>
            </div>
             <div class="content-row">
              <span class="row-left">{{item[12]}}</span>
              <span class="row-right">{{item[13]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[19]}}</span>
              <span class="row-left">{{item[18]}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { offer } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list:[]
    };
  },
  computed,
  methods: {
    getData() {
      const params = {
        pid:this.clientInfo[0],
        sid:this.userInfo.oid,
      }
      offer.getDelivery(params).then(res => {
        if(res && res.status ===1){
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list =eval("[[" +csp[0])
          // console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    },
    jumpage(item) {
      this.$store.commit("contractParams",item);
      this.$router.push({
        name:"shippingDetails"
      });
    }
  },
  mounted() {
    if (this.clientInfo[0]) {
      this.pageInit();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.shippinginfo {
  width: 100%;
  padding: 10px;
  .info-data {
    margin-bottom: 40px;
    .info-card {
      width: 100%;
      .info-item {
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

