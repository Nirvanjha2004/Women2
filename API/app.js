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
const rateLimiter = require("express-rate-limit");
const path = require('path');
app.use(express.json());

const corsOptions = {
    origin: '*', // Replace with your frontend's exact URL
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
app.use((req, res, next) => {
    console.log('CORS headers applied:', res.getHeaders());
    next();
  });
app.options('*', cors(corsOptions));
app.use(helmet());
app.use(cors(corsOptions));
app.use(xss());

app.use(rateLimiter({
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
        await connectDB("mongodb+srv://nirvanjha2004:nirvanjha2004@nirvancluster.dx2v7kx.mongodb.net/");
        app.listen(port,console.log(`server is listening on port ${port}...`))
    }catch(error){
         console.log(error);
    }
    
}


app.get('/',(req,res)=>{
    res.json({message:"hello world"});
})


start();

module.exports = app;
