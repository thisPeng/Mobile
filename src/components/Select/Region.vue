<template>
  <div class="region">
    <van-cell-group>
      <van-cell title="省份：">
        <select class="taskSelect" v-model="provRes" @change="districtRes=cityRes='';onChangeP()">
          <option value="">请选择</option>
          <option v-for="(item,index) in regionP" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </van-cell>
      <van-cell title="城市：">
        <select class="taskSelect" v-model="cityRes" @change="districtRes='';onChangeC()">
          <option value="">请选择</option>
          <option v-for="(item,index) in regionC" :key="index" :value="item.id">{{item.name}}</option>
        </select>
      </van-cell>
      <van-cell title="区域：">
        <select class="taskSelect" v-model="districtRes" @change="onChangeX()">
          <option value="">请选择</option>
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
      provRes: "",
      cityRes: "",
      districtRes: "",
      regionP: [],
      regionC: [],
      regionX: []
    };
  },
  computed,
  props: {
    prov: {
      type: String,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    district: {
      type: String,
      default: ""
    }
  },
  methods: {
    getRegional(BCName, SQLCondi) {
      return index.getRegional(BCName, SQLCondi).then(res => {
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
              return true;
            } else if (BCName === "BC_SC_RegionalData_X") {
              this.regionX = arr;
              return true;
            } else {
              this.regionP = arr;
              this.regionC = this.regionX = [];
              return true;
            }
          }
        } catch (e) {
          console.log(e);
          return false;
        }
      });
    },
    // 获取城市数据
    getCity(val) {
      this.getRegional("BC_SC_RegionalData_C", "ParentOID='" + val + "'");
    },
    // 获取县/区域数据
    getDistrict(val) {
      this.getRegional("BC_SC_RegionalData_X", "ParentOID='" + val + "'");
    },
    // 选择省份，重新获取城市数据
    onChangeP() {
      this.getCity(this.provRes);
    },
    // 选择城市，重新获取县/区域数据
    onChangeC() {
      this.getDistrict(this.cityRes);
    },
    onChangeX() {
      let provStr = "",
        cityStr = "",
        districtStr = "";
      for (const i in this.regionP) {
        if (this.regionP[i].id == this.provRes) {
          provStr = this.regionP[i].name;
          break;
        }
      }
      for (const i in this.regionC) {
        if (this.regionC[i].id == this.cityRes) {
          cityStr = this.regionC[i].name;
          break;
        }
      }
      for (const i in this.regionX) {
        if (this.regionX[i].id == this.districtRes) {
          districtStr = this.regionX[i].name;
          break;
        }
      }
      const params = {
        prov: this.provRes,
        city: this.cityRes,
        district: this.districtRes,
        provStr,
        cityStr,
        districtStr
      };
      this.$emit("change", params);
    }
  },
  mounted() {
    this.getRegional().then(() => {
      this.provRes = this.prov;
      this.cityRes = this.city;
      this.$nextTick(() => {
        this.onChangeP();
        this.districtRes = this.district;
        this.$nextTick(this.onChangeC);
      });
    });
  }
};
</script>
<style lang="less" scoped>
.region {
  width: 100%;
  .taskSelect {
    width: 100%;
    height: 100%;
    background-color: #fff;
  }
}
</style>
