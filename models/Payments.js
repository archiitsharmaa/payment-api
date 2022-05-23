const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

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

    }

})

module.exports = mongoose.model('Payments', PaymentSchema);

