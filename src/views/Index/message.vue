<template>
  <div class="message">
    <van-tabs v-model="active">
      <!--未读信息-->
      <van-tab title="未读信息">
        <div class="message-button">
          <van-button type="default" class="button">标记已读</van-button>
        </div>
        <div class="task-table">
          <van-checkbox-group v-model="unReadChk">
            <table>
              <thead>
                <tr>
                  <td>
                    <van-checkbox name="all"></van-checkbox>
                  </td>
                  <td>消息内容</td>
                  <td>发送时间</td>
                  <td>发送人</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in unReadData" :key="index">
                  <td>
                    <van-checkbox :name="index"></van-checkbox>
                  </td>
                  <td>{{item[5]}}</td>
                  <td>{{item[8]}}</td>
                  <td>{{item[3]}}</td>
                </tr>
              </tbody>
            </table>
          </van-checkbox-group>
        </div>
        <van-pagination v-model="unReadPage" :total-items="unReadPages.RecordCount" :items-per-page="unReadPages.PageCount" mode="simple" class="task-pages" @change="getUnReadData" />
      </van-tab>
      <!--已读信息-->
      <van-tab title="已读信息">
        <div class="message-button">
          <van-button type="default" class="button">删除</van-button>
        </div>
        <div class="task-table">
          <van-checkbox-group v-model="readChk">
            <table>
              <thead>
                <tr>
                  <td>
                    <van-checkbox name="all"></van-checkbox>
                  </td>
                  <td>消息内容</td>
                  <td>发送时间</td>
                  <td>发送人</td>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item,index) in readData" :key="index">
                  <td>
                    <van-checkbox :name="index"></van-checkbox>
                  </td>
                  <td>{{item[5]}}</td>
                  <td>{{item[8]}}</td>
                  <td>{{item[3]}}</td>
                </tr>
              </tbody>
            </table>
          </van-checkbox-group>
        </div>
        <van-pagination v-model="readPage" :total-items="readPages.RecordCount" :items-per-page="readPages.PageCount" mode="simple" class="task-pages" @change="getUnReadData" />
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      readData: [],
      readPages: {
        RecordCount: 1,
        PageCount: 1
      },
      readPage: 0,
      readChk: [],
      unReadData: [],
      unReadPages: {
        RecordCount: 1,
        PageCount: 1
      },
      unReadPage: 0,
      unReadChk: []
    };
  },
  methods: {
    getUnReadData() {}
  },
  computed,
  mounted() {
    index.getMessage().then(res => {
      if (res) {
        const sp = res.text.split(";");
        this.unReadData = eval(sp[1].split("=")[1]);
        this.readData = eval(sp[2].split("=")[1]);
        this.unReadPages = eval("(" + sp[15].split("=")[1] + ")");
        this.ReadPages = eval("(" + sp[16].split("=")[1] + ")");
      }
    });
  }
};
</script>
<style lang="less" scoped>
.message {
  width: 100%;
  .van-tab__pane {
    background-color: #fff;
    .message-button {
      padding: 10px 0;
      .button {
        margin: 0 10px;
        color: #fff;
        border-radius: 5px;
        background-color: #3d95d5;
      }
    }
  }

  .task-table {
    border-top: 1px solid #d2d2d2;
    table {
      width: 100%;
      font-size: 14px;
      text-align: center;
      margin-bottom: 40px;
      thead {
        tr {
          background-color: #e9f8ff;
          font-weight: 600;
        }
        td {
          padding: 10px 0;
        }
      }
      tbody {
        tr:nth-child(2n) {
          background-color: #e9f8ff;
        }
        td {
          height: 50px;
        }
        .visited {
          background-color: #b3e7ff !important;
        }
      }
    }
  }
  .task-pages {
    width: 100%;
    background-color: #f6f6f6;
    position: fixed;
    bottom: 0;
    z-index: 99;
  }
}
</style>
