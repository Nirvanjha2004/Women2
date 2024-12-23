const {StatusCodes} = require('http-status-codes');
const Cart = require('../models/Cart');
const {BadRequestError,NotFoundError} = require('../errors');

const createcart = async(req,res)=>{
    req.body.createdBy = req.user.userId;
     
    const cart = await Cart.create(req.body);

    return res.status(StatusCodes.CREATED).json({cart});

}

const updatecart = async(req,res)=>{
   const {
       body:{products:{quantity,productId}},
       user:{userId},
       params:{id:cartId}
   } = req ;

   if( productId === "" || quantity === ""){
       throw new BadRequestError("This cannot be blank") ;
   }
  
  
    const cart = await Cart.findByIdAndUpdate({_id:cartId,createdBy:userId},req.body,{new:true,runValidators:true});
     
    if(!cart){
        throw new NotFoundError(`No Cart Found with id ${cartId}`)
    }
    return res.status(StatusCodes.CREATED).json({cart});
}

const getallcart = async(req,res)=>{
    const cart = await Cart.find({});

    return res.status(StatusCodes.OK).json({cart,count:cart.length});
}

const deleteCart = async(req,res)=>{
    
    const {user:userId,params:{id:cartId}} = req ;
     
    const cart = await Cart.findByIdAndRemove({
        _id:cartId
    });
   
    if(!cart){
        throw new NotFoundError(`No Cart Found with id ${cartId}`)
    }
    return res.status(StatusCodes.OK).send();
}

const getcart = async(req,res)=>{
    const {params:{id:id}} = req ;
      
    
    const cart = await Cart.findOne({
        createdBy:id,
    });

    if(!cart){
        throw new NotFoundError(`No Cart Found with id ${id}`)
    }
    return res.status(StatusCodes.OK).json({cart});
}

module.exports = {createcart,updatecart,getallcart,deleteCart,getcart} ;