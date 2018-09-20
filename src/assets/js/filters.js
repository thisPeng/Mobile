import store from "./store.js";

const formatDate = function (dateStr, formatter = "yyyy-MM-dd") {
  if (!dateStr) {
    return "";
  }

  if (typeof dateStr === "string") {
    if (dateStr.indexOf(".") > -1) {
      // 有些日期接口返回带有.0。
      dateStr = dateStr.substring(0, dateStr.indexOf("."));
    }
    // 解决IOS上无法从dateStr parse 到Date类型问题
    dateStr = dateStr.replace(/-/g, '/');
  }
  return new Date(dateStr).Format(formatter);
};

// 格式金额，保留两位小数
const formatMoney = str => {
  let num = parseFloat(str).toFixed(2);

  return '￥' + (num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, res => {
    return res + ",";
  }));
};

// 字符转换
const codeValue = (val, code) => {
  const arr = store.state.codeValue;
  let result = "";

  for (const i in arr) {
    if (arr[i].CodeTableID == code && arr[i].CodeID == val) {
      result = arr[i].CodeName;
      break;
    }
  }
  return result;
}

// 发货状态
const deliverStatus = val => {
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
const orderStatus = val => {
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
const payStatus = val => {
  switch (val) {
    case "1":
      return "已付"
    default:
      return "未付";
  }
}

// 订单状态
const typeStatus = val => {
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

// 交易类型
const tradeStatus = val => {
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

// 资金标识
const transStatus = val => {
  switch (val) {
    case "+":
      return "收入"
    case "-":
      return "支出"
    default:
      return "其它";
  }
}

// 支付类型
const paytypeStatus = val => {
  switch (val) {
    case "1":
      return "支付供应商"
    case "2":
      return "退款"
    case "3":
      return "转存"
  }
}

// 开通状态
const openStatus = val => {
  if (val === '1') {
    return '是'
  }
  return '否'
}

// 供应商状态
const supplierStatus = val => {
  switch (val) {
    case "1":
      return "终审通过"
    case "-1":
      return "不通过"
    case "-2":
      return "已补充资料"
    case "2":
      return "初审通过"
    default:
      return "未审核"
  }
}

export {
  formatDate,
  codeValue,
  formatMoney,
  deliverStatus,
  orderStatus,
  typeStatus,
  payStatus,
  tradeStatus,
  transStatus,
  paytypeStatus,
  openStatus,
  supplierStatus
}