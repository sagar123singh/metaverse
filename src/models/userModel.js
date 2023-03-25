const mongoose= require("mongoose")
const userSchema= new mongoose.Schema({
    fullName:{type:String,trim:true,required:true},
    email:{type:String,trim:true,required:true,unique:true},
    mobile:{type:Number,trim:true,required:true,unique:true},
    password:{type:String,trim:true,required:true},
})
module.exports=mongoose.model("user",userSchema)