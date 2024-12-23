import React from 'react';
import { categories } from '../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Category = ()=>{
     const user = useSelector((state)=>state.user.currentUser);

     const msg = (e)=>{
     e.preventDefault();
     window.alert("Please Login First")
     }

 return (
     <div className='category-container'>
       
         {
             categories.map((item,id)=>{
                    
                return (
                    
                    <div className='category-wrapper' key={id}> 
                    
                <img src={item.img} className="category-img" alt= "person-model" />
                    <div className='category-info'>
                       <h2 className='category-title' style={{color:`${item.color}`}}>{item.title}</h2>
{
             user ?     <Link to = {`/products/${item.cat}`}> 
                       <button className="category-btn">SHOP NOW</button>
                       </Link> 
                       :
                       <button className="category-btn" onClick={msg} >SHOP NOW</button>

}
                    </div>
                      
                  </div>
                
                )
             })
         }
      
     </div>
 )
}

export default Category ;