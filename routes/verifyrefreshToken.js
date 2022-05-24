const jwt = require('jsonwebtoken');
const REFRESH_SECRET = 'dbfryyrtysdjfnsd djs foitrydsfsdj osdfryrsdj fpdsf';
async function refreshAuth(refreshtoken) {
    try{
        const verified = jwt.verify(refreshtoken, REFRESH_SECRET);
        
        if(!verified)
        return "Invlid values"
        else
        return verified
    }
    catch(err){
        return "Error in refresh token"
    }

}

module.exports = refreshAuth;