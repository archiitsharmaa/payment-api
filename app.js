const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const routes = require('./routes/routes');
const logger = require("./logger");

var PropertiesReader = require('properties-reader');
var properties = PropertiesReader('config/app.properties');


class Server {

    constructor() {
        this.initDB();
        this.initExpressMiddleware();
        this.initRoutes();
        this.start();
    }

    start() {

        try{
        //listen on a port
        app.listen(properties.get("severPort"));
        logger.info('Server listening at the port ' + properties.get("severPort"));
        }
        catch(err){
            logger.error('Error listening at the port ' + properties.get("severPort"));
        }
    }

    initExpressMiddleware() {
        //cors issue
        app.use(cors())
        app.use(bodyParser.json());
    }

    initRoutes() {
        app.use('/', routes);

    }

    initDB() {
        
        try{
        //coonect to DB
        mongoose.connect('mongodb://localhost:27017/payment-api',{ ignoreUndefined: true }, () =>
        logger.info("Connected to Database"));
        }
        catch(err){
            logger.error('Error While Connecting to database');
        }
    }


}

new Server();
