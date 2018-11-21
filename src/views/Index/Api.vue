<template>
  <section>{{access_token}}</section>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      access_token: ""
    };
  },
  mounted() {
    axios({
      url: "https://qyapi.weixin.qq.com/cgi-bin/gettoken",
      method: "get",
      withCredentials: true,
      headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      params: {
        corpid: "ww3a9020e9041cc036",
        corpsecret: "QsvDjyWKNC_PlIgcRsBAOnHEdkHZoGEbU0ZrQJYp7LI"
      }
    }).then(res => {
      this.access_token = res;
    });
  }
};
</script>
