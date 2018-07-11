<template>
  <div class="taskdemo">
    <van-cell-group>
      <!-- 采购单号 -->
      <van-field v-model="purchase" label="采购单号" disabled/>
      <!-- 单据日期 -->
      <!-- <div class="task-djdate">
        <van-field v-model="djDate" label="单据日期" disabled/>
      </div> -->
      <div class="task-upload">
        <span class="task-djdate">单据日期</span>
      </div>
      <!-- 要求交期 -->
      <div class="task-yqdate">
        <van-field v-model="yqDate" label="要求交期" disabled/>
      </div>
      <!-- 联系人 -->
      <van-field v-model="tdContact" label="联系人" disabled/>
      <!-- 联系电话 -->
      <van-field v-model="tdPhone" label="联系电话" disabled/>
      <!-- 联系地址 -->
      <van-field v-model="tdAddress" label="联系地址" disabled/>
      <!-- 来源类型 -->
      <div class="task-type">
        <van-field v-model="tdType" label="来源类型" disabled/>
      </div>
      <!-- 总金额 -->
      <div class="task-upload">
        <span class="task-label">总金额</span>
        <van-field v-model="tdMoney" />

      </div>
      <!-- 单据状态 -->
      <div class="task-state">
        <van-field v-model="tdState" label="单据状态" disabled/>
      </div>
      <!-- 备注 -->
      <div class="task-remark">
        <van-field v-model="tdRemark" label="备注" disabled/>
      </div>
      <!-- 业务状态 -->
      <div class="task-ywstate">
        <van-field v-model="tdyeState" label="业务状态" disabled/>
      </div>
      <!-- 制单人 -->
      <van-field v-model="tdZiDan" label="制单人" disabled/>
      <!-- 制单日期 -->
      <div class="task-zddate">
        <van-field v-model="tdzdDate" label="制单日期" disabled/>
      </div>
      <!-- 供应商编码 -->
      <van-field v-model="tdBianMa" label="供应商编码" disabled/>
      <!-- 供应商名称 -->
      <van-field v-model="tdName" label="供应商名称" disabled/>
      <!-- 采购单位 -->
      <van-field v-model="tdDanwei" label="采购单位" disabled/>
      <!-- 财务对接人 -->
      <van-field v-model="tdDuiJie" label="财务对接人" disabled/>
      <!-- 采购单位负责人 -->
      <div class="task-upload">
        <span class="task-label">采购单位负责人</span>
        <van-field v-model="tdFuZhe" disabled/>
      </div>
      <!-- 承办名称 -->
      <van-field v-model="tdCBName" label="承办名称" disabled/>
    </van-cell-group>
    <!-- 上传图片 -->
    <van-cell-group class="task-upload">
      <span class="task-photo">上传图片</span>
      <van-uploader :after-read="onRead">
        <van-icon name="photograph" />
      </van-uploader>
    </van-cell-group>
    <div class="task-upload task-border">
      <span class="flow">流程处理</span>
    </div>
    <van-cell-group>
      <van-field v-model="spView" label="审批意见" disabled/>
      <van-field v-model="lrView" label="录入意见" />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {
      purchase: "CGD0035",
      // djDate: "-年-月-日",
      yqDate: "-年-月-日",
      tdContact: "",
      tdPhone: "",
      tdAddress: "",
      tdType: "",
      tdMoney: "",
      tdState: "",
      tdRemark: "",
      tdyeState: "",
      tdZiDan: "",
      tdzdDate: "",
      tdBianMa: "",
      tdName: "",
      tdDanwei: "",
      tdDuiJie: "",
      tdFuZhe: "",
      tdCBName: "",
      spView: "",
      lrView: ""
    };
  },
  methods: {
    onRead(file) {
      console.log(file);
    }
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.taskdemo {
  width: 100%;
  .task-upload {
    display: flex;
    padding: 10px 15px;
    box-sizing: border-box;
    line-height: 24px;
    position: relative;
    background-color: #fff;
    color: #333;
    font-size: 14px;
    overflow: hidden;
    .task-photo {
      min-width: 90px;
      flex: 30;
    }
    .task-upPhoto {
      flex: 5;
    }
    .task-flow {
      height: 30px;
    }
    .flow {
      margin: 0 auto;
      // border: 1px solid #190fa1;
    }
    .task-djdate {
      color: red;
    }
    .task-label {
      color: red;
      width: 40%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
  .task-border {
    color: #3d95d5;
    border-bottom: 3px solid #3d95d5;
  }
}
</style>





