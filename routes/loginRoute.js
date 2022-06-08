const express = require('express')
const router = express.Router();
const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const refreshVerify = require('../services/verifyrefreshToken');
const tokenGenrate = require('../services/token');
const { append } = require('express/lib/response');
const { required } = require('nodemon/lib/config');

const JWT_SECRET = 'dbfsdjfnsd djs foidsfsdj osdfsdj fpdsf';
const REFRESH_SECRET = 'dbfryyrtysdjfnsd djs foitrydsfsdj osdfryrsdj fpdsf';


class Login {

    constructor() {
        this.initloginUser();
        this.refreshToken();
        this.newToken();
    }

    initloginUser() {

        router.post('/', async (req, res) => {
   
            try{
                const {username, password} = req.body;
        
                const user = await Users.findOne({username:username}).lean();
        
                if(!user) {
                    return res.json ({status : 'error', error : 'Invalid Username/password'});
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
        
        
                    return res.header('auth-token', token).send({token, refreshtoken});
                }
            
                res.json ({status : 'error', error : 'Invalid Username/password'});
            
        
            }catch(err){
                res.json({message: err});
            }
        }
        )

    }

    refreshToken() {

        router.post('/refresh-token', async (req, res) => {
            try{
             const {refreshtoken} = req.body;
    
               if(!refreshtoken) throw createError.BadRequest();
               const verified = await refreshVerify(refreshtoken);
               if(!verified) {
                   res.json({"mssg" : "Invalid refresh token"});
                   return;
               }
               else{
                  const a = tokenGenrate(verified.id, verified.username);
                   res.json(tokenGenrate(verified.id, verified.username));
                   return;
               }
    
            }
               catch(err){
                res.json({"mssg" : "Invalid refresh token"});   
               }

    
    });

    }

    newToken() {
        router.post('/new', async (req, res) => {
   
            const user = new Users({
                username: req.body.username,
                password: req.body.password
            });
        
            user.password = await bcrypt.hash(user.password,10);
        
            try {
                const savedUser = await user.save();
                res.json(savedUser);
            }
            catch(err) {
                res.json({ message: err});
            }  
        
        })

    }


}

new Login();

module.exports = router;