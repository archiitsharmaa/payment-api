const express = require('express')
const router = express.Router();
const verify = require('./verifyToken');

const Payments = require('../models/Payments');

router.post('/',verify, async (req, res) => {

    const {userId, confirmationNumber, paymentType, accountNumber,
        email, channel, paymentAmountMinRange,paymentAmountMaxRange, 
        startDate, endDate, paymentMethod,Status}  = req.body;

   // const x = "abc@gmail.com";
   const x = { $exists: true } ;
    const payments = await Payments.find({
        userId:userId,
        confirmationNumber:confirmationNumber,
        paymentType:paymentType,
        accountNumber:accountNumber,
        email:email,
        channel:channel,
        paymentAmountMinRange:paymentAmountMinRange,
        paymentAmountMaxRange:paymentAmountMaxRange,
        startDate:startDate,
        endDate:endDate,
        paymentMethod:paymentMethod,
        Status:Status
    });

    //{sent_at: { $exists: true }}
    
    return res.json(payments);
    
})


module.exports = router;