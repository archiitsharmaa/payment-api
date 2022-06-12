//importing User model
const Users = require('../../../models/User');

//importing bcrypt for hashing password
const bcrypt = require('bcrypt');

//importing logger module
const logger = require("../../../logger");

//method to register new user
async function registerUserService(req,res){
    

    try {

        //fetching new user and password from request body
        const user = new Users({
            username: req.body.username,
            password: req.body.password
        });
    
        //hashing plane text into bcrypt to store in database
        user.password = await bcrypt.hash(user.password,10);
        
        //save user into database
        const savedUser = await user.save();
        res.json({"message" : "User added"});
        logger.info("User Added with username : " + user.username);
    }
    catch(err) {
        //error handling part
        logger.error("Error while adding user ");
        res.json({ "message": "Error while adding user "});
    }  

}

module.exports = registerUserService;