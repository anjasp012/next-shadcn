import instance from "@/lib/axios/instance";
import Cookies from "js-cookie";

const endpoint = `/api/roles`;

const roleServices = {
    getAllRoles: () => instance.get(endpoint),
    getDetailRole: (id) => instance.get(`${endpoint}/${id}`),
    addRole: (data) => instance.post(endpoint, data),
    updateRole: (id, data) => instance.put(`${endpoint}/${id}`, data),
    deleteRole: (id) => instance.delete(`${endpoint}/${id}`),
};

export default roleServices;
