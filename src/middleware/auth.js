const jwt = require('jsonwebtoken')
const userModel=require("../models/userModel")
require("dotenv").config()
const Authenticate = async function(req, res, next){
    
   try{

    const bearerToken = req.headers.authorization;
    if (!bearerToken) return res.status(404).send({ status: false, msg: "token must be present" });
    const token = bearerToken.split(" ")[1];

    let decodedToken = jwt.verify(token, process.env.SECRETKEY)
    if(!decodedToken) {return res.status(400).send({status:false, msg:"Invalid token id"})}
      console.log(decodedToken);

   if(userId=req.body.userId){
    if(decodedToken.userId != req.body.userId) return res.status(400).send({status:false, msg:"You are not authorised user"})
   }
    
 next()
}catch(err){
    console.log("This is the error :", err.message);
    return res.status(500).send({ msg: "Error", error: err.message });
       
}

}
module.exports.Authenticate=Authenticate