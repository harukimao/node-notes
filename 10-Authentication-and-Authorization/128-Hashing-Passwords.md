## Hashing Passwords
- users.js
```js

const _ = require('lodash');
const {User, Validate} = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');
 
    user = new User(_.pick(req.body,['name','email','password'] ));
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash('user.password', salt);

    await user.save();
     
    //returns a new object with only the relevant properties
    res.send( _.pick(user,  ['id', 'name', 'email'])); 
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
```
