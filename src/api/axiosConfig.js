import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backendv2.zing.tel/faiq/api',
});

export default axiosInstance;