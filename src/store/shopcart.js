import { reqCartList, reqDeleteCartById, reqUpdateCartChecked } from "@/api";
const state = {
  cartList: [],
};
const mutations = {
  GETCARTLIST(state, cartList) {
    state.cartList = cartList;
  },
};
const actions = {
  // 获取购物车列表
  async getCartList(context) {
    const result = await reqCartList();
    if ((result.code = 200)) {
      context.commit("GETCARTLIST", result.data);
    }
  },
  // 删除购物车列表
  async deleteCartBySkuId(context, skuId) {
    const result = await reqDeleteCartById(skuId);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new error("fail"));
    }
  },

  //   切换购物车选中状态
  async updateCartChecked(context, { skuId, isChecked }) {
    let result = await reqUpdateCartChecked(skuId, isChecked);
    if (result.code == 200) {
      return "ok";
    } else {
      Promise.reject(new error("fail"));
    }
  },
  // 删除所有选中的购物车
  deleteAllCheckedCarts({ dispatch, getters }) {
    let promiseAll = [];
    getters.cartList.cartInfoList.forEach((item) => {
      let promise =
        item.isChecked == 1 ? dispatch("deleteCartBySkuId", item.skuId) : "";
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
  //修改全部产品状态
  updateAllCartIsChecked({ state, dispatch }, isChecked) {
    let promiseAll = [];
    state.cartList[0].cartInfoList.forEach((item) => {
      let promise = dispatch("updateCartChecked", {
        skuId: item.skuId,
        isChecked: isChecked,
      });
      promiseAll.push(promise);
    });
    return Promise.all(promiseAll);
  },
};
const getters = {
  cartList(state) {
    return state.cartList[0] || {};
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
