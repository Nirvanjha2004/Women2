import React, { useEffect,useState } from 'react';
import { AiFillCaretLeft,AiFillCaretRight } from "react-icons/ai";
import { sliderItems } from '../data';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Slider = ()=>{
   const user = useSelector((state)=>state.user.currentUser);

     const msg = (e)=>{
     e.preventDefault();
     window.alert("Please Login First")
     }
    const [slideIndex,setSlideIndex] = useState(0);

    useEffect(()=>{
        let lastIndex = sliderItems.length-1;

        if(slideIndex > lastIndex){
            setSlideIndex(0);
        }

        if(slideIndex < 0){
            setSlideIndex(lastIndex);
        }
    },[slideIndex]);

    useEffect(()=>{
        let slider = setInterval(()=>{
            setSlideIndex(slideIndex+1);
        },5000);
        return ()=>{
            clearInterval(slider);
        }
    },[slideIndex]);

    return (
        <div className='slider-container'>
            <div className='slider-wrapper'>
        {
        sliderItems.map((item,id)=>{

            return (
                <article style={{backgroundColor:item.bg,transform:`translateX(${slideIndex*-100}%)`}} key={id}>
                    <button className='btn-1' onClick={()=>setSlideIndex(slideIndex-1)}><AiFillCaretLeft size={30}/></button>
                    <div className='slider-img'>
                       <img src={item.img} alt="img" className="sliderimg"/>
                    </div>
                    <div className='slider-info'>
                     <p className='slider-title'>{item.title}</p>
                     <p className='slider-desc'>{item.desc}</p>
{
       user ?           <Link to ={`/product/${item.productid}`} >
                    <button className='slider-btn'>SHOP NOW</button>
                </Link>   : 

               <button className='slider-btn' onClick={msg}>SHOP NOW</button>
        }
                    </div>
                    <button className = "btn-2" onClick={()=>setSlideIndex(slideIndex+1)}><AiFillCaretRight size={30}/></button>
                </article>
            )
        })

    }
    </div>
    </div>
    )
}

export default Slider ; 