import axios from "axios";

const axios_instance = axios.create({
  baseURL: "https://easybooking-server.onrender.com/api",
  withCredentials: true,
});

export default axios_instance;
