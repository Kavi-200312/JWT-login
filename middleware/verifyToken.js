const jwt = require("jsonwebtoken");
const { jwtModel } = require("../models/model");

const verifyToken = async (req, res, next) => {
    try {
        // Destructure authorization from headers
        const { authorization } = req.headers;

        // Check if authorization header is present
        if (!authorization) {
            return res.status(401).json({ msg: "Authorization header is missing" });
        }

        // Split the token from the "Bearer" prefix
        const token = authorization.split(" ")[1];

        // Verify the token
        jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ msg: "Invalid token" });
            }

            // Find the user associated with the token
            const user = await jwtModel.findOne({ _id: decoded.id });
            if (!user) {
                return res.status(404).json({ msg: "User not found" });
            }

            // Attach user info to the request object
            req.user = user;
            next(); // Proceed to the next middleware or route handler
        });
    } catch (error) {
        console.error(`${error.message} >>>>>>> verifyToken.js`);
        return res.status(500).json({ msg: "Something went wrong", code: 500 });
    }
};

module.exports = verifyToken;
