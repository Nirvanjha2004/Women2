const User = require('../models/User');
const {BadRequestError,UnauthenticatedError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const register = async function(req,res){
    const user =await User.create({...req.body});
    const token = user.createJWT();
   
    return res.status(StatusCodes.CREATED).json({user:{name:user.name},token})

}

const login = async function(req,res){
     const {email,password} = req.body;
     
    if(!email || !password){
        throw new BadRequestError("please provide email/password")
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError("Invalid Credientials");
    }
  
     const correcpass = await user.comparePassword(password) ;     
     if(!correcpass){
       throw new UnauthenticatedError('invalid credientials');
     }

    const token = user.createJWT();
   
    return res.status(StatusCodes.CREATED).json({user:{isAdmin:user.isAdmin,id:user._id},token})
}

module.exports = {register,login};