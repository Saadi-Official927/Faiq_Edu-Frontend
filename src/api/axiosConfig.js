import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://backendv2.bidups.com/faiq/api',
});

export default axiosInstance;