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
    paymentAmountMinRange:{
        type: Number,
        required : true
    },
    paymentAmountMaxRange: {
        type : Number,
        required:true

    },
    startDate:{
        type: String,
        required : true
    },
    endDate: {
        type : String,
        required:true

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

