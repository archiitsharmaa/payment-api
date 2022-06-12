const { loggers } = require('winston');

//importing Payment model
const Payments = require('../../../models/Payments');

//importing logger module
const logger = require("../../../logger");

//function to fetch payment data based on filters
async function paymentDataService(req,res){
    
    try{

        //fetching filters from request body
        const {userId, confirmationNumber, paymentType, accountNumber,
            email, channel, paymentAmountMinRange,paymentAmountMaxRange, 
            startDate, endDate, paymentMethod,Status}  = req.body;

            //defining filter variables
            var UserId = undefined;
            var ConfirmationNumber = undefined;
            var PaymentType = undefined;
            var AccountNumber = undefined;
            var Email = undefined;
            var Channel = undefined;
            var PaymentMethod = undefined;
            var Statuss = undefined;

            //if empty filter passed from request defing filter to be undefinded
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
            
            //add date ranges and in case none provided using first date on system as "04-02-1999 and last date as current date"
            var paymentstartDate = (startDate === "") ? new Date("04-02-1999") : new Date(startDate);
            var paymentendDate = (endDate === "") ? new Date() : new Date(endDate);  
    
            //add amount ranges and in case none provided max amount to be 2147483647 and min amount to be 0
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
    
            //finding data based on above filters for pagination meta data
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
        
        //findinga data  based on above filter
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
    
        //setting number of total records fetched
        const numberOfRecords = pagesData.length;
        logger.info("Payments data with " + numberOfRecords + " records fetched")
        
        return res.json({numberOfRecords, payments});
    }
    catch(err){
        //error handling
        logger.error("Error While fetching Payment data");
        return res.json({"message": "Invalid Payment Details"})
    }
}

module.exports = paymentDataService;