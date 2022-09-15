
const authController = require('../controller/auth.controller');
const {verifySignUp}=require("../middlewares");
 const express=require("express");
 const app=express();
const {authjwt}=require('../middlewares');
module.exports = (app)=>{

  app.post("/crm/api/v1/auth/signup",[verifySignUp.verifySignUp],authController.signup);
  app.post("/crm/api/v1/auth/signin",authController.signin);
  
};