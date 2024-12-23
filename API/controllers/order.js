const Order = require("../models/Order");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,NotFoundError} = require("../errors");
const Razorpay = require('razorpay');

const dotenv = require('dotenv');
dotenv.config();

const createOrder = async(req,res)=>{
    try{
     const result = new Razorpay({
        key_id:process.env.RAZORPAY_KEY_ID,
        key_secret:process.env.RAZORPAY_SECRET,
     });

     const options = {
        amount : req.body.amount ,
        currency:'INR',     
     };

     const order = await result.orders.create(options);
     if(!order)return res.status(500).send('Some Error Occured');
    
     res.status(StatusCodes.CREATED).json({order});
    }catch(err){
        console.log(err);
     res.status(500).send(err);
    }
}

const getrazorpaykey = async(req,res)=>{
    res.send({key:process.env.RAZORPAY_KEY_ID})
}

const payorder = async(req,res)=>{
    try{
        
      const newOrder = Order(
        req.body
      );
      await newOrder.save();
      res.send({
        msg:'Payment was successful',
      })
    }catch(err){
       console.log(err);
       res.status(500).send(err);
    }
}

const getorder = async(req,res)=>{
    const {user:{userId},
       params:{id:orderId}
    } = req;

    const order = await Order.findOne({
        _id:orderId,createdBy:userId
    });

    if(!order){
        throw new NotFoundError(`No order Id found ${orderId}`);
    }
   

    return res.status(StatusCodes.OK).json({order});

}

const getallorder = async(req,res)=>{
    
    const order = await Order.find().sort('createdAt');
   
    return res.status(StatusCodes.OK).json({order,count:order.length})
}

const updateorder = async(req,res)=>{
    const {
        user:{userId},
        params:{id:orderId},
        body:{
            products:{productId,quantity},
            amount,address
        }
    } = req;

    if( productId === " " || quantity === " " || amount === " " || address === " "){
     throw new BadRequestError("This cannot be blank") ;
    }

    const order = await Order.findByIdAndUpdate({
        _id:orderId,createdBy:userId
    });

    if(!order){
        throw new NotFoundError(`No order found with ${orderId}`)
    }


    return res.status(StatusCodes.OK).json({order});
}



const removeorder = async(req,res)=>{
    const {
        user:{userId},
        params:{id:orderId},
       
    } = req;

  

    const order = await Order.findByIdAndRemove({
        _id:orderId,createdBy:userId
    });

    if(!order){
        throw new NotFoundError(`No order found with ${orderId}`)
    } 


    return res.status(StatusCodes.OK).json('Removed');
}


module.exports = {createOrder,getorder,getallorder,updateorder,removeorder,payorder,getrazorpaykey};