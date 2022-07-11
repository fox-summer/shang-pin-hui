// api进行统一的管理
import requests from "./request";
import mockRequests from "@/api/mockAjax.js";

// 三级联动请求'
// 发送axios请求，返回promise对象
export const reqCategoryList = () =>
  requests({ url: "/product/getBaseCategoryList", method: "get" });

// 获取轮播图
export const reqGetBannerList = () => {
  // console.log(2);
  return mockRequests.get("/banner");
};

// 获取Floor数据
export const reqFloorList = () => {
  return mockRequests.get("/floor");
};

export const reqGetSearchInfo = (params) => {
  return requests({ url: "/list", method: "post", data: params });
};

export const reqGoodsInfo = (skuId) => {
  return requests({ url: `/item/${skuId}`, method: "get" });
};

// 添加购物车
export const reqAddOrUpdateShopCart = (skuId, skuNum) => {
  return requests({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

export const reqCartList = () => {
  return requests({
    url: "/cart/cartList",
    method: "get",
  });
};

// 删除购物车
export const reqDeleteCartById = (skuId) => {
  return requests({
    url: `/cart/deleteCart/${skuId}`,
    method: "DELETE",
  });
};

// 切换购物车选中状态
export const reqUpdateCartChecked = (skuID, isChecked) => {
  return requests({
    url: `/cart/checkCart/${skuID}/${isChecked}`,
    method: "GET",
  });
};

// 获取验证码
export const reqGetCode = (phone) => {
  return requests({
    url: `/user/passport/sendCode/${phone}`,
    method: "get",
  });
};

// 用户注册
export const reqUserRegister = (data) => {
  return requests({
    url: "/user/passport/register",
    method: "post",
    data,
  });
};

// 用户登录
export const requserLogin = (data) => {
  return requests({
    url: "/user/passport/login",
    method: "POST",
    data,
  });
};

// 获取用户信息
export const reqUserInfo = () => {
  return requests({
    url: "/user/passport/auth/getUserInfo",
    method: "get",
  });
};

// 退出登录
export const reqLogOut = () => {
  return requests({
    url: "/user/passport/logout",
    method: "get",
  });
};

// 获取用户地址信息
export const reqUserAddress = () => {
  return requests({
    url: "/user/userAddress/auth/findUserAddressList",
    method: "get",
  });
};

// 获取商品清单信息
export const reqOrderInfo = () => {
  return requests({
    url: "/order/auth/trade",
    method: "get",
  });
};

// 提交订单
export const reqSubmitOrder = (tradeNo, data) => {
  return requests({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    data,
  });
};

// 获取订单支付信息
export const reqOrderPayInfo = (orderId) => {
  return requests({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};

// 获取支付状态
export const reqPayStatus = (orderId) => {
  return requests({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "GET",
  });
};

// 获取我的订单信息
export const reqMyOrderList = (page, limit) => {
  return requests({
    url: `/order/auth/${page}/${limit}`,
    method: "GET",
  });
};
