//importing moongose module for mongodb
const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

//declaring the Payment schema with feilds
const PaymentSchema = mongoose.Schema({
    userId:{
        type: Number,
        required : true
    },
    confirmationNumber: {
        type : Number,
        required:true

    },
    paymentType:{
        type: String,
        required : true
    },
    accountNumber: {
        type : Number,
        required:true

    },
    email:{
        type: String,
        required : true
    },
    channel: {
        type : String,
        required:true

    },
    paymentDate:{
        type: Date,
        required : true
    },
    paymentAmount:{
        type: Number,
        required : true
    },
    paymentMethod:{
        type: String,
        required : true
    },
    Status: {
        type : String,
        required:true

    },
    cardType: {
        type : String,
        required:true

    },
    cardNumber: {
        type : String,
        required:true

    },
    Name: {
        type : String,
        required:true

    },
    contactNumber: {
        type : String,
        required:true

    },
    Zip: {
        type : String,
        required:true

    },


})

module.exports = mongoose.model('Payments', PaymentSchema);

