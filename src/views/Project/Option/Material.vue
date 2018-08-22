<template>
  <div class="option">

  </div>
</template>
<script>
import computed from "./../../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {},
  computed,
  mounted() {
    if (!this.projectInfo.SC_ProjectOID) {
      this.$toast("请先点击屏幕右上角按钮，选择项目");
    }
  }
};
</script>
<style lang="less" scoped>
.option {
  width: 100%;
}
</style>
