import {
  reqGetCode,
  reqUserRegister,
  requserLogin,
  reqUserInfo,
  reqLogOut,
} from "@/api";
import { setToken } from "@/utils/token";
const state = {
  code: "",
  token: localStorage.getItem("TOKEN"),
  userInfo: {},
};
const mutations = {
  GETCODE(state, code) {
    state.code = code;
  },
  USERLOGIN(state, token) {
    state.token = token;
  },
  USERINFO(state, userInfo) {
    state.userInfo = userInfo;
  },
  LOGOUT(state) {
    state.token = "";
    state.userInfo = {};
    localStorage.removeItem("TOKEN");
  },
};
const actions = {
  // 获取验证码
  async getCode(context, phone) {
    let result = await reqGetCode(phone);
    if (result.code == 200) {
      context.commit("GETCODE", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
  // 注册
  async userRegister(context, user) {
    const result = await reqUserRegister(user);
    console.log(result);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  // 登录
  async userLogin(context, data) {
    const result = await requserLogin(data);
    console.log(result);
    if (result.code == 200) {
      context.commit("USERLOGIN", result.data.token);
      //   持久化存储token
      setToken(result.data.token);
      return "ok";
    } else {
      return Promise.reject(new Error(result.message));
    }
  },

  // 自动登录
  async userInfo(context) {
    const result = await reqUserInfo();
    console.log(result);
    if (result.code == 200) {
      context.commit("USERINFO", result.data);
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },

  // 退出登录
  async logOut(context) {
    const result = await reqLogOut();
    if (result.code == 200) {
      context.commit("LOGOUT");
      return "ok";
    } else {
      return Promise.reject(new Error("fail"));
    }
  },
};
const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
