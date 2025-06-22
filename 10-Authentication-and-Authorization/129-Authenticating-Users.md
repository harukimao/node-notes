## Authenticating Users

- users.js
```js

const _ = require('lodash');
const {User, Validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('/routes/auth');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');


    //comparison of the passwords for authentication
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('User already registered.');
    res.send(true);
 
   
});

module.exports = router;
```

- index.js
```js
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');

mongoose.connect('mongodb://localhost/vidly')
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json()); 
app.use('/api/users', users);
app.use('/api/auth', auth);
```
