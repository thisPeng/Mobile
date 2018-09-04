<template>
  <div class="region">
    <van-cell-group>
      <van-cell title="省份：">
        <select class="taskSelect" v-model="pid" @change="onChangeP">
          <option v-for="(item,index) in regionP" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </van-cell>
      <van-cell title="城市：">
        <select class="taskSelect" v-model="cid" @change="onChangeC">
          <option v-for="(item,index) in regionC" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </van-cell>
      <van-cell title="区域：">
        <select class="taskSelect" v-model="xid">
          <option v-for="(item,index) in regionX" :key="index" :value="item.id">{{item.name}}</option>
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
      pid: "",
      cid: "",
      xid: "",
      regionP: [],
      regionC: [],
      regionX: []
    };
  },
  computed,
  methods: {
    getRegional(BCName, SQLCondi) {
      index.getRegional(BCName, SQLCondi).then(res => {
        try {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            let tmp = eval(sp[0].split("=")[1]);
            let arr = [];
            tmp.filter(x =>
              arr.push({
                id: x[0],
                name: x[2],
                pid: x[4]
              })
            );
            if (BCName === "BC_SC_RegionalData_C") {
              this.regionC = arr;
              this.regionX = [];
            } else if (BCName === "BC_SC_RegionalData_X") {
              this.regionX = arr;
            } else {
              this.regionP = arr;
              this.regionC = [];
              this.regionX = [];
            }
          }
        } catch (e) {
          console.log(e);
        }
      });
    },
    onChangeP() {
      this.getRegional("BC_SC_RegionalData_C", "ParentOID='" + this.pid + "'");
    },
    onChangeC() {
      this.getRegional("BC_SC_RegionalData_X", "ParentOID='" + this.cid + "'");
    }
  },
  mounted() {
    this.getRegional();
  }
};
</script>
<style lang="less" scoped>
.region {
  width: 100%;
  .taskSelect {
    width: 100%;
  }
}
</style>
