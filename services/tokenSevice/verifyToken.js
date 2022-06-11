const jwt = require('jsonwebtoken');
const logger = require("../../logger");

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

const JWT_SECRET = properties.get("JWT_SECRET");


function auth(req,res,next) {

    const token = req.header('auth-token');

    if(!token)
    return res.status(401).send('Acess Denied');

    try{
        const verified = jwt.verify(token, JWT_SECRET);
        req.user = verified;
        next();
    }
    catch(err){
        logger.info("Request with Invalid Token");
        res.status(400).send('Invalid Token');
    }

}



module.exports = auth;