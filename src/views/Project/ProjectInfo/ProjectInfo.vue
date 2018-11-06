<template>
  <!-- 项目信息 -->
  <div class="projectInfo">
    <van-cell-group>
      <van-field :value="info[2]" label="工程编号：" disabled />
      <van-field :value="info[55]" label="项目编号：" disabled />
      <van-field :value="info[1]" label="工程名称：" disabled />
      <van-field :value="info[57]" label="业务类型：" disabled />
      <van-field :value="info[18]" label="工程地址：" disabled />
      <van-field :value="info[21]" label="联系人：" disabled />
      <van-field :value="info[24]" label="联系电话：" disabled />
      <van-field :value="info[25]" label="登记时间：" disabled />
      <van-field :value="info[34]" label="合作商名称：" disabled />
      <van-field :value="info[49]" label="单位电话：" disabled />
      <van-field :value="info[31]" label="工程单位：" disabled />
      <van-field :value="this.projectInfo.pro_TypeName" label="项目类型：" disabled />
      <van-field :value="info[26]" label="合作方式：" disabled />
      <van-field :value="info[27]" label="工程造价：" disabled />
      <van-field :value="info[28] | codeValue('CodeTable_CalType')" label="计征方式：" disabled />
      <van-field :value="info[29] | codeValue('CodeTable_CalArea')" label="计征区域：" disabled />
      <van-field :value="info[30]" label="税务组织：" disabled />
      <van-field :value="info[6] | codeValue('CodeTable_opening')" label="项目状态：" disabled />
      <van-field :value="info[4]" label="工期：" disabled />
      <van-field :value="info[17] | openStatus" label="公开状态：" disabled />
      <van-field :value="info[4]" label="开通时间：" disabled />
      <van-field :value="info[5]" label="到期时间：" disabled />
      <van-field :value="info[22]" label="建设单位：" disabled />
      <van-field :value="info[7]" label="备注：" disabled />
    </van-cell-group>
  </div>
</template>
<script>
import computed from "../../../assets/js/computed.js";
import { project } from "../../../assets/js/api.js";

export default {
  data() {
    return {
      info: {}
    };
  },
  computed,
  methods: {
    getData() {
      project.getParojectInfo(this.projectInfo.SC_ProjectOID).then(res => {
        try {
          if (res.status === 1) {
            const sp = res.text.split(";");
            this.info = eval(sp[0].split("=")[1])[0];
            const defaultDate = "1900-01-01 00:00:00";
            if (this.info[4] === defaultDate) this.info[4] = "";
            if (this.info[5] === defaultDate) this.info[5] = "";
            if (this.info[45] === defaultDate) this.info[45] = "";
            if (this.info[46] === defaultDate) this.info[46] = "";
            if (this.info[47] === defaultDate) this.info[47] = "";
          }
        } catch (e) {
          console.log(e);
        }
      });
    }
  },
  mounted() {
    if (this.projectInfo.SC_ProjectOID) {
      this.getData();
    } else {
      this.$toast.fail("请选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.projectInfo {
  width: 100%;
  .van-cell {
    font-size: 15px;
    color: rgb(153, 148, 148);
  }
}
</style>


