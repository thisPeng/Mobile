<template>
  <div class="annex">
    <div class="annex-content">
      <cbh-upload class="annex-item" path="Order" @change="onSave" v-if="buttonValue.show && !buttonValue.disabled" />
      <div class="annex-item" v-for="(item, index) in data" :key="index">
        <div class="item-img">
          <cbh-upload :src="(servePath+item[3]).replace('..','')" :name="item[1]" :index="index" :disabled="buttonValue.disabled" @close="onDelete" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import computed from "./../../assets/js/computed.js";
import { annex, index } from "./../../assets/js/api.js";
export default {
  data() {
    return {
      data: [],
      buttonValue: {
        show: false,
        disabled: true
      }
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
            BC_SC_Supplier_DOCData: [
              { _attr: { UpdateKind: "ukInsert" } },
              { SC_Supplier_DOCDataOID: uuidv4() }, // 主键
              { FileName: result.name }, // 文件名
              { FileType: result.type }, // 文件类型
              { DOCDesc: "null" }, // 文件说明
              { FilePath: result.path }, // 文件路径
              { SupplierID: this.userInfo.oid }, // 供应商ID
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
      annex.saveSupplierAnnex(xmlString).then(res => {
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
      annex.deleteAnnex(this.data[i][3]).then(() => {
        const xml = require("xml");
        const xmlString = xml({
          root: [
            {
              BC_SC_Supplier_DOCData: [
                { _attr: { UpdateKind: "ukDelete" } },
                { SC_Supplier_DOCDataOID: this.data[i][0] } // 主键
              ]
            }
          ]
        });
        annex.saveSupplierAnnex(xmlString).then(res => {
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
      annex.getSupplierAnnex(this.userInfo.oid).then(res => {
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

      index
        .getAppletButton(this.userId.UCML_UserOID, "BPO_SC_Supplier_Edit")
        .then(res => {
          if (res.status) {
            const arr = JSON.parse(res.text);
            arr.forEach(val => {
              if (val.Allowvisible === "1" && val.text === "保存并关闭") {
                this.buttonValue.show = true;
                this.buttonValue.disabled = val.Enabled !== "1";
              }
            });
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

