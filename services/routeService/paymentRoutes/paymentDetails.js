const Payments = require('../../../models/Payments');
const logger = require("../../../logger");


async function paymentDetailsService(req,res){
    
    const {confirmationNumber} = req.body;

    try{
    
        const payment = await Payments.find({
            confirmationNumber:confirmationNumber
    
    })
    if(payment.length){
    logger.info("Payments Details data with confirmation number " + confirmationNumber);
    }
    return res.json(payment);
}
catch(err){
    logger.error("Error while fetching data for confirmation number " + confirmationNumber);
    return res.json({"message":"Unable to fetch details"});
}        
}

module.exports = paymentDetailsService;