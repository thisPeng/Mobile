'use strict'
/**
 * @file DATA映射
 * @author DJ
 */
import { mapState } from 'vuex';

export default mapState({
  userName: state => {
    return state.userName;
  },
  tabActive: state => {
    return state.tabActive;
  }
})