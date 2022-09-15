const ticketController=require("../controller/ticket.controller");
const authjwt=require("../middlewares/auth.verifyToken")
module.exports=(app)=>{
    app.post("/crm/api/v1/ticket",[authjwt.verifyToken],ticketController.createTicket);

    app.get("/crm/api/v1/ticket",[authjwt.verifyToken],ticketController.getAllTickets);

    app.get("/crm/api/v1/ticket/:id",[authjwt.verifyToken],ticketController.getTicketById);


    app.put("/crm/api/v1/ticket/:id",[authjwt.verifyToken],ticketController.updateTicket);

}