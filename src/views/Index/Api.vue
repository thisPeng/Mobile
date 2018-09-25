<template>
  <section>{{access_token}}</section>
</template>
<script>
export default {
  data() {
    return {
      access_token: ""
    };
  },
  mounted() {
    this.$axios
      .get(
        "//qyapi.weixin.qq.com/cgi-bin/gettoken?corpid=ww3a9020e9041cc036&corpsecret=QsvDjyWKNC_PlIgcRsBAOnHEdkHZoGEbU0ZrQJYp7LI"
      )
      .then(res => {
        this.access_token = res;
      });
  }
};
</script>
