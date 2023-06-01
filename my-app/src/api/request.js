import axios from "axios";
import {setTokenTime,getTokenTime,isTokenExpired} from "@/utils/auth";
import store from "@/store";
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

service.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if(localStorage.getItem("token") && isTokenExpired()){
    store.dispatch("app/logout");
  }
  config.headers.Authorization = localStorage.getItem("token");
  return config;
}, function (error) {
  // 对请求错误做些什么
  // return Promise.reject(error);
  return Promise.reject(new Error(error))
});
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    const { data, meta } = response.data;
    if (meta.status === 200 || meta.status === 201) {
      return data; // 返回响应数据
    } else {
      const error = new Error(meta.msg);
      error.response = response;
      throw error; // 抛出错误
    }
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if (error.response) {
      ElMessage.error(error.response.data);
    }
    throw error; // 抛出错误
  });
  

export default service;
