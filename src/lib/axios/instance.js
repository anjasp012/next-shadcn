import axios from "axios";
import Cookies from "js-cookie";

const headers = {
    Accept: "application/json",
    // "Content-Type": "multipart/form-data",
    "Cache-Control": "no-cache",
    Expires: 0,
};

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers,
    timeout: 60 * 1000,
});

instance.interceptors.request.use(
    async (request) => {
        const token = `Bearer ${Cookies.get('token')}`;
        request.headers.Authorization = token;
        return request;
    },
    (error) => Promise.reject(error)
);

instance.interceptors.response.use(
    (response) => response,
    (error) => error.response
);

export default instance;
