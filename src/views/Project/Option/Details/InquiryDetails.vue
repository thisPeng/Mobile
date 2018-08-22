<template>
  <!-- 询价单明细详情编辑 -->
  <div class="inquirydetails">
    <van-cell-group>
      <van-field v-model="infoDetails[4]" label="品名:" disabled />
      <van-field v-model="infoDetails[8]" label="规格/型号:" disabled />
      <van-field v-model="infoDetails[10]" label="实际数量:" />
      <van-field v-model="infoDetails[12]" label="赠送数量:" disabled />
      <van-field v-model="infoDetails[28]" label="单位:" disabled />
      <van-field v-model="infoDetails[13]" label="实价:" disabled />
      <van-field v-model="infoDetails[15]" label="小计:" disabled />
      <van-field v-model="infoDetails[16]" label="税率:" />
      <van-field v-model="infoDetails[16]" label="备注:" />
      <van-field v-model="infoDetails[16]" label="产品编码:" disabled />
    </van-cell-group>
    <div class="deletebutton">
      <van-button type="danger">删除</van-button>
    </div>
  </div>
</template>
<script>
import computed from "./../../../../assets/js/computed.js";
export default {
  data() {
    return {};
  },
  // methods: {
  //   fn_getxmlKind(bcname, value, mode) {
  //     if (mode == 0) {
  //       return "<(" + bcname + ",  UpdateKind=" + value + ">";
  //     } else {
  //       return "<\\" + bcname + ">";
  //     }
  //   },
  //   fn_getxmlfied(fiedname, value) {
  //     return "<" + fiedname + ">" + value + "<//fiedname>";
  //   },
  //  fn_getxmlroot(str) {
  //     let s = "<root>" + str + "<\\root>";
  //     return s;
  //   }
  // },

  computed,
  methods: {
    //   fn_getxml(s) {
    //     // let s = '';
    //     // s = fn_getxmlKind("BC_SC_Order_Detail", "ukModify", 0);
    //     s = this.function.fn_getxmlroot("str");
    //     console.log(s);
    //   }
    // },
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.inquirydetails {
  width: 100%;
  .deletebutton {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .van-button--normal {
    padding: 0px 46px;
    font-size: 15px;
  }
}
</style>
