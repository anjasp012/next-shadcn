import instance from "@/lib/axios/instance";
import Cookies from "js-cookie";

const endpoint = `/api/user/user`;
const userServices = {
    getAllUsers: () => instance.get(endpoint),
    getDetailUser: (id) => instance.get(`${endpoint}/${id}`),
    addUser: (data) => instance.post(endpoint, data),
    updateUser: (id, data) => instance.put(`${endpoint}/${id}`, data),
    deleteUser: (id) => instance.delete(`${endpoint}/${id}`),
};

export default userServices;
