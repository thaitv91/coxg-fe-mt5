import axios from 'axios';

// Tạo instance Axios
const axiosClient = axios.create({
  baseURL: 'https://mt5.coxg.io/api', // URL backend Laravel
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true, // nếu cần gửi cookie
});

// Interceptors (tuỳ chọn)
// axiosClient.interceptors.request.use((config) => {
//   // Thêm token hoặc header nếu có
//   const token = localStorage.getItem('token');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

// axiosClient.interceptors.response.use(
//   (response) => response.data, // chỉ trả data
//   (error) => {
//     // handle lỗi chung
//     if (error.response && error.response.status === 401) {
//       console.log('Unauthorized');
//     }
//     return Promise.reject(error);
//   }
// );

export default axiosClient;
