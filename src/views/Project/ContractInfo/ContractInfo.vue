 <template>
  <!-- 合同信息 -->
  <div class="contractInfo">
    <div class="tran-data">
      <div class="tran-card">
        <div class="tran-item" v-for="(item,index) in list" :key="index" v-if="item[18] !== '审核情况：未审核' && item[18] !== '审核情况：已审核'">
          <div class="item-title">
            <span class="title">{{item[22]}}</span>
            <span class="option" v-if="item[18] === '发货情况：未发货' || item[18] !== '审核情况：未审核'">
              <van-button type="danger" size="mini" plain @click.stop="onReturn(item)">退回</van-button>
            </span>
          </div>
          <van-cell :is-link="item[5]==0" class="item-content" @click="item[5]==0 ? jumpInfo(item) : ''">
            <div class="content-row">
              <span class="row-left">{{item[14]}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">{{item[15]}}</span>
              <span class="row-right">
                <van-tag type="danger" v-if="item[18] === '审核情况：未审核'">{{item[18]}}</van-tag>
                <van-tag type="success" v-else-if="item[18] === '审核情况：已审核'">{{item[18]}}</van-tag>
                <van-tag type="danger" v-else-if="item[18] === '发货情况：未发货'">{{item[18]}}</van-tag>
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
      </div>
    </div>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { contractInfo } from "../../../assets/js/api.js";
export default {
  data() {
    return {
      list: [],
      listOrder: []
    };
  },
  computed,
  methods: {
    getList() {
      return contractInfo.getList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split(";");
            const list = eval("[[" + tsp[0]);
            this.list = list;
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
    },
    // 跳转详情
    jumpInfo(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "contractdetails"
      });
    },
    jumpPage(item) {
      this.$store.commit("contractParams", item);
      this.$router.push({
        name: "contractlabor"
      });
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.$parent.title = this.projectInfo.ProjectName;
      this.getList();
    } else {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.contractInfo {
  width: 100%;
  padding: 10px;
  .tran-data {
    margin-bottom: 40px;
    .tran-card {
      width: 100%;
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


