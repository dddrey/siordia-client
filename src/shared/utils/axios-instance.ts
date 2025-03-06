import axios from "axios";

const getInitData = () => {
  return (
    window.Telegram.WebApp.initData ||
    import.meta.env.VITE_DEV_TELEGRAM_INIT_DATA
  );
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
