 <template>
  <!-- 支付申请信息 -->
  <div class="application">
    <div class="app-data">
      <div class="app-card">
        <div class="app-item" v-for="(item,index) in list" :key="index">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">单号:{{item[1]}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">申请说明:{{item[10]}}</span>

            </div>
            <div class="content-row">
              <span class="row-left">申请日期:{{new Date(item[8]).Format('yyyy-MM-dd')}}</span>
              <span class="row-right" v-if="item[6] == '0'">状态 :未审核</span>
              <span class="row-right" v-else-if="item[32] == '1'">状态 :已审批</span>
              <span class="row-right" v-else-if="item[33] == 'true'">状态 :审批中</span>
               <span class="row-right" v-else-if="item[6] == '1'">状态 :待审批</span>
            </div>
            <div class="content-row">
              <span class="row-left">申请类型:{{$util.orderState(item[9])}}</span>
              <span class="row-right">申请金额:{{item[12]}}</span>
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
import computed from "./../../assets/js/computed.js";
import { arrival } from "./../../assets/js/api.js";
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
      arrival.getPaymentList(this.projectInfo.SC_ProjectOID, page).then(res => {
        if (res && res.status === 1) {
          const sp = res.text.split("[[");
          const csp = sp[1].split(";");
          this.pages = eval("(" + csp[1].split("=")[1] + ")");
          this.list = eval("[[" + csp[0]);
          // console.log(this.list);
        }
      });
    },
    pageInit() {
      this.getData();
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
    margin-bottom: 40px;
    .app-card {
      width: 100%;
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


