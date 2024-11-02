const { jwtModel } = require("../models/model");
const bcrypt = require("bcrypt")

module.exports.saveEmailPassword = async (req,res)=>{
try {
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({msg:"email or password is empty",code:400})
    }

    const user = await jwtModel.findOne({email});
    if (user) {
        return res.status(409).json({msg:"user already exists",code :409})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = await jwtModel.create({
        email,
        password:hashedPassword
    })

    return res.status(200).json({msg :"User created",data:newUser,code:201})
} catch (error) {
    console.log(`${error.message}>>>>>>>>saveEmailPassword.js`)
    return res.status(500).json({msg :"something went wrong",code:500})
    
}
}