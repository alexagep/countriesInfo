const winston = require("winston");
const path = require("path");


var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var newdate = year + "-" + month + "-" + day;
    
const options = {
    File: {
        level: "info",
        filename: path.join(__dirname, '..', 'logs', `${newdate}.log`),
        handleExceptions: true,
        format:  winston.format.combine( 
            winston.format.json(), 
            winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), 
            winston.format.prettyPrint() 
        ),
        maxsize: 5000000, //5MB
    },
    console: {
        level: "debug",
        handleExceptions: true,
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.simple(),
        ),
    },
};

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File(options.File),
        new winston.transports.Console(options.console),
    ],
    exitOnError: false,
});


/* By default, morgan outputs to the console only, 
so let’s define a stream function that will be able to get 
morgan-generated output into the winston log files. 
We will use the info level so the output will be picked up by both transports (file and console):*/
// logger.stream = {
//     write: function (message) {
//         logger.info(message);
//     },
// };

module.exports = logger;