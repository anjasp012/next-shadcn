import instance from "@/lib/axios/instance";

const endpoint = `/api/`;
const zipServices = {
    addZip: (data) => instance.post(`${endpoint}/upload-zip`, data),
};

export default zipServices;
