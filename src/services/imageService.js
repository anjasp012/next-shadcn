import instance from "@/lib/axios/instance";

const endpoint = `/api/`;
const imageServices = {
    addImage: (data) => instance.post(`${endpoint}/upload-image`, data),
};

export default imageServices;
