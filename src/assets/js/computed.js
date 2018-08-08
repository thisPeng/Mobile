'use strict'
/**
 * @file DATA映射
 * @author DJ
 */
import {
  mapState
} from 'vuex';

export default mapState({
  userId: state => {
    return state.userId;
  },
  userInfo: state => {
    return state.userInfo;
  },
  userType: state => {
    return state.userType;
  },
  loginInfo: state => {
    return state.loginInfo;
  },
  tabActive: state => {
    return state.tabActive;
  },
  taskModel: state => {
    return state.taskModel;
  },
  projectModel: state => {
    return state.projectModel;
  },
  projectInfo: state => {
    return state.projectInfo;
  },
  taskParams: state => {
    return state.taskParams;
  },
  goodsParams: state => {
    return state.goodsParams;
  },
  servePath: state => {
    return state.servePath;
  },
  tabsShow: state => {
    return state.tabsShow;
  }
})