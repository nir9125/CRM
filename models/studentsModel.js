const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    country: String,
    pincode: Number
}
);

const studentsSchema = new mongoose.Schema({

    name: {

        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 16,
        max: 60
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        minlength: 10

    },
    createdAt: {
        type: Date,
        default: () => {
            return Date.now();
        },
        immutable: true
    },
    updatedAt: {
        type: Date,
        default: () => {
            return Date.now();
        }

    },
    subjects: {
        type: [String],
        validate: {
            validator: arr => arr.length >= 2, //
            message: "Subjects selected can't be less than 2"
        }
    },
    address: addressSchema
}

);
module.exports=mongoose.model('Student',studentsSchema);