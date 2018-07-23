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
  },
  // 获取未读消息
  getUnReadMsg(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        '_parameters[BCName]': 'BC_SYS_v_OAUserMsg_Unread',
        '_parameters[nStartPos]': page * 10,
        '_parameters[nRecords]': 10,
        '_parameters[fieldList]': '',
        '_parameters[valueList]': '',
        '_parameters[condiIndentList]': '',
        '_parameters[SQLCondi]': '',
        '_parameters[SQLCondiType]': 0,
        '_parameters[SQLFix]': '',
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 获取已读系统
  getReadMsg(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        '_parameters[BCName]': 'BC_SYS_v_OAUserMsg_Read',
        '_parameters[nStartPos]': page * 10,
        '_parameters[nRecords]': 10,
        '_parameters[fieldList]': '',
        '_parameters[valueList]': '',
        '_parameters[condiIndentList]': '',
        '_parameters[SQLCondi]': '',
        '_parameters[SQLCondiType]': 0,
        '_parameters[SQLFix]': '',
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    })
  },
  // 标记已读
  markRead(id) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "MarkRead",
        '_parameters[OIDs]': id,
        _paraNames: "OIDs",
        _pUrl: ""
      }
    })
  },
  // 删除信息
  deleteMsg(id) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "DeleteOAMessageReceivers",
        '_parameters[OIDs]': id,
        _paraNames: "OIDs",
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
  // 编辑用户信息
  exit() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ExitSystem"
    });
  },
  // 获取用户信息
  userInfo() {
    return axios({
      url: "ucml_mobile/select_User_Org_Mobile.ashx?type=MYINFO"
    });
  },
  // 更新用户密码
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
  // 保存用户信息
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
  },
  // 获取统计数据
  getDemandData(id) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_ViewPage_InfoService",
        _methodName: "GetViewPageInfo",
        "_parameters[LoginUserOID]": id,
        _paraNames: "LoginUserOID",
        _pUrl: ""
      }
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
        _bpoName: "BPO_WF_TASKTICKETService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_WF_AssignTask",
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
  // 获取已完成待办数据
  getCompleteData(page) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_CompleteTaskService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_WF_CompletedTask",
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
  // 获取预存详情
  getTaskYCInfo(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_YC_InOutFormService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Money_InOut",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "InstanceID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付详情
  getTaskZFInfo(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Pay_Apply",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "InstanceID='" + params.InstanceID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付项目资金
  getTaskZFMoney(id) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "GetViewPageInfo",
        "_parameters[ProjectID]": id,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  // 保存并完成任务
  saveTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "__FinishMyTask",
        "_parameters[DeltaXml]": "<root>" +
          "<BC_WF_AssignTask_Idea UpdateKind=\"ukModify\">" +
          "<AssignTaskOID>" + parasm.TaskOID + "</AssignTaskOID>" +
          "<resolutionCode>null</resolutionCode>" +
          "<Idea>null</Idea>" +
          "<IdeaCode>null</IdeaCode>" +
          "<BusiField1>null</BusiField1>" +
          "<BusiField2>null</BusiField2>" +
          "<InstanceID>" + parasm.InstanceID + "</InstanceID>" +
          "</BC_WF_AssignTask_Idea>" +
          "<BC_WF_AssignTask_Idea UpdateKind=\"\">" +
          "<AssignTaskOID>null</AssignTaskOID>" +
          "<resolutionCode>null</resolutionCode>" +
          "<Idea>" + parasm.viewText + "</Idea>" +
          "<IdeaCode>" + parasm.code + "</IdeaCode>" +
          "<BusiField1>" + parasm.text + "</BusiField1>" +
          "<BusiField2>" + parasm.code + "</BusiField2>" +
          "<InstanceID>null</InstanceID>" +
          "</BC_WF_AssignTask_Idea>" +
          "</root>",
        "_parameters[IdeaCode]": parasm.code,
        _paraNames: "DeltaXml,IdeaCode",
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