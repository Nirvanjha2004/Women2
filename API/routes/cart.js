const express = require('express');

const router = express.Router();

const {createcart,updatecart,getallcart,deleteCart,getcart} = require('../controllers/cart');
const {auth,verifytokenandadmin} = require("../middlewares/authentication");

router.post("/create-cart",auth,createcart);
router.patch("/update-cart/:id",auth,updatecart);
router.delete("/delete-cart/:id",auth,deleteCart);
router.get("/find-cart/:id",auth,getcart);
router.get("/",verifytokenandadmin,getallcart);


module.exports = router ;