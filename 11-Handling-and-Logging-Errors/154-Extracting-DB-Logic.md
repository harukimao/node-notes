## Extracting DB Logic

- db.js
```js
const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function(){
    mongoose.connect('mongodb://localhost/vidly')
        .then(()=>winston.info('Connectd to MongoDB..'));
}
```

- index.js
```js
require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
Joi.objectId=require('joi-objectid')(Joi);
const Joi = require('joi');
const express=require('express');
const app=express();

require('./startup/routes')(app);
require('./startup/db')();


winston.handleExceptions(new winston.transports.File({ filename: 'uncaughtExceptions.log'}));
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

const p = Promise.reject(new Error('Sth failed'));
p.then(() => console.log('Done'));

const port=process.env.PORT || 3000;
```