const Payments = require('../../../models/Payments');
const logger = require("../../../logger");


async function paymentMetaDataService(res){
    
    try{
        const metaFeildsPaymentType = await Payments.find().distinct('paymentType');
        const metaFeildsPaymentMethod = await Payments.find().distinct('paymentMethod');
        const metaFeildsStatus = await Payments.find().distinct('Status');
        const metaFeildschannel = await Payments.find().distinct('channel');

    
    return res.json({metaFeildsPaymentType:metaFeildsPaymentType,metaFeildsPaymentMethod:metaFeildsPaymentMethod,
         metaFeildsStatus :metaFeildsStatus, metaFeildschannel: metaFeildschannel})
     }
     catch(err){
       logger.info("Error while fetching meta-data");
       return  res.json({"mssg" : "Invalid refresh token"});
     }
}

module.exports = paymentMetaDataService;