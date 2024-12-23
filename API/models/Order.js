const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  
   createdBy:{type:Number},
    amount:{type:Number,required:true},
   address:{type:Object},
    products:[
        {
            productId:{type:String},quantity:{type:Number}
        }
    ],
    status:{type:String,default:"pending"},
    razorpayPaymentId:{type:String},
    razorpayOrderId:{type:String},
    razorpaySignature:{type:String},
    status:{type:String,default:"pending"}
   
},
{
    timestamps:true
}

)

module.exports = mongoose.model("Order",OrderSchema);