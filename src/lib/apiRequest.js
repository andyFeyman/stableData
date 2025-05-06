import axios from "axios";

const apiRequest = axios.create({
    baseURL: import.meta.env.PROD ? import.meta.env.VITE_API_URL+'/api' : '/api' ,
    withCredentials:true
});


export default apiRequest;