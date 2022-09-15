/**
 * 
 */
const jwt = require("jsonwebtoken");
const configs = require("../utils/auth.configs");
const constants = require("../utils/constant");
const User = require("../models/userModels");
verifyToken = async (req, res, next) => {

    const token = req.headers['x-access-token'];
    if (!token) {
        return res.status(400).send({
            message: "TOKEN IS REQUIREd"
        })
    }
    jwt.verify(token, configs.secret.code, (err, decoded) => {
        if (err) {
            console.log(err.message);

            return res.status(403).send({
                message: "TOKEN IS INCORRECT"
            });
        }
        //console.log("ffff ",decoded);
        req.userId = decoded.id;
        next();
    })

};
isAdmin = async (req, res, next) => {
    const user = await User.findOne({ userId: req.userId });
    //  console.log(req.userId);
    if (user && user.userType == constants.userType.admin) {
        next();
    }
    else {
        return res.status(400).send({
            message: "ONLY ADMIN ARE ALLOWED"
        });
    }

};


const authjwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
module.exports = authjwt;