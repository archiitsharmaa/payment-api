const { loggers } = require('winston');
const Payments = require('../../../models/Payments');
const logger = require("../../../logger");


async function paymentDataService(req,res){
    
    try{

        const {userId, confirmationNumber, paymentType, accountNumber,
            email, channel, paymentAmountMinRange,paymentAmountMaxRange, 
            startDate, endDate, paymentMethod,Status}  = req.body;

            var UserId = undefined;
            var ConfirmationNumber = undefined;
            var PaymentType = undefined;
            var AccountNumber = undefined;
            var Email = undefined;
            var Channel = undefined;
            var PaymentMethod = undefined;
            var Statuss = undefined;

            if(userId !== ""){
                UserId = userId;
            }

            if(confirmationNumber !== ""){
                ConfirmationNumber = confirmationNumber;
            }

            if(paymentType !== ""){
                PaymentType = paymentType;
            }

            if(accountNumber !== ""){
                AccountNumber = accountNumber;
            }

            if(email !== ""){
                Email = email;
            }

            if(channel !== ""){
                Channel = channel;
            }
            
            //add date ranges
            var paymentstartDate = (startDate === "") ? new Date("04-02-1999") : new Date(startDate);
            var paymentendDate = (endDate === "") ? new Date() : new Date(endDate);  
    
            //add amount ranges
            var AmountMinRange = (paymentAmountMinRange === "") ? 0 : parseInt(paymentAmountMinRange);
            var AmountMaxRange = (paymentAmountMaxRange === "") ? 2147483647 : parseInt(paymentAmountMaxRange);

            if(paymentMethod !== ""){
                PaymentMethod = paymentMethod;
            }

            if(Status !== ""){
                Statuss = Status;
            }
    
    
            //addign pagination
            const {page =1, limit = 5} = req.query;
    
            const pagesData = await Payments.find({
                userId:UserId,
                confirmationNumber:ConfirmationNumber,
                paymentType:PaymentType,
                accountNumber:AccountNumber,
                email:Email,
                channel:Channel,
        
                paymentAmount: {
                    $gte: AmountMinRange,
                    $lte: AmountMaxRange
                },
        
                paymentDate : {
                $gte: paymentstartDate,
                $lte: paymentendDate
               },
        
                paymentMethod:PaymentMethod,
                Status:Statuss
                
            })
        
        const payments = await Payments.find({
            userId:UserId,
            confirmationNumber:ConfirmationNumber,
            paymentType:PaymentType,
            accountNumber:AccountNumber,
            email:Email,
            channel:Channel,
    
            paymentAmount: {
                $gte: AmountMinRange,
                $lte: AmountMaxRange
            },
    
            paymentDate : {
            $gte: paymentstartDate,
            $lte: paymentendDate
           },
    
            paymentMethod:PaymentMethod,
            Status:Statuss
        })
        .limit(limit *1)
        .skip((page-1)*limit);
    
        const numberOfRecords = pagesData.length;
        logger.info("Payments data with " + numberOfRecords + " records fetched")
        
        return res.json({numberOfRecords, payments});
    }
    catch(err){
        logger.error("Error While fetching Payment data");
        return res.json({"message": "Invalid Payment Details"})
    }
}

module.exports = paymentDataService;