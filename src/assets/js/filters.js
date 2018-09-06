import store from "./store.js";

const formatDate = (date, fmt) => {
  //yyyy-MM-dd hh:mm
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
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
    }
  }
  return fmt
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length)
}

const codeValue = (val, code) => {
  const arr = store.state.codeValue;
  let result = "";

  for (const i in arr) {
    if (arr[i].CodeTableID === code && arr[i].CodeID === val) {
      result = arr[i].CodeName;
      break;
    }
  }
  // arr.filter(x => {
  //   if (x.CodeTableID === code && x.CodeID === val) {
  //     result = x.CodeName;
  //   }
  // })
  return result;
}

export {
  formatDate,
  codeValue
}