require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');

const connectDB = require('./db/connect');
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimtter = require("express-rate-limit");
const path = require('path');
app.use(express.json());

app.use(cors());
app.use(helmet());
app.use(xss());

app.use(rateLimitter({
   windowMs: 15*60 *1000,
   max : 100,
}));


app.use('/api/v1/auth',authRouter);
app.use('/api/v1/product',productRouter);
app.use('/api/v1/cart',cartRouter);
app.use("/api/v1/order",orderRouter);
app.use("/api/v1/user",userRouter);
app.use(errorHandlerMiddleware);
app.use(notFound);


const port = process.env.PORT || 3000;

const start = async()=>{
    
    try{
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(error){
         console.log(error);
    }
    
}



start();
