// UTILITY LIBRARY
import axios from "axios";

const axiosInstance = axios.create({
  // /api - TRANSLATES TO http://localhost:5000/api
  baseURL: "/api/v1",

  // MAX TIME LIMIT FOR AN API CALL ( 20 SECONDS )
  timeout: 20 * 1000,
});

export default axiosInstance;
