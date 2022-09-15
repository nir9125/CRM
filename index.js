const express=require("express");
const bodyParser=require("body-parser");
const serverConfig=require('./configs/server.config');
const User=require("./models/userModels");
const dbconfig=require("./configs/db.config")
const bcrypt=require("bcryptjs");

const app=express();
module.exports=app;
 app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
require('./routes/ticket.routes')(app);
   const mongoose = require('mongoose');
//const { init } = require("./models/userModels");
// const { db } = require('./models/studentsModel');
mongoose.connect(dbconfig.DB_URI, () => {
    console.log("CONNECTED TO MONGO WORLD");
    init();
});
 async function init(){
     var user = await User.findOne({userId:"admin1"});
     if(user!=null)
     {
         return;}
     else{   
         var user=User.create({
       name:"Niranjan",
       userId:"admin1",
       email:"niranjan@gmail.com",
       userType:"ADMIN",
       password:bcrypt.hashSync("niranjan123",7)
   });
   console.log("admin is created");
}
}

app.listen(serverConfig.PORT,()=>{
    console.log("APPLICATION STARTED AT",serverConfig.PORT);

})