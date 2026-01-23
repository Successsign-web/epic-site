import axios from 'axios';
import API_CONFIG from '../Config/apiConfig';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
});



export default api;