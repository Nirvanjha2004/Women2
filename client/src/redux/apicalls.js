import { loginFailure,loginStart,loginSuccess } from "./userRedux";
import { publicRequest } from "../requestMethods";

 const login = async(dispatch,user)=>{
   
    dispatch(loginStart());
    try{
       
      const res = await publicRequest.post("/auth/login",user);
      
      sessionStorage.setItem('firsttimelogin',true);
      window.alert("Succesfully Login")
      dispatch(loginSuccess(res.data));
    }catch(err){
      window.alert("Invalid Credentials")
      dispatch(loginFailure());
    }
}

export default login ;