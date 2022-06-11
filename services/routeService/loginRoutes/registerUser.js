const Users = require('../../../models/User');
const bcrypt = require('bcrypt');

const logger = require("../../../logger");

async function registerUserService(req,res){
    

    try {
        const user = new Users({
            username: req.body.username,
            password: req.body.password
        });
    
        user.password = await bcrypt.hash(user.password,10);
        const savedUser = await user.save();
        res.json(savedUser);
        logger.info("User Added with username : " + user.username);
    }
    catch(err) {
        logger.error("Error while adding user ");
        res.json({ "message": "Error while adding user "});
    }  

}

module.exports = registerUserService;