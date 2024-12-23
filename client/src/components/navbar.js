import React from 'react';
import {AiOutlineShoppingCart,AiOutlineSearch} from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { Link,useHistory } from 'react-router-dom';
import localStorage from 'redux-persist/es/storage';
const Navbar = ()=>{
    const quantity = useSelector(state=>state.cart.quantity);
    const user = useSelector((state)=>state.user.currentUser);

      const history = useHistory();
      const logout = ()=>{
      localStorage.removeItem('persist:root');
      history.push("/");
      window.location.reload();
      
    }

    const refresh = (e)=>{
        e.preventDefault();
        if(user){
         history.push("/cart");
        window.location.reload();
        }else{
            window.alert("Please Login First")
        }
    }
   
    return (
        <div className='nav-container'>
           <div className='nav-wrapper'>
             <div className='nav-left'>
               <span className='nav-en'>EN</span>
               <div className='nav-search'>
               <input 
               type="text"
               placeholder='Search'
               className='input'
               />
                <AiOutlineSearch size={25} className="search-icon"/>
                </div>
             </div>
            
             <div className='nav-mid'>
                <Link to ="/" style={{cursor:"Pointer",color:"White",textDecoration:"None"}}>
                <h3 className="nav-logo">LOGO</h3>
                </Link>
              
             </div>

             <div className='nav-right'>
    {
        !user &&  <Link to ="/register">
        <button className='nav-btn'>REGISTER</button>
        </Link>
}{  
        !user && <Link to ="/login">
        <button className='nav-btn'>LOGIN</button>
        </Link>
    }
{
      user && <button className='nav-btn' onClick={logout}>LOG OUT</button>
}
          <Link to="/cart"> 
                <button className='nav-cart-btn' onClick={refresh} style={{cursor:"Pointer"}}>
                    <AiOutlineShoppingCart size={38}/>
                    
                </button>   
        </Link>
            
                <div className='nav-amount'>
                    <span className='nav-total'>
                       {quantity}
                    </span>
                </div>
           
             </div>
           </div>
        </div>
    )
}

export default Navbar ;