import React,{useState} from 'react';
import { useDispatch} from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import { publicRequest } from '../requestMethods';
import { loginSuccess } from '../redux/userRedux';

const LOgin = ()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();
   
  
    const handleClick = async (e)=>{
        e.preventDefault();          
    

    try{
       const user = {email,password};
       console.log('Sending request to:', `${publicRequest.defaults.baseURL}/auth/login`);
       console.log('Request data:', user);
       
       const res = await publicRequest.post("/auth/login",user);
       console.log('Response:', res);

       if(res.data) {
        dispatch(loginSuccess(res.data));
          window.alert("Successfully Logged In")
          history.push("/");
       }
       
    }catch(err) {
        console.error('Registration error:', err);
        console.error('Error response:', err.response);
        
        if(err.response?.status === 400) {
            window.alert("Something went wrong, try with different EmailId or Password");
        } else {
            window.alert("Login failed. Please try again.");
        }
    }
    }

    return (
        <div className='login-container'>
            <div className='login-wrapper'>
              <h1 style={{margin:'5px',marginLeft:'50px',marginTop:'20px'}}>SIGN IN</h1>
              <form className='login-form'>
                 <input placeholder='Email' className='login-input' onChange={(e)=>setEmail(e.target.value)} />
                 <input type="password" placeholder='Password' className='login-input' onChange={(e)=>setPassword(e.target.value)}/>
                 <button className='login-btn' onClick={handleClick}>LOGIN</button>
            
         < Link to ="/register">
        <button className='link-login' style={{background:"Transparent",color:"Black",padding:"10px",border:'None'}}>CREATE A NEW ACCOUNT</button>
        </Link>
                
              </form>
            </div>
        </div>
    )
}

export default LOgin ; 