import axios from "axios";
import { ElMessage } from "element-plus"; // 确保导入 ElMessage

// 请求拦截器
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("interceptor 拦截了 请求发送: ", config.url);
    return config;
  },
  (error) => {
    console.error("请求拦截器错误:", error);
    return Promise.reject(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const { authorization } = response.headers;
    console.log('拦截器 得到 headers', response.headers);
    
    authorization && localStorage.setItem("token", authorization);    
    return response;
  },function (error) {
    const { status } = error.response;
    if (status === 401) {
        localStorage.removeItem("token"); // 清除 token，避免无限重试
        window.location.href = "#/login";
      } 
    return Promise.reject(error);
  });

  

