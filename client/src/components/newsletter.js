import React from 'react';

import {AiOutlineSend} from 'react-icons/ai';

const Newsletter = ()=>{
    return (
        <div className ="newsletter-container">
            <h1 className = "newletter-title">Newsletter</h1>
        <div className='newletter-desc'>
       Get timely updates from your favourite products
        </div>
        <div className='newletter-input'>
            <input placeholder='Your Email' className = "newsletter-ip" />
            <button className = "newsletter-btn"><AiOutlineSend/></button>
        </div>
        </div>
    )
}

export default Newsletter ;