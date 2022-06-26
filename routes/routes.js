//importing express for link routers
const express = require('express')
const router = express.Router();

//importing verify token service to secure routes using JWT authentication
const verify = require('../services/tokenSevice/verifyToken');

const { db } = require('../models/Payments');
const { json } = require('express/lib/response');

//importing login services for verifying login credentials and genrating refresh and jwt token
const loginService = require('../services/routeService/loginRoutes/login');
//importing refreh token services for genrating  refresh and jwt token using old refresh token
const refreshTokenService = require('../services/routeService/loginRoutes/refreshToken');
//importing register user services for registering new user
const registerUserService = require('../services/routeService/loginRoutes/registerUser');

//importing payment data sevices to fetch payments data based on filters
const paymentDataService = require('../services/routeService/paymentRoutes/paymentData');
//importing payment details data sevices to fetch payments details data based on specific confirmation number
const paymentDetailsService = require('../services/routeService/paymentRoutes/paymentDetails');
//importing payment meta data sevices to fetch payments meta data for fetching dynamic feilds value
const paymentMetaDataService = require('../services/routeService/paymentRoutes/paymentMetaData')
//importing payment meta data sevices to fetch payments meta data for fetching dynamic feilds value
const billerPaymentData = require('../services/routeService/paymentRoutes/billerPaymentData')

//payment class for defining routes
class Payment{

    //constructor to call various routes
    constructor() {
        this.paymentData();
        this.paymentDetails();
        this.paymentMetaData();
        this.paymentbiller();
        this.loginUser();
        this.refreshToken();
        this.newToken();
    }

    //method calling payment data route to fetch payments data based on filters
    paymentData(){

        router.post('/payments',verify, async (req, res) => {
          return await paymentDataService(req,res);
            
        })       
    }

    //method calling payment details data route to fetch payments details data based on specific confirmation number
    paymentDetails() {

        router.post('/payments/paymentDetails',verify, async (req, res) => {
            return await paymentDetailsService(req, res);
        })  
    }

    //method calling payment meta data route to fetch payments meta data for fetching dynamic feilds value
    paymentMetaData() {

        router.post('/payments/meta-data', verify, async (req, res) => {
           return await paymentMetaDataService(res);
       })

    }

    //method calling payment details for details of payment biller
    paymentbiller() {

        router.post('/biller-payments',verify, async (req, res) => {
            return await billerPaymentData(req,res);
        })
        
    }

   //method calling login route for verifying login credentials and genrating refresh and jwt token
   loginUser() {

        router.post('/login', async (req, res) => {
            return await loginService(req, res); 
        })
    }

    //method calling refreh token routes for genrating  refresh and jwt token using old refresh token
    refreshToken() {

        router.post('/login/refresh-token', async (req, res) => {
           return await refreshTokenService(req, res);
    });

    }

    //method calling payment meta data routes to fetch payments meta data for fetching dynamic feilds value
    newToken() {
        router.post('/login/new', async (req, res) => {
            return await registerUserService(req, res);

    })

}
}


new Payment();

module.exports = router;