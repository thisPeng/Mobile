 <template>
 <!-- 支付申请信息 -->
  <div class="application">
    <div class="app-data">
      <div class="app-card">
        <div class="app-item" v-for="(item,index) in list" :key="index">
          <!-- v-for="(item,index) in list" :key="index" -->
          <div class="item-title">
            <span class="title">单号:{{item.consturction}}</span>
          </div>
          <div class="item-content">
            <div class="content-row">
              <span class="row-left">申请说明:{{item.fhid}}</span>
              <span class="row-right">申请金额:{{item.zddate}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">状态 :{{item.htmoney}}</span>
              <span class="row-right">申请日期:{{item.qddate}}</span>
            </div>
            <div class="content-row">
              <span class="row-left">申请类型:{{item.htmoney}}</span>
              <span class="row-right">发货金额:{{item.qddate}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
export default {
  data() {
    return {
      list:[]
    };
  },
  computed,
  methods: {}
};
</script>
<style lang="less" scoped>
.application {
  width: 100%;
  height: 100%;
  padding: 10px;
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


