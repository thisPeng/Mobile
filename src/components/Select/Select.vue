<template>
  <div class="select">
    <van-cell-group>
      <van-cell :title="label">
        <select class="cbhSelect" v-model="result" @change="onChange">
          <option>请选择</option>
          <option v-for="(item,index) in list" :key="index" :value="item.CodeID">{{item.CodeName}}</option>
        </select>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      result: this.value,
      list: []
    };
  },
  props: {
    label: {
      type: String,
      default: ""
    },
    code: {
      type: String,
      default: ""
    },
    value: {
      type: [String, Number],
      default: ""
    }
  },
  computed,
  methods: {
    getData() {
      const params = {
        id: this.userInfo.oid,
        code: this.code
      };
      return index.getConfig(params).then(res => {
        try {
          if (res.status === 1) {
            this.list = JSON.parse(res.text);
            this.$nextTick(() => {
              setTimeout(() => {
                this.result = this.value;
              }, 1000);
            });
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    onChange() {
      this.$emit("change", this.result);
    }
  },
  created() {
    this.getData();
  }
};
</script>
<style lang="less" scoped>
.select {
  width: 100%;
  .cbhSelect {
    width: 100%;
  }
}
</style>
