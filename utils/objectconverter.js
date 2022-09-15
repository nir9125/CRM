
//const user=require("../models/userModels");

exports.userResponse = (users) => {
    const userResponse = [];

    users.forEach(user => {
        userResponse.push(
            {
                userId: user.userId,
                name: user.name,
                email: user.email,
                userStatus: user.userStatus,
                userType: user.userType
            });

    })
    return userResponse;
}
exports.ticketResponse = (ticket) => {
    return {
        _id:ticket._id,
        title: ticket.title,
        description: ticket.description,
        ticketPriority: ticket.ticketPriority,
        status: ticket.status,
        assignee: ticket.assignee,
        reporter: ticket.reporter
   
    };
}
exports.ticketListResponse = (tickets) => {
    const ticketobj = [];
    tickets.forEach( ticket => {
        ticketobj.push({
            title: ticket.title,
            description: ticket.description,
            priority: ticket.priority,
            status: ticket.status,
            id: ticket._id,
            assignee: ticket.assignee,
            createdAt: ticket.createdAt,
            updatedAt: ticket.updatedAt,
        });
    })
  
    return ticketobj;

}