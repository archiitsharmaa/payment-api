const req = require('express/lib/request');
//importing jwt to use jwt features
const jwt = require('jsonwebtoken');
const { Container } = require('winston');

//importing config file modules to call value from config file
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

//feching dynamic values from properties file
const REFRESH_SECRET = properties.get("REFRESH_SECRET");

function refreshAuth(refreshtoken) {

    //if refresh token is bad
    if(!refreshtoken)
    return res.status(401).send('Acess Denied');

        const verified = jwt.verify(refreshtoken, REFRESH_SECRET);
        return verified;

}

module.exports = refreshAuth;