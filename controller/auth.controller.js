
const constants = require("../utils/constant");
const User = require("../models/userModels");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const configs=require("../utils/auth.configs");
exports.signup = async (req, res) => {


  //HOW THE USER SIGN UP WILL HAPPEN    
 // console.log(req.body);
  var userStatus = req.body.userStatus;

  /**
    *UserType: Customer ->Approved
    UserType:Engineer->Pending
    */
  if (!req.body.userStatus) {
    if (!req.body.userType || req.body.userType == constants.userType.customer) {
      userStatus = constants.userStatus.approved;
    }
    else
      userStatus = constants.userStatus.pending;
  }
  const userObjToBeStore = {
    name: req.body.name,
    userId: req.body.userId,
    email: req.body.email,
    userType: req.body.userType,
    password: bcrypt.hashSync(req.body.password, 8),
    userStatus: userStatus
  }

  try {
    const userCreated = await User.create(userObjToBeStore);  //this line adds to the database

   // console.log("userCreated", userCreated);

    const userCreationResponse = {
      name: userCreated.name,
      userId: userCreated.userId,
      email: userCreated.email,
      userType: userCreated.userType,
      userStatus: userCreated.userStatus,
      createdAt: userCreated.createdAt,
      updatedAt: userCreated.updatedAt
    }

    return res.status(201).send(userCreationResponse);

  }
  catch (err) {
    console.log("ERROR IN ADDING NEW USER", err.message);
   return res.status(401).send({
      message: "BAD REQUEST"
    });

  }
};

exports.signin = async (req, res) => {

  //  console.log(req.body);
  //  return res.status(200).send("shi ai");
  try {
    var user = await User.findOne({ userId: req.body.userId });
  }
  catch (err) {
    
    console.log(err.message);
    return res.status(500).send({
      message:"USERID NOT FOUND"
    })
  }
  try{
  if (!user) {
    return res.status(200).send("USER NOT FOUND");
  }
  else {
    if(user.userStatus!=constants.userStatus.approved){
    return res.status(200).send({
        message:"USER STATUS IS PENDING"
      })
    }
    const isPasswordValid = bcrypt.compareSync(req.body.password, user.password);

    if (!isPasswordValid) {
      return res.status(200).send(
        { message: "PASSWORD DID NOT MATCH" }
      )
    }
    const token = jwt.sign({ id: user.userId }, configs.secret.code , {
      expiresIn: 600
    });
    const userResponse = {
      name: user.name,
      userId: user.userId,
      userStatus: user.userStatus,
      email: user.email,
      token: token,
    }

    return res.status(200).send(userResponse);

  }
  }
  catch(err){
    console.log(err.message);
    return res.status(500).send({
      message:"SOME ERROR"
    });
  }


};
