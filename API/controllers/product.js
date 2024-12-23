const {StatusCodes} = require('http-status-codes');
const Product = require('../models/Product')
const {BadRequestError,NotFoundError} = require('../errors');


const createproduct = async(req,res)=>{
     
    const product = await Product.create(req.body);
    
    return res.status(StatusCodes.CREATED).json({product});

}

const updateProduct = async(req,res)=>{
    const {
        body:{title,desc,img,categories,size,color,price},
        params:{id:productId}
    } = req;

    if(title==="" || desc === "" || img === "" || categories === "" || size === "" || color === "" || price === ""){
       throw new BadRequestError('This Can not be Blank')
    }

    const product = await Product.findByIdAndUpdate({_id:productId},req.body,{new:true,runValidators:true});

    if(!product){
        throw new NotFoundError('No Product Found with id ${productId')
    }
     
    res.status(StatusCodes.OK).json({product});
}

const deleteProduct = async(req,res)=>{
    const {
        user:{userId},
        params:{id:productId}
    }=req;
  

    const product = await Product.findByIdAndRemove({
        _id:productId,
        createdBy:userId
    })

    if(!product){
        throw new NotFoundError(`no Product ID with ${productId}`)
    }

    res.status(StatusCodes.OK).send();
}

const getallproduct = async(req,res)=>{
    const qnew = req.query.new;
    const qcategory = req.query.category;
    
    try{
        let products ;

        if(qnew){
            products = await Product.find().sort({createdAt:-1});
            
        }
        else if (qcategory){
            products = await Product.find({
                categories: {
                    $in : [qcategory],
                }
            })

            
        }
        else {
            products = await Product.find();
        
        }
       
     res.status(StatusCodes.OK).json({products,count:products.length})
    }catch(error){
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
    
    
    
}

const getproduct = async(req,res)=>{
    const {params:{id:productId}} = req;

    const product = await Product.findOne({
        _id:productId
    });
    
     if(!product){
        throw new NotFoundError(`no Product ID with ${productId}`)
    }
    res.status(StatusCodes.OK).json({product});
}



module.exports = {createproduct,updateProduct,deleteProduct,getallproduct,getproduct} ;