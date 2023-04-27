import axios from "axios";

const api = axios.create({
  baseURL: "https://api.github.com/users/"
});

api.defaults.headers.post["Accept"] = "application/json";

export default api;
