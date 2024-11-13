import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ENDPOINT_BASE_URL, 
  timeout: 120000,   //2 minutes                     
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
