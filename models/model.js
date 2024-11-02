const { default: mongoose } = require("mongoose");
const connectionDb = require("../database/database");



const jwtSchema = new mongoose.Schema({
    email:{
        type : String,
        required:true,
        unique:true
    },
    password:{
        type : String,
        required:true,
    },
    resetPasswordToken :{
        type:String
    },
    resetPasswordExpires :{
        type:Date
    }
})

module.exports.jwtModel = connectionDb.model('users',jwtSchema);

