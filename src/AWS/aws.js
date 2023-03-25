const S3 = require("aws-sdk/clients/s3")
const s3=new S3({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY, 
    region:"ap-northeast-1"
})

        function uploadFile(file){
            console.log(".......12")
            console.log(file.path, ' ...file path')
    const uploadParams={
        Bucket:"daybed-resources",
        Body:file,
        Key:file.originalname,
        Body: file.buffer
    }
    console.log(uploadParams, ' ......upload params')
    return s3.upload(uploadParams).promise()
    

    
}


function getFileStream(fileKey){
const downloadParams={
Bucket:"daybed-resources",
Key:fileKey,
}
return s3.getObject(downloadParams).createReadStream()
}

const uploadDesign=async(req,res)=>{
    const file=req.files;
    const result = await uploadFile(file[0]);
    console.log(result);
    res.json({status:true,data:result})
}
module.exports.uploadDesign=uploadDesign

exports.retriveDesign=async(req,res)=>{
    const key=req.params.key;
    const readStream=getFileStream(key)
    readStream.pipe(res)
}