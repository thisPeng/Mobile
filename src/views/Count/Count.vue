<template>
  <div class="count">
    <!--统计数据-->
    <div class="count-number">
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-baoyi- text-blue" /> 今年交易(￥)
          </div>
          <div class="row-content">{{data[0]}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-blue" /> {{model ? '待确认' : '待报价'}}
          </div>
          <div class="row-content">{{data[4]}}</div>
        </van-col>
      </van-row>
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-icon3 text-green" /> 总交易(￥)
          </div>
          <div class="row-content">{{data[1]}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-green" /> {{model ? '待收货' : '待发货'}}
          </div>
          <div class="row-content">{{data[5]}}</div>
        </van-col>
      </van-row>
      <van-row class="count-row">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-duizhangdan text-orange" /> {{model ? '总应付(￥)' : '总应收(￥)'}}
          </div>
          <div class="row-content">{{data[2]}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-orange" /> {{model ? '项目数' : '待收款(￥)'}}
          </div>
          <div class="row-content">{{data[6]}}</div>
        </van-col>
      </van-row>
      <van-row class="count-row" v-if="model">
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-daifukuan text-red" /> {{model ? '待付款(￥)' : '待收款(￥)'}}
          </div>
          <div class="row-content">{{data[3]}}</div>
        </van-col>
        <van-col span="12">
          <div class="row-title">
            <i class="iconfont icon-qizi text-red" /> 待盖章
          </div>
          <div class="row-content">{{data[7]}}</div>
        </van-col>
      </van-row>
    </div>

    <!--统计排行-->
    <div class="count-chart">
      <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
    </div>

    <div class="count-chart">
      <div id="myChart2" :style="{width: '100%', height: '300px'}"></div>
    </div>

    <div class="count-chart">
      <div id="myChart3" :style="{width: '100%', height: '300px'}"></div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { users } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      data: [],
      model: true,
      tableData1: [],
      tableData2: [],
      tableData3: []
    };
  },
  methods: {
    drawLine() {
      const that = this;

      let names = [],
        datas = [];

      if (that.model) {
        // 交易排行榜 Top 5
        that.tableData1.forEach(val => {
          names.push(val[1]);
          datas.push(val[3]);
        });
      } else {
        // 我的销售排行榜 Top 5
        that.tableData3.forEach(val => {
          names.push(val[1]);
          datas.push(val[3]);
        });
      }
      let chart1 = this.$echarts.init(document.getElementById("myChart1"));
      chart1.setOption({
        title: {
          text: that.model ? "交易排行榜 Top 5" : "我的销售排行榜 Top 5"
        },
        tooltip: {
          trigger: "axis"
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "value",
            splitNumber: 3
          }
        ],
        yAxis: [
          {
            type: "category",
            data: names,
            axisLabel: {
              interval: 0,
              formatter: function(value) {
                return value.split("").join("\n");
              }
            }
          }
        ],
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: 30,
            data: datas
          }
        ]
      });

      names = [];
      datas = [];
      that.tableData2.forEach(val => {
        names.push(val[1]);
        datas.push({
          name: val[1],
          value: val[3]
        });
      });

      // 合作商排行榜
      let chart2 = this.$echarts.init(document.getElementById("myChart2"));
      chart2.setOption({
        title: {
          text: that.model ? "合作商排行榜 Top 5" : "客户排行榜 Top 5",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br >￥{c} ({d}%)",
          position: function(point, params, dom) {
            var posDis = window.innerWidth - dom.offsetWidth;
            return posDis < point[0] ? [posDis, "10%"] : [point[0], "10%"];
          }
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "center",
          data: names
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "left",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "交易额",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: datas
          }
        ]
      });

      names = [];
      datas = [];
      if (that.model) {
        // 供应商排行榜 Top 5
        that.tableData3.forEach(val => {
          names.push(val[1]);
          datas.push({
            name: val[1],
            value: val[3]
          });
        });
      } else {
        // 项目公开 Top 5
        that.tableData1.forEach(val => {
          names.push(val[1]);
          datas.push({
            name: val[1],
            value: val[3]
          });
        });
      }

      let chart3 = this.$echarts.init(document.getElementById("myChart3"));
      chart3.setOption({
        title: {
          text: that.model ? "供应商排行榜 Top 5" : "项目公开 Top 5",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{b}<br >￥{c} ({d}%)",
          position: function(point, params, dom) {
            var posDis = window.innerWidth - dom.offsetWidth;
            return posDis < point[0] ? [posDis, "10%"] : [point[0], "10%"];
          }
        },
        legend: {
          orient: "vertical",
          x: "right",
          y: "center",
          data: names
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: {
              show: true,
              type: ["pie", "funnel"],
              option: {
                funnel: {
                  x: "25%",
                  width: "50%",
                  funnelAlign: "center",
                  max: 1548
                }
              }
            },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        series: [
          {
            name: "金额",
            type: "pie",
            radius: ["50%", "70%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                }
              }
            },
            data: datas
          }
        ]
      });

      // 自适应大小
      window.addEventListener("resize", function() {
        chart1.resize();
        chart2.resize();
        chart3.resize();
      });
    }
  },
  computed,
  mounted() {
    // 初始化获取数据
    const that = this;
    users.userInfo().then(result => {
      this.$store.commit("userInfo", result);
      if (result.oid) {
        users.getDemandData(result.oid).then(res => {
          if (res && res.status === 1) {
            const sp = res.text.split(";");
            that.data = eval(sp[1].split("=")[1])[0];
            that.tableData1 = eval(sp[2].split("=")[1]);
            that.tableData2 = eval(sp[3].split("=")[1]);
            that.tableData3 = eval(sp[4].split("=")[1]);
            that.model = that.data.length > 8;
            that.drawLine();
          }
        });
      }
    });
  }
};
</script>
<style lang="less" scoped>
.count {
  width: 100%;
  padding-bottom: 50px;
  .count-number {
    background-color: #fff;
    .count-row {
      .van-col {
        height: 120px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        border: 1px solid #eee;
        .row-title {
          color: #999;
          font-size: 12px;
        }
        .row-content {
          padding-top: 10px;
          font-weight: 800;
          font-size: 16px;
        }
      }
    }
  }
  .count-chart {
    margin-top: 10px;
    background-color: #fff;
  }
}
</style>
