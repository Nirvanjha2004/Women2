import React ,{useEffect,useState} from 'react';
import { popularProducts } from '../data';
import { AiOutlineHeart,AiOutlineShoppingCart,AiOutlineSearch} from 'react-icons/ai';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";
const Products = ({cat,filters,sort})=>{
   
    const [products,setproducts] = useState([]);
    const [filteredproducts,setFilteredProducts] = useState([]);
    const user = useSelector((state)=>state.user.currentUser);

    useEffect(()=>{
        const getproducts = async ()=>{
            try{
           const res = await axios.get( cat ? `https://ecommerce-api-tdlg.onrender.com/api/v1/product?category=${cat}`: "https://ecommerce-api-tdlg.onrender.com/api/v1/product");    
            setproducts(res.data.products);
            
            }catch(err){
                console.log(err);
            }
            
           
        };
       user && getproducts();
    },[cat,user]);

    useEffect(()=>{
        
     cat && setFilteredProducts
        (products.filter((item)=>
            Object.entries(filters).every(([key,value])=>
            item[key].includes(value)
            
            )
            ));
            
    },[products,cat,filters]);


    useEffect(()=>{
 if(sort === "newest"){
   setFilteredProducts((prev)=>
   [...prev].sort((a,b)=>a.createdAt - b.createdAt)
   );
 }
 else if (sort === "asc"){
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>a.price - b.price)
    )
 }
 else {
    setFilteredProducts((prev)=>
    [...prev].sort((a,b)=>b.createdAt-a.createdAt)
    )
 }
    },[sort])

    return (
        
        <div className='product-container'>
             {            
               cat ?  filteredproducts.map((item,id)=>{
                    
                     return (
                     <div className='product-wrapper' key={id}>
                        <div className='product-circle'> </div>
                       <img src={item.img} className="product-img" alt="product"/>
                       <div className='product-btn'>
                          <div className='icon' style={{color:'red'}}><AiOutlineHeart size={35}/></div>
                          <div className='icon' style={{color:'black'}}><AiOutlineShoppingCart size={35}/></div>
                          <Link to={`/product/${item._id}`}>
                           <div className='icon' style={{color:'blue'}}><AiOutlineSearch size={35}/></div>
                          </Link>
                         
                        </div>
                     </div>
                     )
                 }) : popularProducts.map((item,id)=>{
                    
                     return (
                     <div className='product-wrapper' key={id}>
                        <div className='product-circle'> </div>
                       <img src={item.img} className="product-img" alt="product"/>
                       <div className='product-btn'>
                          <div className='icon' style={{color:'red'}}><AiOutlineHeart size={35}/></div>
                          <div className='icon' style={{color:'black'}}><AiOutlineShoppingCart size={35}/></div>
                          
                           <Link to={`/product/${item.productId}`}>
                           <div className='icon' style={{color:'blue'}}><AiOutlineSearch size={35}/></div>
                          </Link>
                        </div>
                     </div>
                     )
                 }) 
             } 
        </div>
    )
}

export default Products ;
