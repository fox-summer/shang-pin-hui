import { reqUserAddress, reqOrderInfo } from "@/api";

const state = {
  address: [],
  orderInfo: {},
};
const mutations = {
  GETUSERADDRESS(state, address) {
    state.address = address;
  },
  GETORDERINFO(state, orderInfo) {
    state.orderInfo = orderInfo;
  },
};
const actions = {
  // 获取用户地址
  async getUserAddress(context) {
    const result = await reqUserAddress();
    // console.log(result);
    if (result.code == 200) {
      context.commit("GETUSERADDRESS", result.data);
    }
  },

  //获取商品订单
  async getOrderInfo(context) {
    const result = await reqOrderInfo();
    // console.log(result);
    if (result.code == 200) {
      context.commit("GETORDERINFO", result.data);
      return "ok";
    } else {
      Promise.reject(new Error("fail"));
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
