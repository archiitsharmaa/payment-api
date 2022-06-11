const req = require('express/lib/request');
const jwt = require('jsonwebtoken');
const { Container } = require('winston');
const REFRESH_SECRET = 'dbfryyrtysdjfnsd djs foitrydsfsdj osdfryrsdj fpdsf';

function refreshAuth(refreshtoken) {


    if(!refreshtoken)
    return res.status(401).send('Acess Denied');

        const verified = jwt.verify(refreshtoken, REFRESH_SECRET);
        return verified;

}

module.exports = refreshAuth;