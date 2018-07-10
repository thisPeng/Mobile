import axios from "./request";

// 登录页面
const login = {
  // 账号、密码验证
  validate(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_CompleteTaskMobileService",
        _methodName: "LoginMobile",
        "_parameters[UserName]": params.loginName,
        "_parameters[Password]": params.password,
        "_parameters[DeviceID]": "",
        _paraNames: "UserName,Password,DeviceID",
        _pUrl: ""
      }
    });
  }
};

// 首页
const index = {
  // 获取首页数据
  getData() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=HOME_MSG"
    });
  },
  // 获取系统消息
  getMessage() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    })
  }
};

// 应用页
const apply = {
  // 获取应用数据
  getData() {
    return axios({
      url: "/ucml_mobile/getMenuCount_new.ashx"
    });
  }
};

// 通讯录
const contact = {
  // 获取通讯录列表
  getList() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ORG"
    });
  },
  // 获取列表详情
  getListData(id) {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ORG_SUB&OID=" + id
    });
  }
};

const users = {
  exit() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ExitSystem"
    });
  },
  userInfo() {
    return axios({
      url: "ucml_mobile/select_User_Org_Mobile.ashx?type=MYINFO"
    });
  },
  updatePwd(params) {
    return axios({
      url: "UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_ChangePWD_WXService",
        _methodName: "DoChangePassword",
        "_parameters[OldPassWord]": params.oldPwd,
        "_parameters[NewPassWord]": params.newPwd,
        "_parameters[ConfirmPassWord]": params.cfmPwd,
        _paraNames: "OldPassWord,NewPassWord,ConfirmPassWord",
        _pUrl: ""
      }
    });
  },
  saveInfo(params) {
    return axios({
      url: "ucml_mobile/select_User_Org_Mobile.ashx?type=CHANGEINFO&sex=" +
        params.sex +
        "&telno=" +
        params.telno +
        "&email=" +
        params.email +
        "&worktelno=" +
        params.worktelno
    });
  }
};

// 我的待办
const task = {
  // 获取我的待办
  getWaitData(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_TaskWait_WXService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_AssignTask_WX",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY AssignTask.SYS_Created DESC",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  getCompleteCount() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_TaskComplete_WXService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: "",
        _classFullName: ""
      }
    });
  },
  getCompleteData(page, count = 999) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_TaskComplete_WXService",
        _methodName: "getCondiActorDataBCStringPage",
        "_parameters[BCName]": "BC_CompletedTask_WX",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        "_parameters[inTotalRecord]": count,
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix,inTotalRecord",
        _pUrl: ""
      }
    });
  }
};

export {
  login,
  index,
  apply,
  contact,
  users,
  task
};