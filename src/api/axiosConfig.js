import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://98.84.2.112/faiq/api',
});

export default axiosInstance;