import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:9000",

  baseURL: "https://messeger-mern-live-clone.herokuapp.com/",
});

export default instance;
