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

// 应用页
const contact = {
  // 获取应用数据
  getList() {
    return axios({
      url: "/ucml_mobile/select_User_Org_Mobile.ashx?type=ORG"
    });
  },
  // 获取应用数据
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
  }
};

export { login, index, apply, contact, users };
