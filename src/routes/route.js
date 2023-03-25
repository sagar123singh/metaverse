
const express=require("express");
const { uploadDesign, retriveDesign } = require("../AWS/aws");
const { createDesign, fetchDesign, updateDesign, deleteDesign, searchDesign } = require("../controllers/designController");
const { register, login } = require("../controllers/userContrller");
const { Authenticate } = require("../middleware/auth");
const router= express.Router()

router.post("/register",register)
router.post("/login",login)
router.post("/design",Authenticate, createDesign)
router.get("/fetch",fetchDesign)
router.put("/user/:userID",Authenticate, updateDesign)
router.delete("/user/:userID",Authenticate, deleteDesign)
router.get("/search",searchDesign)
router.post("/upload",uploadDesign)
router.get("/retrieve/:key",retriveDesign)
module.exports=router;