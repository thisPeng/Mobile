import store from "./store.js";

const formatDate = (date = '', fmt = 'yyyy-MM-dd') => {
  //yyyy-MM-dd hh:mm
  date = new Date(date);
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + ''
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length))
    }
  }
  return fmt
}

// 格式金额，保留两位小数
const formatMoney = str => {
  let num = parseFloat(str).toFixed(2);

  return '￥' + (num && num.toString().replace(/(\d)(?=(\d{3})+\.)/g, res => {
    return res + ",";
  }));
};

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
const deliverState = val => {
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
const orderState = val => {
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
const payState = val => {
  switch (val) {
    case "1":
      return "已付"
    default:
      return "未付";
  }
}

//状态
const typeState = val => {
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
const tradeState = val => {
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
const transState = val => {
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
const paytypeState = val => {
  switch (val) {
    case "1":
      return "支付供应商"
    case "2":
      return "退款"
    case "3":
      return "转存"
  }
}

const openState = val => {
  if (val === '1') {
    return '是'
  }
  return '否'
}

export {
  formatDate,
  codeValue,
  formatMoney,
  deliverState,
  orderState,
  typeState,
  payState,
  tradeState,
  transState,
  paytypeState,
  openState
}