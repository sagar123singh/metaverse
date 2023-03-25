const userModel=require("../models/userModel")
const validator=require("../validator/validation")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
exports.register=async(req,res)=>{
    const data = req.body;
    const file = req.files;
    try {
        const requiredFields = ['fullName','email', 'mobile', 'password'];

        for (let i = 0; i < requiredFields.length; i++) {
            if (data[requiredFields[i]] === undefined) {
                return res.status(400).json({ status: false, message: `${requiredFields[i]} field is required` });
            }
            else if (data[requiredFields[i]] === "null" || data[requiredFields[i]] == '') {
                return res.status(400).send({ status: false, message: ` Please enter valid data` });
            }
        }
        //*******EMAIL*********** */
        if (validator.isValidEmail(data.email)) {
            return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
        }

        let isDuplicateEmail = await userModel.findOne({ email: data.email })
        if (isDuplicateEmail) {
            return res.status(400).send({ status: false, msg: "email already exists" })
        }
        //*******PHONE*********** */

        if (validator.isValidNumber(data.mobile)) {
            return res.status(400).send({ status: false, message: 'The mobile number must be 10 digits and should be only Indian number' });
        }

        let duplicateMobile = await userModel.findOne({ mobile: data.mobile })
        if (duplicateMobile) {
            return res.status(400).send({ status: false, msg: "mobile number already exists" })
        }

        //*******PASSWORD*********** */
        if(!validator.isValidPassword(data.password)) {
            return res.status(400).send({ status: false, msg: "Invalid password"});
        }

        data.password = bcrypt.hashSync(data.password, 10);

        //*******create*********** */
        const dataRes = await userModel.create(data);
        console.log(dataRes)
        delete(dataRes.password)
        return res.status(201).send({ status: true, message: "user successfully registered", data: dataRes });

    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
} 
//****************************************************************************************************** */



exports.login=async(req,res)=>{
    try {
        const data = req.body;
        const { email, password } = data;

    if (email===undefined || email.trim() == '') {
        return res.status(400).send({status: false,message: 'Email field is required ' });
    }

    if (password===undefined|| password.trim() == '') {
         return res.status(400).send({status: false,message: 'Password field is required '});
    }


       //*******EMAIL*********** */
       if (validator.isValidEmail(data.email)) {
        return res.status(400).send({ status: false, message: 'Enter a valid Email Id' });
    }
    
        const userRes = await userModel.findOne({ email: email});
        if (!userRes) {
            return res.status(401).send({ status: false,message: 'user is not registerd with this mail'});
        }
        bcrypt.compare(password, userRes.password, (err,result) => {
            if (result === true) {
                const userID = userRes._id
            const payLoad = { userId: userID }
            const secretKey = process.env.SECRETKEY

            // creating JWT

            const token = jwt.sign(payLoad, secretKey, { expiresIn: "1hr" })

            res.header("Authorization", "bearer" + " " + token)

            res.status(200).send({ status: true, message: " user login successful", data: { userId: payLoad.userId, token: token } })

            } else{
                return res.status(400).send({ status: false, message: "incorrect password" })
            }
        })


    } catch (error) {
        console.log("errr",error);
        res.status(500).json({status:false,msg:error.msg,})
    }
}

