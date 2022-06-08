const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${level}] : ${message}`;
});

const paymentApiLogger = () => {
    return createLogger({
        level: 'info',
        format: combine(
          timestamp({format : "HH:mm:ss"}),
          myFormat
        ),
       // defaultMeta: { service: 'user-service' },
        transports: [
          //
          // - Write all logs with importance level of `error` or less to `error.log`
          // - Write all logs with importance level of `info` or less to `combined.log`
          //
          new transports.File({ filename: 'error.log', level: 'error' }),
          new transports.File({ filename: 'combined.log' }),
          new transports.Console(),
        ],
      });

};

module.exports = paymentApiLogger;

