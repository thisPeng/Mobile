<template>
  <!-- 发货信息 -->
  <div class="shippinginfo">
    <div class="info-data">
      <div class="info-card">
        <div class="info-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">{{item[8]}}</span>
            <span class="option">
              <van-button type="primary" size="mini" plain @click="jumpAdd(item)">新增</van-button>
            </span>
          </div>
          <van-cell is-link class="item-content" @click="jumpInfo(item)">
            <div class="content-row">
              <span class="row-left">{{item[10]}}</span>
              <span class="row-right">
                <van-tag :type="item[14] === '已发货' ? '' : 'danger'">{{item[14]}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[11]}}</span>
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
          </van-cell>
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
      list: []
    };
  },
  computed,
  methods: {
    getData() {
      const params = {
        pid: this.clientInfo[0],
        sid: this.userInfo.oid
      };
      offer.getDelivery(params).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.list = eval("[[" + csp[0]);
          //  console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
    },
    jumpInfo(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "shippingDetails"
      });
    },
    jumpAdd(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "newInvoice"
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

