<template>
  <div class="message">
    <van-tabs v-model="active">
      <van-tab title="未读信息">
        <div class="message-button">
          <van-button type="default" class="button">标记已读</van-button>
        </div>
        <div class="task-table">
          <table>
            <thead>
              <tr>
                <td>
                  <van-checkbox v-model="allChecked"></van-checkbox>
                </td>
                <td>消息内容</td>
                <td>发送时间</td>
                <td>发送人</td>
              </tr>
            </thead>
            <tbody>
              <van-checkbox-group v-model="checkeds">
                <tr v-for="(item,index) in tableData" :key="item[0]">
                  <td>
                    <van-checkbox :name="index">
                      复选框 {{ item }}
                    </van-checkbox>
                  </td>
                  <td>{{item[5]}}</td>
                  <td>{{item[7]}}</td>
                  <td>{{item[18]}}</td>
                </tr>
              </van-checkbox-group>
            </tbody>
          </table>
        </div>
      </van-tab>
      <van-tab title="已读信息">哦哦</van-tab>
    </van-tabs>
    <van-pagination v-model="currentPage" :total-items="tablePages.RecordCount" :items-per-page="tablePages.PageCount" mode="simple" class="task-pages" @change="getTableData" />
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { index } from "./../../assets/js/api.js";

export default {
  data() {
    return {
      active: 0,
      tableData: [],
      tablePages: {
        RecordCount: 1,
        PageCount: 1
      },
      currentPage: 0,
      allChecked: false,
      checkeds: []
    };
  },
  methods: {
    getTableData() {}
  },
  computed,
  mounted() {
    index.getMessage().then(res => {
      console.log(res);
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
      padding-bottom: 40px;
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
