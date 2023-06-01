import { login as loginApi } from "@/api/login";
import { setTokenTime } from '@/utils/auth'
import router from "@/router";

// 创建一个新的 store 实例
export default {
  namespaced: true,
  state: () => ({
    token: localStorage.getItem("token") || "",
    sideType: true,
  }),
  mutations: {
    setToken(state, token) {
      // 把登录后的 token 保存到 localStorage 中
      state.token = token;
      localStorage.setItem("token", token);
    },
    changeSideType(state) {
      state.sideType = !state.sideType;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginApi(userInfo)
          .then((res) => {
            console.log(res);
            commit("setToken", res.token);
            setTokenTime();
            router.replace("/");
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    logout({ commit }) {
      commit("setToken", "");
      localStorage.clear();
      router.replace("/login");
    },
  },
};
