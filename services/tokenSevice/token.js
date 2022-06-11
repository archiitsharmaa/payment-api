const jwt = require('jsonwebtoken');

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

const REFRESH_SECRET = properties.get("REFRESH_SECRET");;
const JWT_SECRET = properties.get("JWT_SECRET");


function tokenGenrate(id, username){
    
const token = jwt.sign({
    id: id,
    username: username
},JWT_SECRET,{expiresIn:'900s'});


const refreshtoken = jwt.sign({
    id: id,
    username: username
},REFRESH_SECRET,{expiresIn:'5d'});

return {token, refreshtoken};

}

module.exports = tokenGenrate;