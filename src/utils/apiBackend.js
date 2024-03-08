import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://business.ay-cloud.com/service/v1',
  // baseURL: "http://localhost:3001/service/v1",
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
});

export default axiosInstance;
