import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const token = () => localStorage.getItem('token');

export const userClient = axios.create({
  baseURL: BASE_URL + "/api/users",
  headers: {
    Authorization: `Bearer ${token()}`
  }
});

export const postClient = axios.create({
  baseURL: `${BASE_URL}/api/posts`
  // baseURL: "http://localhost:3000/api/posts",
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
});

postClient.interceptors.request.use((req) =>{
// const token = localStorage.getItem('token');
  if(token()){
    req.headers.Authorization = `Bearer ${token()}`
  }
  return req;
})