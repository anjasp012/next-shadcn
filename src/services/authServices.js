import instance from "@/lib/axios/instance";
import Cookies from "js-cookie";

const endpoint = 'auth';

const authServices = {
    login: (data) => instance.post(`${endpoint}/login`, data),
    register: (data) => instance.post(`${endpoint}/register`, data),
    getMe: () => instance.get(`me`),
    refreshToken: (data) => instance.post(`refresh-token`, data),
    changePassword: (data) => instance.post(`${endpoint}/change-password`, data),
    logout: () => instance.post(`${endpoint}/logout`),
}

export default authServices;
