import React,{useState} from 'react';
import { publicRequest } from "../requestMethods";
import { useHistory } from 'react-router-dom';
const Register = ()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const [firstname,setFirstname]=useState("");
    const [lastname,setLastname] = useState("");
    const [username,setUsername] = useState("");
    const [checkpassword,setCheckpassword] = useState("");
     const history = useHistory();
   const reg = async(e)=>{
    e.preventDefault();
    if(firstname.length < 3 || lastname.length < 3  || firstname.length > 20 || lastname.length > 20 ){
       return window.alert("Name length should be between 3 and 20 ")
    }

     if(username.length < 6 || password.length < 6 || username.length > 20 ){
       return window.alert("Username/Password length should be between 5 and 20 ")
    }
   
    if(password !== checkpassword){
        return window.alert("Passwords dont match ")
    }
    
    try{
       const user = {email,password,firstname,lastname,username};
       
       const res = await publicRequest.post("/auth/register",user);

       if(res){
          window.alert("Successfully Registered")
          history.push("/login");
       }
       
    }catch(err){
       
        if(err.message === "Request failed with status code 400"){
            window.alert("Something went try with different EmailId");
        }   
    }
   }
    

    return (
        <div className='register-container'>
            <div className='register-wrapper'>
                <h1 className='register-title' style={{marginTop:'10px',marginLeft:'20px'}}>CREATE AN ACCOUNT</h1>
             <form className='register-form'>
               <input placeholder='First Name' className='register-input' onChange={(e)=>setFirstname(e.target.value)}/>
               <input placeholder='Last Name' className='register-input' onChange={(e)=>setLastname(e.target.value)}/>
               <input placeholder='Username' className='register-input' onChange={(e)=>setUsername(e.target.value)}/>
               <input placeholder='Email ID' className='register-input' onChange={(e)=>setEmail(e.target.value)}/>
               <input type="password" placeholder='Password' className='register-input' onChange={(e)=>setPassword(e.target.value)}/>
               <input type="password" placeholder='Confirm Password' className='register-input' onChange={(e)=>setCheckpassword(e.target.value)}/>
               <span className='register-agreement'>
                By creating an account, I consent to the processing of my personal data 
                in accordance with the <b>PRIVACY POLICY</b>
               </span>
               <button className='register-btn' onClick={reg}>Create</button>
             </form>
            </div>       
        </div>
    )
}

export default Register ; 