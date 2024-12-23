
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
   
createdBy:{type:String,unique:true},
products:[
        {
            productId:{type:String},quantity:{type:Number,default:1},amount:{type:Number,default:1},color:{type:String},size:{type:String}
        }
    ]
    
},
  {timestamps:true}
)


module.exports = mongoose.model("Cart",CartSchema);