const express = require('express')
const router = express.Router();
const verify = require('../services/verifyToken');

const Payments = require('../models/Payments');
const { db } = require('../models/Payments');
const { json } = require('express/lib/response');


class Payment{

    constructor() {
        this.paymentData();
        this.paymentDetails();
        this.paymentMetaData();
    }

    paymentData(){

        router.post('/',verify, async (req, res) => {

            try{

            const {userId, confirmationNumber, paymentType, accountNumber,
                email, channel, paymentAmountMinRange,paymentAmountMaxRange, 
                startDate, endDate, paymentMethod,Status}  = req.body;

                const UserId = undefined;
                const ConfirmationNumber = undefined;
                const PaymentType = undefined;
                const AccountNumber = undefined;
                const Email = undefined;
                const Channel = undefined;
                const PaymentMethod = undefined;
                const Statuss = undefined;

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
            
            return res.json({numberOfRecords, payments});
        }
        catch(err){
            return res.json({"message": "Invalid Payment Details"})
        }
            
        })
    
            
    }

    paymentDetails() {

        router.post('/paymentDetails',verify, async (req, res) => {

            try{

            const {confirmationNumber} = req.body;
        
            const payment = await Payments.find({
                confirmationNumber:confirmationNumber
        
        })
        
        return res.json(payment);
    }
    catch(err){
        return res.json({"message":"Unable to fetch details"});
    }        
        })
        
    }

    paymentMetaData() {

        router.post('/meta-data', verify, async (req, res) => {

            try{
               const metaFeildsPaymentType = await Payments.find().distinct('paymentType');
               const metaFeildsPaymentMethod = await Payments.find().distinct('paymentMethod');
               const metaFeildsStatus = await Payments.find().distinct('Status');
               const metaFeildschannel = await Payments.find().distinct('channel');
       
           
           return res.json({metaFeildsPaymentType:metaFeildsPaymentType,metaFeildsPaymentMethod:metaFeildsPaymentMethod,
                metaFeildsStatus :metaFeildsStatus, metaFeildschannel: metaFeildschannel})
            }
            catch(err){
              return  res.json({"mssg" : "Invalid refresh token"});
            }
       
       });

    }

}


new Payment();

module.exports = router;