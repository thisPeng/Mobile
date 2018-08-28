import axios from "./request";

// 登录页面
const login = {
  // 账号、密码验证
  validate(params = {}) {
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

const index = {
  // 获取首页数据
  getData() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=HOME_MSG"
    });
  }
};

const project = {
  // 获取项目列表
  getProjectList(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "GetProjectInfo",
        "_parameters[UserID]": params.oid,
        "_parameters[ProjectType]": params.type,
        _paraNames: "UserID,ProjectType",
        _pUrl: ""
      }
    });
  }
};

// 消息页面
const message = {
  // 获取消息列表
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
    });
  },
  // 获取未读消息
  getUnReadMsg(page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SYS_v_OAUserMsg_Unread",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取已读系统
  getReadMsg(page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SYS_v_OAUserMsg_Read",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 标记已读
  markRead(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "MarkRead",
        "_parameters[OIDs]": id,
        _paraNames: "OIDs",
        _pUrl: ""
      }
    });
  },
  // 删除信息
  deleteMsg(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SYS_OAMessageList_WXService",
        _methodName: "DeleteOAMessageReceivers",
        "_parameters[OIDs]": id,
        _paraNames: "OIDs",
        _pUrl: ""
      }
    });
  }
};

const classify = {
  // 所有物资分类
  getProductType() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_MaterialTypeTreeService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    });
  },
  // 获取物资筛选项
  getGoodsFilter(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "Get_MtlTypeForJS",
        "_parameters[MaterialTypeID]": params.MaterialTypeID,
        "_parameters[BrandName]": params.BrandName,
        "_parameters[SKUList]": params.SKUList,
        _paraNames: "MaterialTypeID,BrandName,SKUList",
        _pUrl: ""
      }
    });
  },
  // 获取物资列表
  getGoodsList(params = {}, page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": params.SQLCondi,
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " AND smt.SPUName LIKE '%" + params.keyword + "%' " + params.SQLFix,
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 供应商物资分类
  getSupplierType(SupplierID = "", ParentID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_SC_SMaterialTypeTreeService",
        _methodName: "Get_SC_SMaterialType",
        "_parameters[SupplierID]": SupplierID,
        "_parameters[ParentID]": ParentID,
        _paraNames: "SupplierID,ParentID",
        _pUrl: ""
      }
    });
  },
  // 获取供应商物资
  getSuppGoods(
    SupplierID = "",
    SC_SMaterialType_FK = "",
    keyword = "",
    SQLFix = "",
    StartPos = 0
  ) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProductSKUQueryService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[nStartPos]": StartPos,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Supp_ProductSKU.SupplierID='" +
          SupplierID +
          "' AND (SC_SMaterialType_FK in (select SC_SMaterialTypeOID from SC_SMaterialType where SC_SMaterialType_FK='" +
          SC_SMaterialType_FK +
          "') OR SC_SMaterialType_FK = '" +
          SC_SMaterialType_FK +
          "' )",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " AND smt.SPUName LIKE '%" + keyword + "%' " + SQLFix,
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 添加购物车
  addCart(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Supp_ProductSKU_QueryService",
        _methodName: "SaveIntentionSKU",
        "_parameters[BCName]": "BC_SC_Supp_ProductSKU",
        "_parameters[OIDCheckList]": params.OIDCheckList,
        "_parameters[PartnerID]": params.PartnerID,
        "_parameters[ProjectID]": params.ProjectID,
        "_parameters[DemandID]": params.DemandID,
        _paraNames: "OIDCheckList,PartnerID,ProjectID,DemandID",
        _pUrl: ""
      }
    });
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
  getListData(id = "") {
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
  // 获取用户ID
  userId(id = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Project_EditService",
        _methodName: "GetUserInfoOrgOID",
        "_parameters[UserOID]": id,
        _paraNames: "UserOID",
        _pUrl: ""
      }
    });
  },
  // 更新用户密码
  updatePwd(params = {}) {
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
  saveInfo(params = {}) {
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
  getDemandData(id = "") {
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

const supplier = {
  // 供应商所有列表
  getAllList(page, keyword = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_SupplierListService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_Purchase_Supplier",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "AND SC_Supplier.SupplierName LIKE '%" + keyword + "%'",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 常用供应商列表
  getList(page = 0, keyword = "", DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner_Supplier",
        "_parameters[nStartPos]": page * 10,
        "_parameters[nRecords]": 10,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "AND supp.SupplierName LIKE '%" + keyword + "%'",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 所有常用供应商列表
  getSuppList(DemandID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Partner_Supplier",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "ComSupplier.Organize_ID='" + DemandID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 收藏供应商
  addCollect(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_SupplierListService",
        _methodName: "CollectSupplier",
        "_parameters[PartnerID]": params.pid,
        "_parameters[SupplierID]": params.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  },
  //取消收藏供应商
  cancelCollect(params = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Partner_SupplierService",
        _methodName: "UnCollectSupplier",
        "_parameters[PartnerID]": params.pid,
        "_parameters[SupplierID]": params.sid,
        _paraNames: "PartnerID,SupplierID",
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
  getTaskYCInfo(params = {}) {
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
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付详情
  getTaskZFInfo(params = {}) {
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
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取支付项目资金
  getTaskZFMoney(ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Start_Apply_InfoService",
        _methodName: "GetProjectInfo",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  // 读取流程数据
  getFlowAssignData(InstanceID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "GetFlowAssignData",
        "_parameters[InstanceID]": InstanceID,
        _paraNames: "InstanceID",
        _pUrl: ""
      }
    });
  },
  // 读取审核意见列表
  getViewList(InstanceID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "GetFlowAssignIdea",
        "_parameters[InstanceID]": InstanceID,
        _paraNames: "InstanceID",
        _pUrl: ""
      }
    });
  },
  // 重新提交
  submitTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_YC_InOutFormService",
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": parasm.DeltaXml,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
        _pUrl: ""
      }
    });
  },
  // 支付重新提交
  submitZFTaskForm(parasm) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_WF_Apply_InfoService",
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": parasm.DeltaXml,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
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
        _methodName: "FinishMyTask",
        "_parameters[DeltaXml]": `<root>` +
          `<BC_WF_AssignTask_Idea UpdateKind="ukModify">` +
          `<AssignTaskOID>` +
          parasm.TaskOID +
          `</AssignTaskOID>` +
          `<resolutionCode>null</resolutionCode>` +
          `<Idea>null</Idea>` +
          `<IdeaCode>null</IdeaCode>` +
          `<BusiField1>null</BusiField1>` +
          `<BusiField2>null</BusiField2>` +
          `<InstanceID>` +
          parasm.InstanceID +
          `</InstanceID>` +
          `</BC_WF_AssignTask_Idea>` +
          `<BC_WF_AssignTask_Idea UpdateKind="">` +
          `<AssignTaskOID>null</AssignTaskOID>` +
          `<resolutionCode>null</resolutionCode>` +
          `<Idea>` +
          parasm.viewText +
          `</Idea>` +
          `<IdeaCode>` +
          parasm.code +
          `</IdeaCode>` +
          `<BusiField1>` +
          parasm.text +
          `</BusiField1>` +
          `<BusiField2>` +
          parasm.code +
          `</BusiField2>` +
          `<InstanceID>null</InstanceID>` +
          `</BC_WF_AssignTask_Idea>` +
          `</root>`,
        "_parameters[IdeaCode]": parasm.code || 0,
        "_parameters[FlowID]": parasm.FlowID,
        "_parameters[ActivityID]": parasm.ActivityID,
        "_parameters[TaskOID]": parasm.TaskOID,
        "_parameters[FInstanceID]": parasm.InstanceID,
        _paraNames: "DeltaXml,IdeaCode,FlowID,ActivityID,TaskOID,FInstanceID",
        _pUrl: ""
      }
    });
  }
};
// 购物车
const cart = {
  // 获取购物车列表
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": -1,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_IntentionSKU.ProjectID ='" + ProjectID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": " ORDER BY SupplierName ASC",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  // 获取购物车列表
  getAllList() {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "BusiViewString",
        _paraNames: "",
        _pUrl: ""
      }
    });
  },
  // 删除购物车物资
  delCartMaterials(IntentionSKUOID = '') {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "DeleteRec",
        "_parameters[IntentionSKUOID]": IntentionSKUOID,
        _paraNames: "IntentionSKUOID",
        _pUrl: ""
      }
    });
  },
  // 购物车选择
  cartSelect(ProjectID = "", OIDList = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "SetBillSelect",
        "_parameters[ProjectID]": ProjectID,
        "_parameters[OIDList]": OIDList,
        _paraNames: "ProjectID,OIDList",
        _pUrl: ""
      }
    });
  },
  // 保存购物车
  saveCart(xmlData = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xmlData,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    });
  },
  // 提交询价
  addOrder(PartnerID = "", ProjectID = "") {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_ProjectService",
        _methodName: "CreateOrderBill",
        "_parameters[PartnerID]": PartnerID,
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "PartnerID,ProjectID",
        _pUrl: ""
      }
    });
  }
};
//获取确定价格信息
const conprice = {
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJService",
        _methodName: "getBCColumnsForJS",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  //获取确认价格详情
  getInfo(PurchaseOrderID, page = 0) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Master",
        "_parameters[nStartPos]": page * 20,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_MasterOID  = '" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //获取询价单明细详情
  getDetails(PurchaseOrderID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Detail",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "PurchaseOrderID='" + PurchaseOrderID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //确认订单
  confrimPrice(PurchaseOrderID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "ConfirmOrderBill",
        "_parameters[PurchaseOrderID]": PurchaseOrderID,
        _paraNames: "PurchaseOrderID",
        _pUrl: ""
      }
    });
  },
  //提議
  conProposal(BillOID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "SendToSupplier",
        "_parameters[BillOID]": BillOID,
        _paraNames: "BillOID",
        _pUrl: ""
      }
    });
  },
  //删除
  confirmDelete(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bponame: "BPO_Order_XJService",
        _methodName: "DeleteOrderBill",
        "_parameters[BillOID]": params.BillOID,
        "_parameters[ContractID]": params.ContractID,
        _paraNames: "BillOID,ContractID",
        _pUrl: ""
      }
    });
  },
  // 合同编辑
  conContract(ContractOID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_EditService",
        _methodName: "getCondiActorDataBCString",
        "_parameters[BCName]": "BC_SC_Order_Contract",
        "_parameters[nStartPos]": 0,
        "_parameters[nRecords]": 20,
        "_parameters[fieldList]": "",
        "_parameters[valueList]": "",
        "_parameters[condiIndentList]": "",
        "_parameters[SQLCondi]": "SC_Order_ContractOID='" + ContractOID + "'",
        "_parameters[SQLCondiType]": 0,
        "_parameters[SQLFix]": "",
        _paraNames: "BCName,nStartPos,nRecords,fieldList,valueList,condiIndentList,SQLCondi,SQLCondiType,SQLFix",
        _pUrl: ""
      }
    });
  },
  //询价单明细删除
  conDetailsDelete(params) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "DeleteRec",
        "_parameters[PurchaseOrderID]": params.PurchaseOrderID,
        "_parameters[DetailOIDList]": params.DetailOIDList,
        _paraNames: "PurchaseOrderID,DetailOIDList",
        _pUrl: ""
      }
    })
  },
  //询价单明细删除增加后更新主表的合计和数量
  conUpdateDelete(PurchaseOrderID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "UpdateDetailSum",
        "_parameters[PurchaseOrderID]": PurchaseOrderID,
        _paraNames: "PurchaseOrderID",
        _pUrl: ""
      }
    })
  }
};
// 获取合同信息
const contractInfo = {
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Contract_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  },
  saveContract(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_Contract_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  },
  keepContract(xml) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_XJ_EditService",
        _methodName: "BusinessSubmit",
        "_parameters[xmlData]": xml,
        _paraNames: "xmlData",
        _pUrl: ""
      }
    })
  }
};
//获取到货信息
const arrival = {
  getList(ProjectID) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Purchase_Deliver_ListService",
        _methodName: "getBCColumnsForJS",
        "_parameters[BCName]": "BC_SC_IntentionSKU",
        "_parameters[ProjectID]": ProjectID,
        _paraNames: "ProjectID",
        _pUrl: ""
      }
    });
  }
};
//供应商物质报价
const offer = {
  getList(parasm = {}) {
    return axios({
      url: "/UCMLWebServiceEntryForJs.aspx",
      method: "post",
      data: {
        _bpoName: "BPO_Order_SetPriceService",
        _methodName: "getBCColumnsForJS",
        "_parameters[PartnerID]": parasm.pid,
        "_parameters[SupplierID]": parasm.sid,
        _paraNames: "PartnerID,SupplierID",
        _pUrl: ""
      }
    });
  }
};

export {
  login,
  index,
  project,
  classify,
  apply,
  message,
  contact,
  users,
  supplier,
  task,
  cart,
  conprice,
  contractInfo,
  arrival,
  offer
};