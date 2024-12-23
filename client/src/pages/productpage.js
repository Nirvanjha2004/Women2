import React from 'react';
import Navbar from '../components/navbar';
import NewsLetter from '../components/newsletter'
import Footer from '../components/footer';
import {AiOutlinePlusCircle,AiOutlineMinusCircle} from 'react-icons/ai';
import { useLocation,useHistory } from 'react-router-dom';
import { useState,useEffect } from 'react';
import { publicRequest } from '../requestMethods';
import { addProduct } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
const ProductPage = ()=>{
     const user = useSelector((state) => state.user.currentUser);  
     const location = useLocation();
     const id = location.pathname.split("/")[2];
     const [item,setItem] = useState({});
     const [quantity,setQuantity] = useState(1);
     const [color,setColor] = useState("");
     const [size,setSize] = useState("");
     const dispatch = useDispatch();

 const history = useHistory();

  if(!user){
    window.alert("Please Login First");
    history.push("/");
  }
     
     useEffect(()=>{
        const getproduct = async ()=>{
            try{
              const res = await publicRequest.get("/product/"+id);
              
              setItem(res.data.product);
                        
            }catch(err){
                console.log(err);
            }
        }
        
       user && getproduct();
     },[id,user])
     
   

        const handlequantity = (type)=>{
           
            if(type === "desc"){
                
               quantity > 1 && setQuantity(quantity-1);
            }else{
                setQuantity(quantity + 1);
               
            }
           
        };

        const handleClick = ()=>{
                 
            dispatch(addProduct({...item,quantity,color,size}));
            
        }

        
    return (
        
        <div>
            <Navbar />
            <div className = "productpage-wrapper">
               <div className='productpageimg-container'><img src={item.img} className='product-img-p' alt="product"/></div>
               <div className='productpage-info-containter'>
                   <h1 style={{marginBottom:'10px',marginLeft:'15px',fontSize:'30px'}}>{item.title}</h1>
                   <p style={{margin:'15px' ,fontSize:'20px'}}>{item.desc}</p>
                   <span style={{marginLeft:'15px',fontSize:'20px'}}>Rs {item.price}</span>
                 <div className='product-filter-container'>
                     <div className='product-filter-p'>
                         <h2 style={{marginRight:'5px'}}>Color</h2>
                      
                         {
                         
                        
                         item.color ?  item.color.map((c)=>(
                                   
                                <div className='filter-color' style={{backgroundColor:c}}  key={c}  onClick={()=>setColor(c)}></div>
                                
                            )) : <div></div>
                        
                        }
                        
                     </div>
                     <div className='product-filter-p'>
                        <h2 style={{marginRight:'5px'}}>Size</h2>
                        <select className='filter-size' onChange={(e)=>setSize(e.target.value)}>
                            {
                              item.size ? item.size.map((c)=>(
                                <option className='filter-size-option' key={c} >{c}</option>
                               )) : ""
                            }
                                                    
                        </select>
                     </div>

                 </div>

                <div className='add-container'>
                     <div className='amount-container-p'>
                       <AiOutlineMinusCircle size={30} onClick={()=>handlequantity("desc")} />
                       <span className='amount-p'>{quantity}</span>
                       <AiOutlinePlusCircle size={30} onClick={()=>handlequantity("inc")} />
                     </div>

                     <button className='btnp' onClick={handleClick} style={{background:'Black',color:'White',padding:'10px',height:'40px'}}> 
                        ADD TO CART
                     </button>
                </div>
               </div>
            </div>
            <NewsLetter />
            <Footer/>

        </div>
    )
}

export default ProductPage ;