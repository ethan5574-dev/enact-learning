import axios from 'axios';
import { getCookie, deleteAllCookies } from '../utils/cookie';

export const AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  },
});

AxiosInstance.defaults.withCredentials = true;

// Attach Authorization header from cookie dynamically on every request
// AxiosInstance.interceptors.request.use(
//   (config) => {
//     const token = getCookie('accessToken');
//     if (token) {
//       config.headers = config.headers || {};
//       (config.headers as any)['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// Handle token expiration
// AxiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       console.log('Token expired, clearing cookies and redirecting to login');

//       deleteAllCookies();
//       //ocalStorage.clear();

//       // Redirect to login page
//       if (typeof window !== 'undefined') {
//         window.location.href = '/auth';
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default AxiosInstance;
