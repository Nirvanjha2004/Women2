import React from 'react';
import { AiFillFacebook,AiFillInstagram,AiFillTwitterSquare,AiFillPhone,AiOutlineMail } from 'react-icons/ai';
import {FaPinterestSquare,FaMapMarkerAlt} from 'react-icons/fa';

const Footer =()=>{
    return (
        <div className='footer-container'>
             <div className='footer-left'>
                  <h1>LOGO</h1>
                  <p className='footer-desc' style={{margin:'20px 0px'}}>
   There are many variations of passages of Lerem Ipsum available, but 
   the majority have suffered alteration in some form, by injected
   humour, or randomised words which dont't look even slightly believable.
                  </p>

                  <div className='social-container'>
                      <div className='social-icon' style={{color:"#3B5999"}}><AiFillFacebook size={30}/></div>
                      <div className='social-icon' style={{color:'#E4405F'}}><AiFillInstagram size={30}/></div>
                      <div className='social-icon' style={{color:'#55ACEE'}}><AiFillTwitterSquare size={30}/></div>
                       <div className='social-icon' style={{color:'#E60023'}}><FaPinterestSquare size={30}/></div>
                  </div>
             </div>

             <div className='footer-center'> 
              <h3 className='links-title' style={{marginBottom:'30px',fontSize:'25px'}}>Useful Links</h3>

              <ul className='footer-links'>
                  <li className='footer-links-li'>Home</li>
                  <li className='footer-links-li'>Cart</li>
                  <li className='footer-links-li'>Men Fashion</li>
                  <li className='footer-links-li'>Women Fashion</li>
                  <li className='footer-links-li'>Acessories</li>
                  <li className='footer-links-li'>My Account</li>
                  <li className='footer-links-li'>Order Tracking</li>
                  <li className='footer-links-li'>WishList</li>
                  <li className='footer-links-li'>Terms</li>
              </ul>
             </div>

             <div className='footer-right'>
                 <h1 style={{marginBottom:'20px'}}>Contact</h1>
                 <div className='contact-item'>
                     <FaMapMarkerAlt style={{marginRight:'10px'}} size={30} />
                      622 Dixie Path, South Tobinchester 98336
                 </div>
                 <div className='contact-item'> 
                      <AiFillPhone style={{marginRight:'10px'}} size={20} />
                      + 234 56 789
                 </div>
                 <div className='contact-item'>
                      <AiOutlineMail style={{marginRight:'10px'}} size={20} />
                      contact@gmail.com
                 </div>
                 <img src="https://i.ibb.co/Qfvn4z6/payment.png" style={{width:'60%'}} alt="payment" />
             </div>
        </div>
    )
}

export default Footer ; 