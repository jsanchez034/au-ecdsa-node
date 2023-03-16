import axios from "axios";

const server = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "/api" : "http://localhost:3042/api",
});

export default server;
