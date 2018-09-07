"use strict";
/**
 * @file Javascript工具
 * @author DJ
 */
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) {
  // fmt = fmt.replace(/-/g, "/");
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
};

// 格式金额，保留两位小数
const formatMoney = function formatMoney(str) {
  var num = parseFloat(str).toFixed(3); //这里因为我需要两位小数所以做一个限制，你们看情况做小数位的限制
  var s = num.substring(0, num.length - 1); //只取小数位2位

  return (
    s &&
    s.toString().replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
      return $1 + ",";
    })
  );
};

// 字符转换
const codeValue = (val, code) => {
  const store = require("./store.js");
  const arr = store.state.codeValue;
  let result = "";

  for (const i in arr) {
    if (arr[i].CodeTableID === code && arr[i].CodeID === val) {
      result = arr[i].CodeName;
      break;
    }
  }
  return result;
}

// 发货状态
const deliverState = (val) => {
  switch (val) {
    case "1":
      return "未发货"
    case "2":
      return "部分发货"
    case "3":
      return "已发货"
    default:
      return "未审核";
  }
}

//申请类型
const orderState = (val) => {
  switch (val) {
    case "1":
      return "支付材料与劳务费用"
    case "2":
      return "退结余额"
    case "3":
      return "余额转预存其它项目"
    default:
      return "其它支出";
  }
}
// 单据状态
const payState = (val) => {
  switch (val) {
    case "1":
      return "已付"
    default:
      return "未付";
  }
}

//状态
const typeState = (val) => {
  switch (val) {
    case "0":
      return "未审核"
    case "1":
      return "已审批"
    case "true":
      return "审批中"
    default:
      return "待审批";
  }
}

//交易类型
const tradeState = (val) => {
  switch (val) {
    case "PK":
      return "批款"
    case "YC":
      return "预存"
    case "DJ":
      return "冻结"
    case "ZF":
      return "支付"
    case "FK":
      return "付款"
    case "JD":
      return "解冻"
    case "SQ":
      return "支付申请"
    default:
      return "扣款";
  }
}

//资金标识
const transState = (val) => {
  switch (val) {
    case "+":
      return "收入"
    case "-":
      return "支出"
    default:
      return "其它";
  }
}

//支付类型
const paytypeState = (val) => {
  switch (val) {
    case "1":
      return "支付供应商"
    case "2":
      return "退款"
    case "3":
      return "转存"
  }
}

const xmlData = function xmlData(xml, val) {
  return "<" + xml + ">" + val + "</" + xml + ">"
};

export default {
  formatMoney,
  codeValue,
  deliverState,
  orderState,
  xmlData,
  typeState,
  payState,
  tradeState,
  transState,
  paytypeState
};