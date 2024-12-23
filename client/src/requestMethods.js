import axios from "axios";
const BASE_URL = "https://women2-backend-gpnu0r4qk-nirvan-jhas-projects.vercel.app/api/v1/";

export const publicRequest = axios.create({
  baseURL:BASE_URL,
});

  const user = JSON.parse(localStorage.getItem("persist:root"))?.user; 
  const currentUser = user && JSON.parse(user).currentUser ; 
  const TOKEN=currentUser && currentUser.token  ;
    
  const userRequest = axios.create({
   
    baseURL:BASE_URL,
    headers:{token:`Bearer ${TOKEN}`}
  })
  
  
 

export default userRequest ;
