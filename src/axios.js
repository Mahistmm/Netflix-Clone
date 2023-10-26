import axios from "axios";

const instance = axios.create({
  baseURL: "https://netflix-clone-jta1.onrender.com/api",
});

export default instance;
