import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 引入store
import store from "@/store";

// 引入路由
// import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/MyOrder";
import GroupOrder from "@/pages/Center/GroupOrder";

// 先把vuerouter原型对象的push，保存一份
let originPush = VueRouter.prototype.push;

// 重写push或replace
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 配置路由
const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/center",
      component: Center,
      meta: { show: true },
      children: [
        { path: "/center", redirect: "/center/myorder" },
        { path: "myorder", component: MyOrder },
        { path: "grouporder", component: GroupOrder },
      ],
    },
    {
      path: "/paysuccess",
      component: PaySuccess,
      meta: { show: true },
    },
    {
      path: "/pay",
      component: Pay,
      meta: { show: true },
      beforeEnter: (to, from, next) => {
        if (from.path == "/trade") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/trade",
      component: Trade,
      meta: { show: true },
      // 独立路由守卫
      beforeEnter: (to, from, next) => {
        if (from.path == "/shopcart") {
          next();
        } else {
          next(false);
        }
      },
    },
    {
      path: "/home",
      // 这里用到了路由懒加载
      component: () => import("@/pages/Home"),
      meta: { show: true },
    },
    {
      name: "search",
      path: "/search/:keyword?",
      component: Search,
      meta: { show: true },
    },
    {
      path: "/login",
      component: Login,
      meta: { show: false },
    },
    {
      path: "/register",
      component: Register,
      meta: { show: false },
    },
    {
      path: "/detail/:skuid",
      component: Detail,
      meta: { show: true },
    },
    {
      path: "/addcartsuccess",
      name: "addcartsuccess",
      component: AddCartSuccess,
      meta: { show: true },
    },
    {
      path: "/shopcart",
      component: ShopCart,
      meta: { show: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token;
  let name = store.state.user.userInfoName;
  if (token) {
    if (to.path == "/login") {
      next("/home");
    } else {
      if (name) {
        // 有用户信息，已经登录且不去登录页面
        next();
      } else {
        // 无用户信息，添加用户信息后放行
        try {
          await store.dispatch("userInfo");
          next();
        } catch (error) {
          // token失效，退出重新登陆
          await store.dispatch("logOut");
          next("/login");
        }
      }
    }
    // 未登录
  } else {
    let toPath = to.path;
    // console.log(toPath);
    if (
      toPath.indexOf("/center") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/shopcart") != -1
    ) {
      next("/login?redirect=" + toPath);
    } else {
      next();
    }
  }
});
export default router;
