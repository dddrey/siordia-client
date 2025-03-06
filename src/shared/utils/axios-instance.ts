import axios from "axios";

const getInitData = () => {
  return "AAGk-lZLAAAAAKT6VkuwW9OM%26user=%7B%22id%22%3A1263991460%2C%22first_name%22%3A%22Markuhaaaaa%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22markuhaaaa%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D%26auth_date=1709581318%26hash=f0d492ae4c33979dafafc3338ac8376f4e8679b1341c6a3863955da8766055ee";
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
