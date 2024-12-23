const User = require("../models/User");
const {StatusCodes} = require("http-status-codes");
const {BadRequestError,NotFoundError} = require('../errors');
const bcrypt = require('bcryptjs');
const getalluser = async(req,res)=>{
    const user = await User.find().sort('createdAt');
    

    res.status(StatusCodes.OK).json({user,count:user.length});
}


const getuser = async(req,res)=>{
    const {params:{id:userId}} = req;

    const user = await User.findOne({
        _id:userId
    });

    if(!user){
        throw new NotFoundError(`no user id found ${userId}`)
    }


    res.status(StatusCodes.OK).json({user});
}


const updateuser = async(req,res)=>{
    const {body:{password,name,email},params:{id:userId}} = req;

    if(!password,!name,!email){
        throw new BadRequestError("This can not be blank");
    }

   const salt = await bcrypt.genSalt(10);
   req.body.password = await bcrypt.hash(req.body.password,salt);


   const user = await User.findByIdAndUpdate({
       _id:userId,
   },req.body,{new:true,runValidators:true})
  
   
    if(!user){
        throw new NotFoundError(`No user Found with id ${userId}`)
    }
res.status(200).json({user});
}



const deleteuser = async(req,res)=>{
    const {params:{id:userId}} = req;


   const user = await User.findByIdAndDelete({
       _id:userId,
   });

    if(!user){
        throw new NotFoundError(`No user Found with id ${userId}`)
    }
 
res.status(200).send();
}


module.exports = {getalluser,getuser,updateuser,deleteuser};