// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
//引入store
import store from "@/store";

const requests = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// console.log(nprogress);

// 请求拦截器
requests.interceptors.request.use((config) => {
  // 游客身份
  if (store.state.detail.uuid_token) {
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  // 存储token
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  // 进度条
  nprogress.start();
  return config;
});

requests.interceptors.response.use(
  (res) => {
    nprogress.done();
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error("fail"));
  }
);

// 对外暴露
export default requests;
