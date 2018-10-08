<template>
  <div class="annex">
    <div class="annex-content">
      <cbh-upload class="annex-item" path="Contract" @change="onSave" />
      <div class="annex-item" v-for="(item, index) in data" :key="index">
        <div class="item-img">
          <cbh-upload :src="(servePath+item[4]).replace('..','')" :name="item[1]" :index="index" @close="onDelete" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { annex } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      data: []
    };
  },
  computed,
  methods: {
    onSave(result) {
      const uuidv4 = require("uuid/v4");
      const xml = require("xml");
      const xmlString = xml({
        root: [
          {
            BC_SC_Order_DOCData: [
              { _attr: { UpdateKind: "ukInsert" } },
              { SC_Order_DOCDataOID: uuidv4() }, // 主键
              { FileName: result.name }, // 文件名
              { FileType: result.type }, // 文件类型
              { DOCDesc: "null" }, // 文件说明
              { FilePath: result.path }, // 文件路径
              {
                PurchaseOrderID:
                  this.userType == 3
                    ? this.confirmParams[23]
                    : this.confirmParams[4]
              }, // 订单类型
              { SYS_Created: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 创建日期
              { SYS_LAST_UPD: new Date().Format("yyyy-MM-dd hh:mm:ss") }, // 最后修改日期
              { SYS_Deleted: "null" }, // 记录删除标记
              { SYS_CreatedBy: this.userId.UCML_UserOID }, // 创建用户
              { SYS_REPLACEMENT: "null" }, // 授权用户
              { SYS_POSTN: this.userId.UCML_PostOID }, // 所属岗位
              { SYS_DIVISION: this.userId.UCML_DivisionOID }, // 所属部门
              { SYS_ORG: this.userId.UCML_OrganizeOID }, // 所属组织
              { SYS_LAST_UPD_BY: this.userInfo.oid } // 最后修改用户
            ]
          }
        ]
      });
      annex.saveAnnex(xmlString).then(res => {
        try {
          if (res.status === 1) location.reload();
          else throw res.text;
        } catch (e) {
          this.$toast.fail(e);
        }
      });
    },
    // 删除图片
    onDelete(result) {
      const i = result.index;
      annex.deleteAnnex(this.data[i][4]).then(() => {
        const xml = require("xml");
        const xmlString = xml({
          root: [
            {
              BC_SC_Order_DOCData: [
                { _attr: { UpdateKind: "ukDelete" } },
                { SC_Order_DOCDataOID: this.data[i][0] } // 主键
              ]
            }
          ]
        });
        annex.saveAnnex(xmlString).then(res => {
          try {
            if (res.status === 1) location.reload();
            else throw res.text;
          } catch (e) {
            this.$toast.fail(e);
          }
        });
      });
    },
    pageInit() {
      annex
        .getContractAnnex(
          this.userType == 3 ? this.confirmParams[23] : this.confirmParams[4]
        )
        .then(res => {
          try {
            if (res.status === 1) {
              const sp = res.text.split("[[");
              const dsp = sp[1].split(";");
              const arr = eval("[[" + dsp[0]);
              this.data = arr;
            }
          } catch (e) {
            this.data = [];
          }
        });
    }
  },
  mounted() {
    this.pageInit();
  }
};
</script>
<style lang="less" scoped>
.annex {
  width: 100%;
  padding: 10px;
  .annex-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .annex-item {
      width: 125px;
      margin-bottom: 5px;
    }
  }
}
</style>

