<template>
  <div class="index">
    Index
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
      url: "Sup_REST/ucml_mobile/select_User_Org_Mobile.ashx?type=HOME_MSG",
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
.index {
  width: 100%;
}
</style>
