const mongoose = require("mongoose")

const isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false 
    return true;
}


const isValidBody = function (requestBody) {
    return Object.keys(requestBody).length > 0;
}


const isValidNumber = function (value) {
    if (!(/^(\+\d{1,3}[- ]?)?\d{10}$/.test())) {
        return false
    }
    return true
}

const isValidEmail = function (value) {
    if ((/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/).test(value.trim())){
        return false
    }
    return true
}

const isValidPassword = function(value) {
    if(!(/^[a-zA-Z0-9'@&#.\s]{8,15}$/.test(value.trim()))) {
        return false
    }
    return true
}

const isValidobjectId = (objectId) => {
    return mongoose.Types.ObjectId.isValid(objectId)
}




module.exports.isValid = isValid
module.exports.isValidBody = isValidBody
module.exports.isValidNumber = isValidNumber
module.exports.isValidEmail = isValidEmail
module.exports.isValidPassword = isValidPassword
module.exports.isValidobjectId = isValidobjectId
