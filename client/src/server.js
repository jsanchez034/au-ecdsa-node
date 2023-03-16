import axios from "axios";

const server = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? "/" : "http://localhost:3042",
});

export default server;
