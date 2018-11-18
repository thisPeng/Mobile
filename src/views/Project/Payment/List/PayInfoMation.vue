<template>
  <!-- 付款信息 -->
  <div class="payInfoMation">
    <div class="pre-data">
      <div class="pre-card">
        <van-cell-group class="pre-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">银行账号：{{item[12]}}</span>
          </div>
          <van-cell class="item-content" is-link @click="jumpPage(item)">
            <div class="content-row">
              <span class="row-left">支付日期：{{item[10] | formatDate}}</span>
              <span class="row-right">
                <van-tag type="success" v-if="item[6] === '1'">单据状态：{{item[6] | payStatus}}</van-tag>
                <van-tag type="danger" v-else>单据状态：{{item[6] | payStatus}}</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span>申请单号：{{item[40]}}</span>
            </div>
            <div class="content-row">
              <span>支付金额：{{item[9] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span>支付类型：{{item[37] | paytypeStatus}}</span>
            </div>
            <div class="content-row">
              <span>收款单位：{{item[38]}}</span>
            </div>
          </van-cell>
        </van-cell-group>
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
      return financial
        .getPaymentInfo(this.userId.UCML_OrganizeOID, page, this.filter)
        .then(res => {
          try {
            if (res && res.status === 1) {
              const sp = res.text.split("[[");
              const csp = sp[1].split(";");
              this.list = eval("[[" + csp[0]);
              this.pages = eval("(" + csp[1].split("=")[1] + ")");
              return true;
            }
            return false;
          } catch (e) {
            console.log(e);
            return false;
          }
        });
    },
    jumpPage(item) {
      this.$store.commit("taskParams", item);
      financial
        .updateReadInfo({
          BPOName: this.taskModel,
          key_value: item[0]
        })
        .then(res => {
          if (res.status && res.text == "True") {
            this.$router.push({
              name: "paymentAddFK"
            });
          } else {
            this.$toast.fail("获取数据失败，请重试");
          }
        });
    },
    pageInit() {
      if (this.filterParams === 1) {
        this.filter = "AND SC_Money_InOut.Approve_Flag='1'";
        this.filter +=
          " AND SC_Money_InOutOID not in (SELECT Key_Value FROM SC_ReadBill_Info WHERE UserOID='" +
          this.userId.UCML_UserOID +
          "' AND Table_Name='SC_Money_InOut' AND Read_Flag='1')";
      } else {
        this.filter = "AND SC_Money_InOut.Approve_Flag='0'";
      }
      this.getData().then(res => {
        if (!res && this.list.length === 0) {
          this.$router.go(-1);
        }
      });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.payInfoMation {
  width: 100%;
  padding: 10px;
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
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


