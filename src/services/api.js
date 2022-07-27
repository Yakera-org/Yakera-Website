import axios from "axios";
import Environment from "./Environment";
import TokenService from "./token";

const instance = axios.create({
  baseURL: Environment.getBackendUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = TokenService.getLocalAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err?.config;

    if (originalConfig.url !== "/auth/login" && err?.response) {
      // Access Token was expired
      if (err?.response?.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          const res = await instance.post("/auth/refresh-token", {
            token: TokenService.getLocalRefreshToken(),
          });

          const { access_token } = res.data;
          TokenService.updateLocalAccessToken(access_token);

          return instance(originalConfig);
        } catch (_error) {
          console.log(_error, "User is not auth");
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
