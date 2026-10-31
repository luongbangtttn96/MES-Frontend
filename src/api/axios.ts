import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse  } from "axios";
import { CONFIG_ACCESS_TOKEN } from '@/constants';
import { apiErrorHandler } from "@/utils/ErrolHandling";

export const axiosInstance: AxiosInstance = axios.create({
	baseURL: `${import.meta.env.VITE_API_URL}/api/`,
	timeout: 5000,
    //baseURL: 'http://localhost:8080/api/',
    // timeout: 1000, http://localhost:8080, 'https://mesvn.online/api/
    headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Authorization': 'Bearer ' + localStorage.getItem(CONFIG_ACCESS_TOKEN),
    }
});
axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        config.headers.set("Authorization", `Bearer ${localStorage.getItem(CONFIG_ACCESS_TOKEN)}`);
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error)
    },
    { synchronous: true }
);
axiosInstance.interceptors.response.use(
    (response : AxiosResponse) => {
        // Thực thi các kịch bản cần thiết ở đây
        // trước khi response đến điểm cuối
        return response
    },
    (error) => {
        // Thực thi đối với các phản hồi bị lỗi
        // status code: 4xx, 5xx.
        return apiErrorHandler(error)
    },
);

const axiosUload: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/upload/`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    }
})
// API dùng cho thu thập dữ liệu từ các thiết bị IoT
const axiosIoT: AxiosInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/iotmes/`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    }
})

export default axiosInstance;
export { axiosUload, axiosIoT }