const express = require("express");

const router = express.Router();
const {getalluser,getuser,updateuser,deleteuser} = require("../controllers/user");
const {verifytokenandadmin} = require("../middlewares/authentication");
router.get("/",verifytokenandadmin,getalluser);
router.get("/:id",verifytokenandadmin,getuser);
router.patch("/:id",verifytokenandadmin,updateuser);
router.delete("/:id",verifytokenandadmin,deleteuser)


module.exports = router ;