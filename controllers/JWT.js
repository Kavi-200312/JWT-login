const { jwtModel } = require("../models/model");
const bcrypt = require("bcrypt");
const genToken = require("../utils/generateToken");

module.exports.JWT = async (req,res)=>{
try {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg:"email or password is empty",code:400})
    }

    const user = await jwtModel.findOne({email});
    if (!user) {
        return res.status(404).json({msg:"user doesn't exists",code :404})
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return res.status(401).json({msg:"password incorrect"})
    }
    const token = genToken(user);

    return res.status(200).json({token:token})
} catch (error) {
    console.log(`${error.message}>>>>>>>>JWT.js`)
    return res.status(500).json({msg :"something went wrong",code:500})
    
}
}