//importing jwt to use jwt features
const jwt = require('jsonwebtoken');

//importing config file modules to call value from config file
var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

//importing dynamic values from config file
const REFRESH_SECRET = properties.get("REFRESH_SECRET");
const JWT_SECRET = properties.get("JWT_SECRET");

//function to genrate jwt token and refresh token
function tokenGenrate(id, username){

//genrating jwt token    
const token = jwt.sign({
    id: id,
    username: username
},JWT_SECRET,{expiresIn:'900s'});

//genrating refresh token
const refreshtoken = jwt.sign({
    id: id,
    username: username
},REFRESH_SECRET,{expiresIn:'5d'});

return {token, refreshtoken};

}

module.exports = tokenGenrate;