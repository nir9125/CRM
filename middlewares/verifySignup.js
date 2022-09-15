const User = require("../models/userModels");
const constant=require("../utils/constant");
exports.verifySignUp = async (req, res, next) => {

    if (!req.body.name) {
        return res.status(400).send({
            message: "USER NAME NOT PROVIDED"
        })
    }
    if (!req.body.email) {
        return res.status(400).send({
            message: "USER EMAIL NOT PROVIDED"
        })
    }
    if (!req.body.password) {
        return res.status(400).send({
            message: "USER password NOT PROVIDED"
        })
    }
    const userType = req.body.userType;
    const userTypes = [constant.userType.customer, constant.userType.admin, constant.userType.engineer]
    if (userType && !userTypes.includes(userType)) {
        return res.status(400).send({
            message: "Failed !  User type is not correctly provided"
        })
    }
    const user = await User.findOne({ userId: req.body.userId });
    console.log(user);
    if (user) {
        return res.status(400).send({
            message: "USERID IS ALREADY TAKEN"
        })
    }

    next();
}