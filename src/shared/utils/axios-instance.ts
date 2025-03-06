import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "init-data": import.meta.env.VITE_DEV_TELEGRAM_INIT_DATA,
  },
});

export default api;
