const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const loginRoute = require('./routes/loginRoute');
const paymentDataRoute = require('./routes/paymentsRoute');


class Server {

    constructor() {
        this.initDB();
        this.initExpressMiddleware();
        this.initRoutes();
        this.start();
    }

    start() {
        //listen on a port
        app.listen(3000);
    }

    initExpressMiddleware() {
        //cors issue
        app.use(cors())
        app.use(bodyParser.json());
    }

    initRoutes() {
        app.use('/login', loginRoute);
        app.use('/payments', paymentDataRoute );

    }

    initDB() {
        //coonect to DB
        mongoose.connect('mongodb://localhost:27017/payment-api',{ ignoreUndefined: true }, () =>
        console.log('connected to database..'));
        const logger = require("./logger");

        logger.info("this is the place where");
    }


}

new Server();















