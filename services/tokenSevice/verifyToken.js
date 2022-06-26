//importing jwt to use jwt features
const jwt = require('jsonwebtoken');

//importing roleAuthentication
const roleAuthentication = require("./roleAuthentication");

//importing logger module
const logger = require("../../logger");

//importing config file modules to call value from config file
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

//importing dynamic values from config file
const JWT_SECRET = properties.get("JWT_SECRET");

//method to verify jwt token
async function auth(req,res,next) {

    //fetching token from request header
    const token = req.header('auth-token');

    //if empty token send exit block
    if(!token)
    return res.status(401).send('Acess Denied');

    try{
    
        //verifying jwt token
        const verified = jwt.verify(token, JWT_SECRET);

        //checking for role acess in acessing user paths
        if(await roleAuthentication(verified, req.url) === 'Acess Denied'){
            return res.status(401).send('Acess Denied');
        }

        req.user = verified;
        next();
    }
    catch(err){
        //error handling
        logger.info("Request with Invalid Token");
        res.status(400).send('Invalid Token');
    }

}



module.exports = auth;