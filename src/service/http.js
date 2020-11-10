import axios from 'axios';

const http = axios.create({
    baseURL:"http://localhost:8080",
})

//拦截器
//请求拦截，每次请求都带上token
http.interceptors.request.use((config)=>{
    const token = sessionStorage.getItem('token');

    if(token){
        config.headers.Authentication = token;
    }

    return config;
})

export default http;