const refreshVerify = require('../../tokenSevice/verifyrefreshToken');
const tokenGenrate = require('../../tokenSevice/token');

const logger = require("../../../logger");


async function refreshTokenService(req,res){
    
    try{

        const {refreshtoken} = req.body;

          const verifyStatus = await refreshVerify(refreshtoken);

          if(!verifyStatus) {
            logger.info("Invalid refresh token requested");
            return res.json({"mssg" : "Invalid refresh token"});
              
          }
          else{
             logger.info("New token genrated using refresh token");
             return res.json(tokenGenrate(verifyStatus.id, verifyStatus.username));
              
          }

       }
          catch(err){
           
           logger.error("Error while requesting token");
           res.json({"mssg" : "Error while requesting token"});   
          }
}

module.exports = refreshTokenService;