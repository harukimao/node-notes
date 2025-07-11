## Logging Errors

- npm install winston

- error.js
```js
const winston = require('winston');

module.exports = function(err, req, res, next){
    winston.log(err.message, err);

    // error
    // warn
    // info
    // verbose
    // debug
    // silly

    res.status(500).send('Something failed');
}
```


- index.js
```js
require('express-async-errors');
const winston = require('winston');
const error = require('./middleware/error');
Joi.objectId=require('joi-objectid')(Joi);
const Joi = require('joi');
const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genres');
const movies=require('./routes/movies');
const rentals = require('./routes/rentals');
const home=require('./routes/home');
const express=require('express');
const app=express();

// Log in a log file
winston.add(winston.transport.file, { filename: 'logfile.log'});

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connectd to MongoDB..'))
.catch(()=>console.log('Failed to connect with database'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);
app.use('/',home);

app.use(error);

const port=process.env.PORT || 3000;
```

- genres.js
```js
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const{Genre,validateGenres}=require('../models/genre');
const mongoose=require('mongoose');
const express=require('express');

const router=express.Router();


router.get('/', async (req,res)=>{
        throw new Error('COuld not get genres.');
        const genres=await Genre.find();
        res.send(genres);
});

router.post('/',auth,async (req,res)=>{
const {error}=validateGenres(req.body);
if(error) return res.status(400).send(error.details[0].message);

const genre= new Genre( {
    name:req.body.name
})
await genre.save();
res.send(genre);

});
```