<template>
  <div class="apply">
    Apply
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { apply } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  computed,
  mounted() {
    apply.getData().then(res => {
      if (res) {
        this.list = res;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.apply {
  width: 100%;
}
</style>
