const { jwtModel } = require("../models/model");
const nodemailer = require("nodemailer")


module.exports.resetPassword = async (req, res) => {
    const { email } = req.body;

    const user = await jwtModel.findOne({ email })
    if (!user) {
        return res.status(404).json({ msg: "User not found" })
    }
    const token = Math.random().toString(36).slice(-6);

    
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; 
    
    await user.save();
    console.log(user,"line19");

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "cskkavi2003@gmail.com",
            pass: "bjzidfmdzlrdgjvg"
        }
    })

    const message = {
        from: "cskkavi2003@gmail.com",
        to: user.email,
        subject: "Password reset request",
        text: `you are reciving a email for reset your password /n verification key ${token} /n if you not request the reset password might be ignore the mail `
    }
    
    
    transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log(err,"l39");
            return res.status(404).json({ msg: "something went wrong" })
        }
        return res.status(200).json({ msg: "Password reset mail sented", data: info.response })
    })
}