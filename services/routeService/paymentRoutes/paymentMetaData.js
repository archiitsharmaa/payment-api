//importing Payment model
const Payments = require('../../../models/Payments');

//importing logger module
const logger = require("../../../logger");

//method for meta details in fucntion
async function paymentMetaDataService(res){
    
    try{

        //fetching dynamic feilds
        const metaFeildsPaymentType = await Payments.find().distinct('paymentType');
        const metaFeildsPaymentMethod = await Payments.find().distinct('paymentMethod');
        const metaFeildsStatus = await Payments.find().distinct('Status');
        const metaFeildschannel = await Payments.find().distinct('channel');

    
    return res.json({metaFeildsPaymentType:metaFeildsPaymentType,metaFeildsPaymentMethod:metaFeildsPaymentMethod,
         metaFeildsStatus :metaFeildsStatus, metaFeildschannel: metaFeildschannel})
     }
     catch(err){

      //error handling
       logger.info("Error while fetching meta-data");
       return  res.json({"mssg" : "Invalid refresh token"});
     }
}

module.exports = paymentMetaDataService;