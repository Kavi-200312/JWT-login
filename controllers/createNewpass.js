const { jwtModel } = require("../models/model");
const bcrypt =require("bcrypt");

module.exports.createNewpass = async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    const user = await jwtModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    })
    if (!user) {
        return res.status(400).json({ msg: "invaild token" })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(hashedPassword);
    
    user.password = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return res.status(200).json({ msg: "password successfully changed" })

}