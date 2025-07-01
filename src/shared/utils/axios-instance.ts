import axios from "axios";

const getInitData = () => {
  return window.Telegram.WebApp.initData;
};

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "init-data": getInitData(),
  },
});

export default api;
