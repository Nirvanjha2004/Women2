require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();

// Import Routers
const authRouter = require('./routes/auth');
const productRouter = require('./routes/product');
const cartRouter = require('./routes/cart');
const orderRouter = require("./routes/order");
const userRouter = require("./routes/user");

// Import Middleware
const errorHandlerMiddleware = require('./middlewares/error-handler');
const notFound = require('./middlewares/not-found');
const connectDB = require('./db/connect');

// Security Packages
const cors = require('cors');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimiter = require("express-rate-limit");

// Define CORS options first
const corsOptions = {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use(rateLimiter({
   windowMs: 15*60*1000,
   max: 100,
}));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Mount routes with explicit path
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/cart', cartRouter);
app.use('/api/v1/order', orderRouter);
app.use('/api/v1/user', userRouter);

// Test route
app.get('/', (req, res) => {
    res.json({ message: "hello world" });
});

// Error handling middleware should be last
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async() => {
    try {
        await connectDB("mongodb+srv://nirvanjha2004:nirvanjha2004@nirvancluster.dx2v7kx.mongodb.net/");
        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch(error) {
        console.log(error);
    }
};

start();

module.exports = app;
