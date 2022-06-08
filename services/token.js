const jwt = require('jsonwebtoken');

const JWT_SECRET = 'dbfsdjfnsd djs foidsfsdj osdfsdj fpdsf';
const REFRESH_SECRET = 'dbfryyrtysdjfnsd djs foitrydsfsdj osdfryrsdj fpdsf';


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