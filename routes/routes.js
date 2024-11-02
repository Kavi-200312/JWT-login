const { createNewpass } = require("../controllers/createNewpass");
const { JWT } = require("../controllers/JWT");
const { resetPassword } = require("../controllers/resetPassword");
const { saveEmailPassword } = require("../controllers/saveEmailPassword");
const verifyToken = require("../middleware/verifyToken");

const router = require("express").Router();


router.route("/newUser").post(saveEmailPassword);
router.route("/authenticate").post(JWT);
router.route("/verify").get(verifyToken,async(req,res)=>{
    return res.status(200).json({msg:`${req.user.email} this protected data`})
});

router.route("/reset-password").post(resetPassword);
router.route("/reset-password/:token").post(createNewpass);

module.exports = router;