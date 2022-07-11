// 引入三级联动请求
import { reqCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const state = {
  categoryList: [],
  bannerList: [],
  floorList: [],
};
const mutations = {
  categoryList(state, categoryList) {
    state.categoryList = categoryList.splice(0, 16);
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  // 调用接口，获取服务器数据
  async categoryList(context) {
    let res = await reqCategoryList();
    // console.log(result);
    if (res.code == 200) {
      context.commit("categoryList", res.data);
    }
  },
  // 获取轮播图数据
  async getBannerList(context) {
    // console.log(1);
    let res = await reqGetBannerList();
    // let res = await mockRequests.get("/banner");
    console.log(res);
    if (res.code == 200) {
      context.commit("GETBANNERLIST", res.data);
    }
  },

  // 获取floor数据
  async getFloorList(context) {
    let res = await reqFloorList();
    // console.log(res);
    if (res.code == 200) {
      context.commit("GETFLOORLIST", res.data);
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
