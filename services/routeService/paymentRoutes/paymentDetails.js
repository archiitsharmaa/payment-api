//importing Payment model
const Payments = require('../../../models/Payments');

//importing logger module
const logger = require("../../../logger");

//payment details based on particular confirmation number
async function paymentDetailsService(req,res){
    
    //fetching confirmation number from request body
    const {confirmationNumber} = req.body;

    console.log("*******");

    try{
    
        //finding data based on confirmation details
        const payment = await Payments.find({
            confirmationNumber:confirmationNumber
    
    })

    //if none details are fetched
    if(payment.length){
    logger.info("Payments Details data with confirmation number " + confirmationNumber);
    }
    return res.json(payment);
}
catch(err){
    //error handling
    logger.error("Error while fetching data for confirmation number " + confirmationNumber);
    return res.json({"message":"Unable to fetch details"});
}        
}

module.exports = paymentDetailsService;