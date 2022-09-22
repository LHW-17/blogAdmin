import axios from "axios";

const request = axios.create({
  baseURL: "http://localhost:1727/admin",
  timeout: 5000,
});
request.interceptors.request.use(
  (config) => {
    if (config.url !== "/login") {
      let token = localStorage.getItem("token");
      config!.headers!.Authorization = token as string;
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
    if (res.code !== 200) {
      alert(res.message || "error");
      return Promise.reject(new Error(res.message || "error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
export default request;
