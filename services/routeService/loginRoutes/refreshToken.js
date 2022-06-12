//importing refreshverification services
const refreshVerify = require('../../tokenSevice/verifyrefreshToken');

//importing token genration
const tokenGenrate = require('../../tokenSevice/token');

//importing logger function
const logger = require("../../../logger");

//method to genrate jwt token and refresh token based on last refresh token
async function refreshTokenService(req,res){
    
    try{

      //fetching refreshtoken from request body
        const {refreshtoken} = req.body;

        //verifying validaity of refresh token
          const verifyStatus = await refreshVerify(refreshtoken);

          //exit block if refresh token passed is invalid
          if(!verifyStatus) {
            logger.info("Invalid refresh token requested");
            return res.json({"mssg" : "Invalid refresh token"});
              
          }
          //genrating new jwt token and refresh token
          else{
             logger.info("New token genrated using refresh token");
             return res.json(tokenGenrate(verifyStatus.id, verifyStatus.username));
              
          }

       }
          catch(err){
           
           logger.error("Error while requesting token");
           //error handling
           res.json({"mssg" : "Error while requesting token"});   
          }
}

module.exports = refreshTokenService;