const mongoose= require("mongoose")
const designSchema= new mongoose.Schema({
    title:{type:String,trim:true,required:true},
     description:{type:String,trim:true},
     creator:{type:String,trim:true,required:true},
     price:{type:Number,trim:true,required:true},
     tags:{type:Array,trim:true}
},{timestamps:true})
module.exports=mongoose.model("design",designSchema)