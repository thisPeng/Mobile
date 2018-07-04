<template>
  <div class="contact">
    Contact
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";

export default {
  data() {
    return {};
  },
  methods: {},
  computed,
  mounted() {
    this.$axios({
      url: "/Sup_REST/ucml_mobile/getMenuCount_new.ashx",
      method: "get"
    }).then(res => {
      if (res) {
        console.log(res);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.contact {
  width: 100%;
}
</style>
