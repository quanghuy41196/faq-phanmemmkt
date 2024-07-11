import {
  getAccessToken,
  removeAuthToken,
  routerPath,
} from "@/config";
import { joinPathParent } from "@/helper/functions";
import Axios from "axios";
import { toast } from "react-toastify";

export const AUTH_TOKEN = process.env.NEXT_PUBLIC_AUTH_TOKEN || "MKTtoken";
export const BASE_URL = process.env.NEXT_PUBLIC_URL || "";

const axiosClient = Axios.create({
  baseURL: joinPathParent(BASE_URL, "/api").slice(1),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    if (config?.url?.startsWith("/auth/logout")) {
      return config;
    }
    // Do something before request is sent
    const mktToken = getAccessToken();
    if (mktToken) {
      config.headers.Authorization = `Bearer ${mktToken}`;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

const redirectLogin = () => {
  removeAuthToken();
  location.href = joinPathParent(
    routerPath.admin,
    routerPath.auth,
    routerPath.login
  );
};

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  async function (error) {
    const originalRequest = error.config;

    const status = error?.request?.status;
    const message = error?.response?.data?.message ?? "";
    const isPathLogout = originalRequest?.url?.startsWith("auth/logout")

    if (status === 401 && (!originalRequest?.url?.startsWith("auth/login") && !isPathLogout)) {
      redirectLogin();
    }
    if (message && !isPathLogout) {
      const msg = Array.isArray(message) ? message?.[0] : message
      toast.error(msg);
    }

    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default axiosClient;
