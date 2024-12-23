import React,{useState} from 'react';
import login from '../redux/apicalls';
import { useDispatch} from 'react-redux';
import { Link} from 'react-router-dom';
const LOgin = ()=> {
    const [email,setEmail]=useState("");
    const [password,setPassword] = useState("");
    const dispatch = useDispatch();
   
  
    const handleClick = (e)=>{
        e.preventDefault();          
        login(dispatch,{email,password});     
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