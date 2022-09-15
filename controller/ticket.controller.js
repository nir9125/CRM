
const Ticket = require("../models/ticket.model");
const User = require("../models/userModels");
const constants = require("../utils/constant")
const objectConverter=require("../utils/objectconverter");
const notificationServiceClient = require("../utils/Notificationservice");
exports.createTicket = async (req, res) => {
    
    const ticketObj = {
        title: req.body.title,
        description: req.body.description,
        ticketPriority: req.body.ticketPriority,
        reporter: req.userId
    }
    try {
        const engineer = await User.findOne({
            userType: constants.userType.engineer,
            userStatus: constants.userStatus.approved
        });
        
        if (engineer) {
            ticketObj.assignee = engineer.userId;
        }
        const ticket = await Ticket.create(ticketObj);
        if(ticket){
            const user= await User.findOne({ userId:req.userId});
            user.ticketCreated.push(ticket._id);
            await user.save();

            engineer.ticketAssigned.push(ticket._id);
           await engineer.save();
         //notificationServiceClient.sendMail(ticket._id,"CREATED NEW TICKET :"+ticket._id,ticket.description,user.email+","+engineer.email,user.email);
     
            return res.status(201).send(objectConverter.ticketResponse(ticket));
        }
}
    catch (err) {
        console.log(err.message);
        return res.status(500).send({
            message: "Some internal error"
        })
    }

} 

exports.getAllTickets= async (req,res)=>{

// const ticket=[];
const user=await User.findOne({userId:req.userId});
const queryObj={};


if(req.query.status!=undefined){
    queryObj.status=req.query.status;
}

if(user.userType==constants.userType.admin){
    

}
else if(user.userType==constants.userType.customer){
   if(user.ticketCreated==undefined||user.ticketCreated.length==0)
{
    return res.status(200).send({
        message:"NO TICKETS ARE CREATED"
    })
}
queryObj._id={
        $in:user.ticketCreated
    }
}
else if(user.userType==constants.userType.engineer){

    const ticketlist=[];
    if(user.ticketCreated)
    {user.ticketCreated.forEach(t => {
        ticketlist.push(t);
    });
        
    }
    if(user.ticketAssigned)
    {
        user.ticketAssigned.forEach(t => {
            ticketlist.push(t);
        });
        
    }
    // console.log(ticketlist);
    queryObj._id={
        $in:ticketlist
    }

}
console.log(queryObj);
const ticketobj=await Ticket.find(queryObj);
//console.log(ticketobj);
return res.status(200).send(objectConverter.ticketListResponse(ticketobj));

}
exports.getTicketById=async (req ,res)=>{
   
    const ticketId=req.params.id;
   // console.log(ticketId);
    const ticket= await Ticket.findOne({_id:ticketId});
    //console.log(ticket);
    if(ticket==undefined){
        res.status(403).send({
            message:"TICKET ID NOT FOUND "
        })
    }



  return res.status(200).send(objectConverter.ticketResponse(ticket));
}

exports.updateTicket = async (req, res)=>{

    // Check if the ticket exists
    const ticket = await Ticket.findOne({
        _id : req.params.id
    });

    if(ticket == null){
        return res.status(200).send({
            message : "Ticket doesn't exist"
        })
    }

    /**
     * Only the ticket request be allowed to update the ticket
     */
    const user =  await User.findOne({
        userId : req.userId
    });
    //console.log(user);
// console.log((user[0].ticketsCreated == undefined||(!user[0].ticketCreated.includes(req.params.id))));

   // if((user.ticketsCreated == undefined||(!user.ticketCreated.includes(req.params.id)))&&(!(user.userType==constants.userType.admin))&&(!(ticket.assignee==req.userId)))
   if(!user.ticketCreated.includes(req.params.id) &&(!(user.userType==constants.userType.admin))&&(!(ticket.assignee==req.userId)))
    {
        return res.status(403).send({
           message : "Only owner/admin/ASSIGNNED ENGINEER of the ticket is allowed to update"
        })
    }

   

    ticket.title = req.body.title != undefined ? req.body.title :ticket.title ;
    ticket.description  = req.body.description != undefined ? req.body.description :ticket.description;
    ticket.ticketPriority  = req.body.ticketPriority != undefined ? req.body.ticketPriority :ticket.ticketPriority;
    ticket.status  = req.body.status != undefined ? req.body.status :ticket.status;

 
 //console.log(ticket);
    const updatedTicket = await ticket.save();

    // Return the updated ticket
    if(user.userType== constants.userType.admin){
        ticket.assignee = req.body.assignee != undefined ? req.body.assignee :ticket.assignee ;

    }

    return res.status(200).send( objectConverter.ticketResponse(updatedTicket));
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 /*var count=0;
user.ticketCreated.forEach( async ele => {
     
     ticket.push(await Ticket.findOne({_id:ele}));
    count++;
     if(count>=user.ticketCreated.length)
     { 
return res.status(200).send(objectConverter.ticketListResponse(ticket));
     } 
      
}


);*/