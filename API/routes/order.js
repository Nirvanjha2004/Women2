const express = require('express');

const router = express.Router();

const {createOrder,getorder,getallorder,updateorder,removeorder,payorder,getrazorpaykey} = require('../controllers/order');
const {auth,verifytokenandadmin} = require("../middlewares/authentication");
router.post("/create-order",auth,createOrder);
router.get("/find/:id",auth,getorder);
router.get("/get-razorpay-key",auth,getrazorpaykey);
router.post("/pay-order",auth,payorder);
router.get("/",verifytokenandadmin,getallorder);
router.patch("/:id",verifytokenandadmin,updateorder);
router.delete("/:id",verifytokenandadmin,removeorder);


module.exports = router ;