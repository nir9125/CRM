/**
 * fetch all list of users
 * only admin
 * admin should be able to filter based on name,usertype,userStatus
 * 
 */
/**
 * update the user -status,type
 * only admin 
 */
const objectConverter = require("../utils/objectconverter");
const User = require("../models/userModels");


exports.findAllUsers = async (req, res) => {

    const mongoQuery = {};
    const nameReq = req.query.name;
   console.log(req.params.userId); 
    const userStatusReq = req.query.userStatus;
    const userTypeReq = req.query.userType;

    if (nameReq) {
        mongoQuery.name = nameReq;
    }
    if (userTypeReq) {
        mongoQuery.userType = userTypeReq;
    }
    if (userStatusReq) {
        mongoQuery.userStatus = userStatusReq;
    }


    try {
       
        const users = await User.find(mongoQuery);
        return res.status(200).send(objectConverter.userResponse(users));
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: "INTERNAL ERROR WHILE FETCHING"
        })
    }

};

exports.updateUser = async (req, res) => {
    // console.log("update cl rha");
    // return res.status(200).send({
    //     mes:"ff"
    // })
    try {
        const userIdReq = req.params.userId;
        const userUpdate = await User.findOneAndUpdate({ userId: userIdReq }, {

            name: req.body.name,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec();
        res.status(200).send({
            message: "User record succesfully updated"
        })

    }
    catch (err) {
        console.log(err.message);
        return res.status(403).send({
            message: "SOME ERROR OCCURES WHILE UPDATING"
        })
    }


}
exports.findUserById = async (req, res) => {
    console.log("mere pass");
    const userIdReq = req.params.userId; //Reading from the request parameter
  console.log(userIdReq);
    const user = await User.find({ userId: userIdReq });
  //console.log(user);
    if (user) {
        res.status(200).send(objectConverter.userResponse(user));
    } else {
        res.status(200).send({
            message: "User with id " + userIdReq + " doesn't exist"
        })
    }
  
  
  }