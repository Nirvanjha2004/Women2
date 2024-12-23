const User = require('../models/User');
const {BadRequestError,UnauthenticatedError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const register = async function(req,res){
    const user = await User.create({...req.body});
    const token = user.createJWT();
    console.log(user);
   
    return res.status(StatusCodes.CREATED).json({
        user: {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            isAdmin: user.isAdmin
        },
        token
    });
}

const login = async function(req,res){
    const {email,password} = req.body;
     
    if(!email || !password){
        throw new BadRequestError("Please provide email and password");
    }

    const user = await User.findOne({email});

    if(!user){
        throw new UnauthenticatedError("Register first");
    }
  
    const isPasswordCorrect = await user.comparePassword(password);     
    if(!isPasswordCorrect){
        throw new UnauthenticatedError('Invalid credentials');
    }

    const token = user.createJWT();
    
    return res.status(StatusCodes.OK).json({
        user: {
            id: user._id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            isAdmin: user.isAdmin
        },
        token
    });
}

module.exports = {register,login};