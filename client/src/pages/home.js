import React from 'react';
import Navbar from '../components/navbar'
import Slider from '../components/slider';
import Category from '../components/category';
import Products from '../components/product';
import Newsletter from '../components/newsletter';
import Footer from '../components/footer';
import userRequest from '../requestMethods';
import {useSelector} from "react-redux";
import { useDispatch } from 'react-redux';
import { addProduct } from '../redux/cartRedux';
import { publicRequest } from '../requestMethods';

const Home = () =>{
 const item = useSelector((state)=>state.user.currentUser);
 const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
 const currentUser = user && JSON.parse(user).currentUser ;
 const TOKEN=currentUser && currentUser.token  ;
 
  const dispatch = useDispatch();
  
 if(!TOKEN){
  item && window.location.reload();
 }
  
 const fetchcart = async()=>{
try{
  const items = await userRequest.get('/cart/find-cart/'+item.user.id);
 
  items.data.cart.products.map(async(item)=>{
    let id =  item.productId ;
    let quantity = item.quantity;
   
   const products = await publicRequest.get("/product/"+id);
    
    let color = item.color;
    let size = item.size;
    dispatch(addProduct({...products.data.product,quantity,color,size}));
  });
   
}catch(err){
console.log(err);
}

    }
 
    const firstime = sessionStorage.getItem('firsttimelogin');

    if(firstime && TOKEN && user){
    user && item && TOKEN && fetchcart();
     sessionStorage.removeItem('firsttimelogin');
    }
  
    return <>
        <Navbar />
        <Slider />
        <Category />
        <Products />
        <Newsletter/>
        <Footer />
    </>
}

export default Home ;