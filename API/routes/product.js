
const express = require('express');
const router = express.Router();
const {verifytokenandadmin} = require('../middlewares/authentication');
const {createproduct,updateProduct,deleteProduct,getallproduct,getproduct} = require('../controllers/product');

router.post("/",verifytokenandadmin,createproduct);
router.patch("/:id",verifytokenandadmin,updateProduct);
router.delete("/:id",verifytokenandadmin,deleteProduct);
router.get("/:id",getproduct);
router.get("/",getallproduct);

module.exports = router ;

