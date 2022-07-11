import { reqGoodsInfo, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from "@/utils/uuid_token";

const state = {
  goodsInfo: {},
  //   游客临时身份
  uuid_token: getUUID(),
};
const mutations = {
  GETGOODSINFO(state, goodsInfo) {
    state.goodsInfo = goodsInfo;
  },
};
const actions = {
  // 获取产品信息
  async getGoodsInfo(context, skuId) {
    let result = await reqGoodsInfo(skuId);
    if (result.code == 200) {
      context.commit("GETGOODSINFO", result.data);
      console.log(result.data);
    }
  },

  // 添加购物车
  async addOrUpdateShopCart(context, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum);
    if (result.code == 200) {
      return "ok";
    } else {
      return Promise.reject(new error("fail"));
    }
  },
};
const getters = {
  categoryView(state) {
    // {}的属性值为undefined，不会报错
    return state.goodsInfo.categoryView || {};
  },
  skuInfo(state) {
    return state.goodsInfo.skuInfo || {};
  },
  // 产品售卖属性简化
  spuSaleAttrList(state) {
    return state.goodsInfo.spuSaleAttrList || [];
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
