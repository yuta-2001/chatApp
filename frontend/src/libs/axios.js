import Axios from "axios";
import { getAuthorizationHeader } from "../utils/handle-authorization-header";

const axios = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_ENDPOINT}`,
});

// リクエストが行われるたびにヘッダーを設定
axios.interceptors.request.use(config => {
    const authorizationHeader = getAuthorizationHeader();
    if (authorizationHeader) {
        config.headers['Authorization'] = authorizationHeader;
    }
    return config;
});

export default axios;
