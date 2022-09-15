
const constants = require("../utils/constant")
const mongoose = require("mongoose");
const TicketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ticketPriority: {
        type: Number,
        default: constants.ticketPriority.four
    },
    status: {
        type: String,
        required: true,
        default: constants.ticketStatus.open
    },
    createdAt: {
        type: Date,

        immutable: true,
        default: () => {
            return Date.now();
        }
    },
    updatedAt: {
        type: Date,


        default: () => {
            return Date.now();
        }
    },
    reporter: {
        type: String
    },
    assignee: {
        type: String
    },
});
module.exports=mongoose.model("Ticket",TicketSchema);