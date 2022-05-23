const express = require('express')
const router = express.Router();
const verify = require('./verifyToken');

const Payments = require('../models/Payments');
const { db } = require('../models/Payments');

router.post('/',verify, async (req, res) => {

    const {userId, confirmationNumber, paymentType, accountNumber,
        email, channel, paymentAmountMinRange,paymentAmountMaxRange, 
        startDate, endDate, paymentMethod,Status}  = req.body;

        //add date ranges
        var paymentstartDate = (startDate === "") ? new Date("04-02-1999") : new Date(startDate);
        var paymentendDate = (endDate === "") ? new Date() : new Date(endDate);  

        //add amount ranges
        var AmountMinRange = (paymentAmountMinRange === null) ? 0 : paymentAmountMinRange;
        var AmountMaxRange = (paymentAmountMaxRange === null) ? 2147483647 : paymentAmountMaxRange;


        //addign pagination
        const {page =1, limit = 10} = req.query;
    
    const payments = await Payments.find({
        userId:userId,
        confirmationNumber:confirmationNumber,
        paymentType:paymentType,
        accountNumber:accountNumber,
        email:email,
        channel:channel,

        paymentAmount: {
            $gte: AmountMinRange,
            $lte: AmountMaxRange
        },

        paymentDate : {
        $gte: paymentstartDate,
        $lte: paymentendDate
       },

        paymentMethod:paymentMethod,
        Status:Status
    })
    .limit(limit *1)
    .skip((page-1)*limit);
    
    return res.json(payments);
    
})


module.exports = router;