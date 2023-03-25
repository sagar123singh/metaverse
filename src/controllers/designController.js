const designModel= require("../models/designModel")
const userModel= require("../models/userModel")


exports.fetchDesign=async(req,res)=>{
    try {
        //*******fetching data*********** */
        const dataRes = await designModel.find();
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "data fetched", data: dataRes });

    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 
//**CREATE DESIGN********************************************************************************************* */
exports.createDesign=async(req,res)=>{
    const data = req.body;
    try {
        const requiredFields = ["title","creator","price"];

        for (let i = 0; i < requiredFields.length; i++) {
            if (data[requiredFields[i]] === undefined) {
                return res.status(400).json({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (data[requiredFields[i]] === "null" || data[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }
        let userExit = await userModel.findOne()
        if (userExit.fullName != data.creator) {
            return res.status(400).send({ status: false, msg: "enter correct username" })
        }
        
        //*******create*********** */
        const dataRes = await designModel.create(data);
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "design created", data: dataRes });

    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 




//**UPDATE DESIGN**************************************************************************************** */
exports.updateDesign=async(req,res)=>{
    const userID=req.params.userID;
    const data = req.body;
    try {
        let fetchedData=await designModel.find({userID:userID})
        if(!fetchedData){
            return res.status(404).json({status:false,msg:"data doesn't exit"})
        }
        
        //*******update*********** */
        const dataRes = await designModel.findByIdAndUpdate(userID,data,{new:true});
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "design updated", data: dataRes });

    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 



//**DELETE DESIGN********************************************************************************************** */

exports.deleteDesign=async(req,res)=>{
    const userID=req.params.userID;
    console.log(userID,"dkfjhdkjfh");
    try {
        let fetchedData=await designModel.find({userID:userID})
        if(!fetchedData){
            return res.status(404).json({status:false,msg:"data doesn't exit"})
        }
        
        //*******update*********** */
        const dataRes = await designModel.findByIdAndRemove(userID);
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "design deleted"});

    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 



//**SEARCH DESIGN**************************************************************************************** */


exports.searchDesign=async(req,res)=>{
    
    try {
        const data = req.query;
        const keys = Object.keys(data);

        if (keys.length > 0) {
            const requiredParams = ['title', 'description', 'tags'];

            for (let i = 0; i < keys.length; i++) {
                if (!requiredParams.includes(keys[i])) {
                    return res.status(400).send({ status: false, message: `Only these Query Params are allowed [${requiredParams.join(", ")}]` });
                }
            }

            let queryData = {};
            for (let i = 0; i < keys.length; i++) {
                if (keys[i] == 'title') {
                    queryData.title= data.title
                }
                else if (keys[i] == 'description') {
                    queryData.description=data.description
                }
                else if (keys[i] == 'tags') {
                    queryData.tags=data.tags
                    }
                
            }
        
        
        //*******fetching*********** */
        const dataRes = await designModel.find(queryData);
        console.log(dataRes)
        return res.status(201).send({ status: true, message: "fetching details",data:dataRes});
        }
    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 

