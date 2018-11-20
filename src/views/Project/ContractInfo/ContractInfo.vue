 <template>
  <!-- 合同信息 -->
  <div class="contractInfo">
    <div class="tran-data">
      <van-tabs v-model="active" class="tran-card" sticky>
        <van-tab :title="'材料合同 (' + listMaterials.length + ')'">
          <div class="tran-item" v-for="(item,index) in listMaterials" :key="index">
            <div class="item-title">
              <span class="title">{{item[22]}}</span>
              <span class="option" v-for="(ite,idx) in buttonValue" :key="idx" v-if="item[6]==1 && ite.text === '合同退回' && ite.Allowvisible === '1'">
                <van-button type="danger" size="mini" plain @click.stop="onReturn(item)" :disabled="ite.Enabled !== '1'">退回</van-button>
              </span>
            </div>
            <van-cell is-link class="item-content" @click="jumpInfo(item)">
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
                <span class="row-right">
                  <van-tag type="danger" v-if="item[18] === '发货情况：未发货'">{{item[18]}}</van-tag>
                  <van-tag type="primary" v-else-if="item[18] === '发货情况：部分发货'">{{item[18]}}</van-tag>
                  <van-tag type="success" v-else-if="item[18] === '发货情况：全部发货'">{{item[18]}}</van-tag>
                  <van-tag v-else>{{item[18]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[12]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[13]}}</span>
              </div>
            </van-cell>
          </div>
        </van-tab>
        <van-tab :title="'材料合同 (' + listLabor.length + ')'">
          <div class="tran-item" v-for="(item,index) in listLabor" :key="index">
            <div class="item-title">
              <span class="title">{{item[22]}}</span>
              <span class="option" v-for="(ite,idx) in buttonValue" :key="idx" v-if="item[6]==1 && ite.text === '合同退回' && ite.Allowvisible === '1'">
                <van-button type="danger" size="mini" plain @click.stop="onReturn(item)" :disabled="ite.Enabled !== '1'">退回</van-button>
              </span>
            </div>
            <van-cell class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[14]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[15]}}</span>
                <span class="row-right">
                  <van-tag type="danger" v-if="item[18] === '审核情况：未审核'">{{item[18]}}</van-tag>
                  <van-tag type="success" v-else-if="item[18] === '审核情况：已审核'">{{item[18]}}</van-tag>
                  <van-tag v-else>{{item[18]}}</van-tag>
                </span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[12]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[13]}}</span>
              </div>
            </van-cell>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { index, contractInfo } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      active: 0,
      listLabor: [],
      listMaterials: [],
      buttonValue: []
    };
  },
  computed,
  methods: {
    getList() {
      return contractInfo.getList(this.userId.UCML_UserOID, 0).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split(";");
            const list = eval("[[" + tsp[0]);
            list.forEach(val => {
              if (val[5] == 1) {
                this.listLabor.push(val);
              } else {
                this.listMaterials.push(val);
              }
            });
            // console.log(this.listLabor);
            return true;
          }
          throw "数据获取失败，请刷新重试";
        } catch (e) {
          console.log(e);
          return false;
        }
      });
    },
    // 合同退回
    onReturn(item) {
      this.$dialog
        .confirm({
          title: "提示",
          message: "确定要退回合同？"
        })
        .then(() => {
          contractInfo.returnContract(item[0], item[5]).then(res => {
            try {
              if (res.status === 1) {
                this.getList().then(result => {
                  if (result) this.$toast.success("合同已退回");
                  else location.reload();
                });
              }
            } catch (e) {
              console.log(e);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
    // 跳转详情
    jumpInfo(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "contractWorkInfo"
      });
    },
    pageInit() {
      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_Contract_List")
        .then(res => {
          if (res.status) {
            this.buttonValue = JSON.parse(res.text);
          }
        });
      this.getList();
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.contractInfo {
  width: 100%;
  .tran-data {
    .tran-card {
      width: 100%;
      padding: 55px 10px 10px 10px;
      .tran-item {
        background-color: #fff;
        padding: 0 15px;
        border-bottom: 1px solid #eee;
        border-radius: 5px;
        margin-bottom: 10px;
        .item-title {
          height: 40px;
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
          padding: 5px 0;
          font-size: 12px;
          color: #666;
          .content-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 2.5px 0;
          }
        }
      }
    }
  }
}
</style>


