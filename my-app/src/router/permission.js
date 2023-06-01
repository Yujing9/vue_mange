import store from "@/store";
import router from "@/router";

// 路由守卫
// 定义用户白名单
const whiteList = ["/login"];

router.beforeEach((to, from, next) => {
  if (store.getters.token) {
    console.log(store.getters.token)
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})