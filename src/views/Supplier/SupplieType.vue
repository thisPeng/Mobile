<template>
  <div class="supplie-type">
    <stp />
  </div>
</template>
<script>
import stp from "./../../components/Classify/Supplier";
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    stp
  },
  computed,
  mounted() {
    this.$nextTick().then(() => {
      if (this.projectInfo.SC_ProjectOID) {
        this.$parent.title = this.projectInfo.ProjectName;
      } else {
        this.$toast.fail("请先点击屏幕右上角按钮，选择项目");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.supplie-type {
  width: 100%;
  overflow: hidden !important;
}
</style>
