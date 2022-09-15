
/*
this file will hold the schema for the users 
*/

const mongoose=require("mongoose");
const { userStatus, userType } = require("../utils/constant");
const userSchema =new mongoose.Schema({
        name:{
            required:true,
            type: String,
        },
        email:{
           required:true,
           type: String,
           lowercase:true,
        },
       userType:{
       
             type:String,
             default:"CUSTOMER"
          },
      userId:{
          type:String,
          unique:true
      },
      password:{
         required:true,
        type:String

      },
      userStatus:{
  
        type:String,
        default:"APPROVED"
      },
      updatedAt:{
          type:Date,
          default: Date.now(),
          immutable:true
      },
      createdAt:{
        type:Date,
        default: Date.now(),
        
    },
    ticketCreated : {
        type : [mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    },
    ticketAssigned : {
        type : [ mongoose.SchemaTypes.ObjectId],
        ref : "Ticket"
    }

    
})
module.exports=mongoose.model("user",userSchema);