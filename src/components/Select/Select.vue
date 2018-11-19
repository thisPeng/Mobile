<template>
  <div class="select">
    <van-cell-group>
      <van-cell :title="label">
        <select class="cbhSelect" v-model="result" @change="onChange">
          <option value="">请选择</option>
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
    data: {
      type: Array,
      default: () => []
    },
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
    },
    model: {
      type: [String, Number],
      default: ""
    }
  },
  computed,
  methods: {
    getData() {
      const params = {
        id: this.model == 1 ? this.userId.UCML_OrganizeOID : "",
        code: this.code
      };
      return index.getConfig(params).then(res => {
        try {
          if (res.status === 1) {
            this.list = JSON.parse(res.text);
            return true;
          }
          return false;
        } catch (e) {
          console.log(e);
          return false;
        }
      });
    },
    onChange() {
      this.$emit("change", this.result);
    }
  },
  mounted() {
    if (this.code) {
      this.getData().then(res => {
        if (res) {
          this.$nextTick(() => {
            setTimeout(() => {
              this.result = this.value;
            }, 10);
          });
        }
      });
    } else if (this.data) {
      this.list = this.data;
      this.$nextTick(() => {
        setTimeout(() => {
          this.result = this.value;
        }, 10);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.select {
  width: 100%;
  .cbhSelect {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
