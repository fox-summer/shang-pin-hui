// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
import "nprogress/nprogress.css";
const requests = axios.create({
  baseURL: "/mock",
  timeout: 5000,
});

// console.log(nprogress);

// 请求拦截器
requests.interceptors.request.use((config) => {
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
