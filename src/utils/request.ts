import axios from "axios";
import router from "@/router";
import { toUpper } from "lodash";
const request = axios.create({
  baseURL: "http://localhost:1727/admin",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    if (config.url !== "/login") {
      let token = localStorage.getItem("token");
      config!.headers!.Authorization = ("Bearer " + token) as string;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log(res);
    if (res.code !== 200) {
      // alert(res.message || "error");
      return Promise.reject(new Error(res.message || "error"));
    } else {
      return res;
    }
  },
  (error) => {
    if (error.response.status) {
      //未登录，跳转登录界面
      switch (error.response.status) {
        case 401:
          localStorage.removeItem("token");
          router.replace({
            path: "/login",
          });
          return Promise.reject({ code: 401, message: "token failed" });
        //token过期，重新登录
        case 403:
          localStorage.removeItem("token");
          router.replace({
            path: "/login",
          });
          return Promise.reject({ code: 403, message: "token failed" });
          break;
        default:
          return Promise.reject(error);
      }
    }
  }
);
export default request;
