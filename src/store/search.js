import { reqGetSearchInfo } from "@/api";

const state = {
  searchList: {},
};
const mutations = {
  GETSEARCHLIST(state, searchList) {
    state.searchList = searchList;
  },
};
const actions = {
  // 获取search模块数据
  async getSearchList(context, params = {}) {
    const res = await reqGetSearchInfo(params);
    console.log(res);
    if (res.code == 200) {
      context.commit("GETSEARCHLIST", res.data);
    }
  },
};
// 简化仓库中的数据
const getters = {
  goodsList(state) {
    return state.searchList.goodsList || [];
  },
  attrsList(state) {
    return state.searchList.attrsList || [];
  },
  trademarkList(state) {
    return state.searchList.trademarkList || [];
  },
};
export default {
  state,
  mutations,
  actions,
  getters,
};
