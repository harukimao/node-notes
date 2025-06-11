const Joi = require('joi');
const courses = require('./routes/courses');
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const home = require('./routes/home');
const app = express();
const logger = require('./middleware/logger');

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded( { extended : true } ));
app.use(express.static('public')); 
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log("application name: " + config.get('name'));
console.log("mail server: " + config.get('mail.host'));
console.log("password: " + config.get('mail.password'));

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));