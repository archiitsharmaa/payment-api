const express = require('express')
const router = express.Router();
const Users = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { append } = require('express/lib/response');

const JWT_SECRET = 'dbfsdjfnsd djs foidsfsdj osdfsdj fpdsf';



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
            },JWT_SECRET);

            return res.header('auth-token', token).send(token);
        }
    
        res.json ({status : 'error', error : 'Invalid Username/password'});
    

    }catch(err){
        res.json({message: err});
    }
    


});




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


module.exports = router;