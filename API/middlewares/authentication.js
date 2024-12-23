const jwt = require('jsonwebtoken');
const {UnauthenticatedError} = require('../errors');

const auth = async(req,res,next)=>{
   
    const authheader = req.headers.token;
      
    if(!authheader || !authheader.startsWith('Bearer')){
       
        throw new UnauthenticatedError('invalid credientials han bhai mai hun dekh ab')
    }

    const token = authheader.split(' ')[1] ;

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);      
        req.user = {userId:payload.userId,name:payload.name,isAdmin:payload.admin};     
        next();
    }
    catch(error){
        console.log(error);
       res.status(403).json('You are not allowed to do that-authhunmai')
    }
}

const verifytokenandadmin = (req,res,next)=>{
    auth(req,res,()=>{
        try {      
        if(req.user.isAdmin){
            console.log(req.user.isAdmin);
            next();
        }
    }catch(error){
        console.log(error);
       res.status(403).json('You are not allowed to do that')
    }
    })
}


module.exports = {auth,verifytokenandadmin};
