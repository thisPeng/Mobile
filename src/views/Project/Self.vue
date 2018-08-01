<template>
  <div class="Self">

  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { project } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      list: []
    };
  },
  methods: {},
  computed,
  mounted() {
    const params = {
      oid: this.userInfo.oid,
      type: 0
    };
    project.getProjectList(params).then(res => {
      if (res && res.status === 1) {
        const sp = res.text.split(";");
        this.list = eval(sp[0]);
        console.log(this.list);
      }
    });
  }
};
</script>
<style lang="less" scoped>
.Self {
  width: 100%;
}
</style>
