const Users = require('../../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const logger = require("../../../logger");

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');

const REFRESH_SECRET = properties.get("REFRESH_SECRET");;
const JWT_SECRET = properties.get("JWT_SECRET");

async function loginService(req,res){

    const {username, password} = req.body;
        
    try{

        const user = await Users.findOne({username:username}).lean();

        if(!user) {
            logger.info("Login attempt using Invalid Username/password");
            return res.json ({"message" : 'Invalid Username/password'});
        }

        if(await bcrypt.compare(password, user.password)){
            //success match of password

            const token = jwt.sign({
                id: user._id,
                username: user.username
            },JWT_SECRET,{expiresIn:'900s'});


            const refreshtoken = jwt.sign({
                id: user._id,
                username: user.username
            },REFRESH_SECRET,{expiresIn:'5d'});

            logger.info("Login attempt successful for user : " + username);

            return res.header('auth-token', token).send({token, refreshtoken});
        }

        logger.info("Login attempt using Invalid Username/password");

        res.json ({"message": 'Invalid Username/password'});


    }catch(err){
        logger.error("Error in Login attempt");
        res.json({"message": "Error in login attempts"});

    }
}

module.exports = loginService;