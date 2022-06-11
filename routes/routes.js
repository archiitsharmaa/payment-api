const express = require('express')
const router = express.Router();
const verify = require('../services/tokenSevice/verifyToken');

const { db } = require('../models/Payments');
const { json } = require('express/lib/response');

const loginService = require('../services/routeService/loginRoutes/login');
const refreshTokenService = require('../services/routeService/loginRoutes/refreshToken');
const registerUserService = require('../services/routeService/loginRoutes/registerUser');

const paymentDataService = require('../services/routeService/paymentRoutes/paymentData');
const paymentDetailsService = require('../services/routeService/paymentRoutes/paymentDetails');
const paymentMetaDataService = require('../services/routeService/paymentRoutes/paymentMetaData')

class Payment{

    constructor() {
        this.paymentData();
        this.paymentDetails();
        this.paymentMetaData();
        this.loginUser();
        this.refreshToken();
        this.newToken();
    }

    paymentData(){

        router.post('/payments',verify, async (req, res) => {
          return await paymentDataService(req,res);
            
        })       
    }

    paymentDetails() {

        router.post('/payments/paymentDetails',verify, async (req, res) => {
            return await paymentDetailsService(req, res);
        })  
    }

    paymentMetaData() {

        router.post('/payments/meta-data', verify, async (req, res) => {
           return await paymentMetaDataService(res);
       })

    }

   loginUser() {

        router.post('/login', async (req, res) => {
            return await loginService(req, res); 
        })
    }

    refreshToken() {

        router.post('/login/refresh-token', async (req, res) => {
           return await refreshTokenService(req, res);
    });

    }

    newToken() {
        router.post('/login/new', async (req, res) => {
            return await registerUserService(req, res);

    })

}
}


new Payment();

module.exports = router;