import axios from "axios";

export const token = () => localStorage.getItem('token');

export const userClient = axios.create({
  baseURL: "http://localhost:3000/api/users",
  headers: {
    Authorization: `Bearer ${token()}`
  }
});

export const postClient = axios.create({
  baseURL: "http://localhost:3000/api/posts"
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