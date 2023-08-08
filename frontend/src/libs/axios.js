import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
});

export default axios;