const jwt = require('jsonwebtoken');
const JWT_SECRET = 'dbfsdjfnsd djs foidsfsdj osdfsdj fpdsf';

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
        res.status(400).send('Invalid Token');
    }

}

module.exports = auth;