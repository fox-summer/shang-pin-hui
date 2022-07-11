import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// 引入全局组件
import TypeNav from "@/components/TypeNav";
import Carousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
// 引入swiper样式
import "swiper/css/swiper.css";
// 引入iconfont
import "./assets/iconfont/iconfont.css";
// import { reqCategoryList } from "@/api/index";
// 引入mock
import "@/mock/mockServe.js";
//引入api
import * as API from "@/api";
// 引入element-ui
import { MessageBox } from "element-ui";
// 引入图片懒加载
import Vuelazyload from "vue-lazyload";
// Elementui注册全局组件
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
import defaultImg from "@/assets/default.jpg";
// 使用图片懒加载
Vue.use(Vuelazyload, {
  loading: defaultImg,
});
// 注册全局组件,参数为全局组件名，哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库，组件实例身上多一个$store属性
  store,
}).$mount("#app");
