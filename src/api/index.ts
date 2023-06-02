import axios from "axios";

export default axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "api-key": "2cc43c23-98fc-4e4e-83f6-44e29e8d10af",
  },
});
