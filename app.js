const express = require('express');
const req = require('express/lib/request');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors')



const app = express();

//cors issue
app.use(cors())

//middleware for parsing json data and should be above
//rest of middleware
app.use(bodyParser.json());




//middlewares -> always executes when calling a fucntion
//basically a middle man while calling routes
//used in auths 


//midleware for setting routes
const loginRoute = require('./routes/login');

app.use('/login', loginRoute);

//

const paymentDataRoute = require('./routes/payments');
app.use('/payments', paymentDataRoute );







//routes
 


//coonect to DB
mongoose.connect('mongodb://localhost:27017/payment-api', () =>
console.log('connected to database..f'));



//listen on a port
app.listen(3000);

