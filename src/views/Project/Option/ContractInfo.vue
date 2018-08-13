<template>
  <!-- 合同信息 -->
  <div class="contractinfo">
    <div class="conprice">
      <div class="con-data">
        <div class="con-card">
          <div class="con-item" v-for="(item,index) in list" :key="index">
            <!-- v-for="(item,index) in list" :key="index" -->
            <div class="item-title">
              <span class="title">{{item[7]}}</span>
            </div>
            <div class="item-content">
              <div class="content-row">
                <span class="row-left">{{item[9]}}</span>
                <span class="row-right">{{item[15]}}</span>
              </div>
              <div class="content-row">
                <span>{{item[11]}}</span>
              </div>
              <div class="content-row">
                <span class="row-left">{{item[12]}}</span>
                <span class="row-right">{{item[10]}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";
import { contractinfo } from "./../../../assets/js/api.js";
export default {
  data() {
    return {
      list: []
    };
  },
  computed,
  methods: {
    getList() {
      contractinfo.getList(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split("[[");
            const tsp = sp[1].split(";");
            this.list = eval("[[" + tsp[0]);
            // console.log(this.list);
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  mounted() {
    if (this.projectInfo.ProjectNo) {
      this.$parent.title = this.projectInfo.ProjectName;
      this.getList();
    } else {
      this.$toast.fail("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.conprice {
  width: 100%;
  padding: 10px;
  background-color: #eee;
  .con-data {
    margin-bottom: 40px;
    .con-card {
      width: 100%;
      .con-item {
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


