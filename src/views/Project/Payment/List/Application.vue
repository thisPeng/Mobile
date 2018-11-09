 <template>
  <!-- 支付申请信息 -->
  <div class="application">
    <div class="app-data">
      <div class="app-card">
        <van-cell-group class="app-item" v-for="(item,index) in list" :key="index">
          <div class="item-title">
            <span class="title">单号：{{item[1]}}</span>
            <span v-if="item[32] != '1'">
              <van-button type="danger" size="mini" plain @click="onDelete(item[0])">删除</van-button>
            </span>
          </div>
          <van-cell is-link class="item-content" @click="jumpInfo(item)">
            <div class="content-row">
              <span>所属项目：{{item[30]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">申请日期：{{item[15] | formatDate}}</span>
              <span class="row-right">
                <van-tag v-if="item[33] == 'false'">单据状态：未提交</van-tag>
                <van-tag type="danger" v-else-if="item[6] == '0'">单据状态：未审核</van-tag>
                <van-tag type="success" v-else-if="item[32] == '1'">单据状态：已审批</van-tag>
                <van-tag type="primary" v-else-if="item[33] == 'true'">单据状态：审批中</van-tag>
                <van-tag v-else-if="item[6] == '1'">单据状态：待审批</van-tag>
              </span>
            </div>
            <div class="content-row">
              <span class="row-left">申请类型：{{item[9] | orderStatus}}</span>
            </div>
            <div class="content-row">
              <span class="row-right">申请金额：{{item[12] | formatMoney}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">备注：{{item[10]}}</span>
            </div>
          </van-cell>
        </van-cell-group>
        <div class="margin-top-sm" v-if="filterParams === 1">
          <van-button type="primary" size="large" @click="onAdd">新增支付申请</van-button>
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
    // 新增支付申请
    onAdd() {
      this.$store.commit("taskParams", "");
      this.$router.push({
        name: "paymentAddZF"
      });
    },
    // 删除支付申请
    onDelete(id) {
      this.$dialog
        .confirm({
          title: "删除",
          message: "是否删单据？"
        })
        .then(() => {
          financial.deletePayBill(id).then(res => {
            if (res && res.status === 1) {
              if (res.text == "0") {
                this.$toast.fail("单据已审核，不能删除！");
              } else if (res.text == "1") {
                this.getData().then(() => {
                  this.$toast.success("删除数据成功");
                });
              } else {
                this.$toast.fail("删除数据失败");
              }
            } else if (res && res.text) {
              this.$toast(res.text);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 跳转详情
    jumpInfo(item) {
      if (item[33] == "true") {
        const params = {
          InstanceID: item[34],
          name: "支付申请详情",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        financial
          .updateReadInfo({
            BPOName: this.taskModel,
            key_value: item[0]
          })
          .then(res => {
            if (res.status && res.text == "True") {
              this.$router.push({
                name: "taskZFFrom"
              });
            } else {
              this.$toast.fail("获取数据失败，请重试");
            }
          });
      } else {
        const params = {
          InstanceID: item[0],
          name: "编辑支付申请",
          bpoName: "SupplyChain/BizFinance/BPO_WF_Apply_Info"
        };
        this.$store.commit("taskParams", params);
        this.$router.push({
          name: "paymentAddZF"
        });
      }
    },
    getData() {
      const page = this.curPage > 0 ? this.curPage - 1 : 0;
      let filter =
        " AND SC_Pay_Apply.PartnerID='" + this.userId.UCML_OrganizeOID + "'";
      if (this.filterParams === 1) {
        if (this.userType === 3) {
          filter =
            " AND SC_Pay_Apply.DemandID='" + this.userId.UCML_OrganizeOID + "'";
        }
        filter += " AND StartFlowFlag is null";
      } else if (this.filterParams === 2) {
        if (this.userType === 3) {
          filter =
            " AND SC_Pay_Apply.DemandID='" + this.userId.UCML_OrganizeOID + "'";
        }
        filter += " AND BusinessState='1'";
        filter +=
          " AND SC_Pay_ApplyOID not in (select Key_Value from SC_ReadBill_Info where UserOID='" +
          this.userId.UCML_UserOID +
          "' and Table_Name='SC_Pay_Apply' AND Read_Flag='1')";
      }
      return financial.getPaymentList(page, filter).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const csp = sp[1].split(";");
            this.pages = eval("(" + csp[1].split("=")[1] + ")");
            this.list = eval("[[" + csp[0]);
            return true;
          }
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      });
    },
    pageInit() {
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
.application {
  width: 100%;
  height: 100%;
  padding: 10px;
  /* 分页 */
  .classify-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
  .app-data {
    .app-card {
      width: 100%;
      padding-bottom: 60px;
      .app-item {
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


