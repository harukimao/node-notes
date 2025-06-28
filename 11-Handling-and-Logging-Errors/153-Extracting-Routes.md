## Extracting Routes

- routes.js
```js
const error = require('./middleware/error');
const express = require('express');
const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genres');
const movies=require('./routes/movies');
const rentals = require('./routes/rentals');
const home=require('./routes/home');

module.exports = function(){

    app.use(express.json());
    app.use('/api/genres',genres);
    app.use('/api/customers',customers);
    app.use('/api/movies',movies);
    app.use('/api/rentals', rentals);
    app.use('/',home);

    app.use(error);

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


mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connectd to MongoDB..'))
.catch(()=>console.log('Failed to connect with database'));

const port=process.env.PORT || 3000;
```