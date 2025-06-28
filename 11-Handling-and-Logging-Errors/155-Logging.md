## Logging

- logging.js
```js
const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    winston.handleExceptions(
        new winston.transports.Console({colorize: true, PrettyPrint: true}),new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
    // This way winston can catch exception thrown in unhandled rejection and log it in the file
   

    // Strict spellings
    process.on('unhandledRejection', (ex) => {
        throw ex
    });


    // Log in a log file
    winston.add(winston.transport.file, { filename: 'logfile.log'});
    winston.add(winston.transports.MongoDB, { db: 'mongodb://localhost/vidly', 
    level: 'error'
    });
}
```

- index.js
```js
Joi.objectId=require('joi-objectid')(Joi);
const Joi = require('joi');
const express=require('express');
const app=express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

if (!config.get('jwtPrivateKey')) {
    console.error('FATAL ERROR: jwtPrivatKey is not defined.');
    process.exit(1);
}

const p = Promise.reject(new Error('Sth failed'));
p.then(() => console.log('Done'));

const port=process.env.PORT || 3000;
```