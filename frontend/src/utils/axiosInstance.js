import axios from "axios";
import { BASE_URL } from "../utils";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // agar cookie refreshToken terkirim otomatis
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Gunakan axios biasa agar tidak kena interceptor (hindari loop)
        const res = await axios.get(`${BASE_URL}/admin/token`, {
          withCredentials: true,
        });

        const newAccessToken = res.data.accessToken;

        localStorage.setItem("accessToken", newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest); // ulangi request awal
      } catch (err) {
        console.error("Refresh token gagal:", err);
        localStorage.removeItem("accessToken");
        window.location.href = "/admin"; // redirect ke login jika perlu
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
