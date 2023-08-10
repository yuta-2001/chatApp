import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
});

export default axios;