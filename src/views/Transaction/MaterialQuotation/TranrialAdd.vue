<template>
  <div class="supplie-type">
    <stp />
  </div>
</template>
<script>
import stp from "./../../../components/Classify/Supplier";
import computed from "./../../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    stp
  },
  computed,
  mounted() {}
};
</script>
<style lang="less" scoped>
.supplie-type {
  width: 100%;
  overflow: hidden !important;
}
</style>
