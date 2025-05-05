import axios from "axios";

const apiRequest = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_BASE_URL : '/api' ,
    withCredentials:true
});


export default apiRequest;