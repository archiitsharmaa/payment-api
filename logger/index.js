const paymentApiLogger = require('./paymentApiLogger');


let logger = null;


if(process.env.NODE_ENV !== "production") {
    logger = paymentApiLogger();
}

module.exports = logger;