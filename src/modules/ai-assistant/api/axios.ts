import axios from 'axios';
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse  } from "axios";
import { CONFIG_ACCESS_TOKEN } from '@/constants';
import { apiErrorHandler } from "@/utils/ErrolHandling";

//const str_server = 'https://mesvn.online'
//const str_server ='https://olympus-mes.tce-ems.com'
const str_server = 'http://localhost:8081'
//const str_server = 'http://192.168.2.20'

const axiosInstance : AxiosInstance = axios.create({
    baseURL: `${str_server}/api/`,
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
            //console.log("interceptors.response err", error.response);
        /*
            const status = error.response ? error.response.status : null;
            switch (status) {
                case 401:
                    window.location = '/#/login';
                    break;
                case 403:
                    store.dispatch('setMsgErro', 'Bạn không có quyền truy cập');
                    break;
                case 500:
                    store.dispatch('setMsgErro', 'Lỗi hệ thống, vui lòng liên hệ quản trị viên');
                    break;
                default:
                    break;
            }
        return Promise.reject(error);
        */
        return apiErrorHandler(error)
    },
);

const axiosUload = axios.create({
    baseURL: `${str_server}/upload/`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    }
})
// API dùng cho thu thập dữ liệu từ các thiết bị IoT
const axiosIoT = axios.create({
    baseURL: `${str_server}/iotmes/`,
    headers: {
        'Content-Type': 'multipart/form-data',
        'Access-Control-Allow-Origin': '*',
    }
})

export default axiosInstance;
export { axiosUload, axiosIoT }
