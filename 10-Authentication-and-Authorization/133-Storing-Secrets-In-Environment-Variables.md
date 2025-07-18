## Storing Secrets In Environment Variables

- default.json

```JSON
{
    "jwtPrivateKey": "vidly_jwtPrivatekey"
}
```

// get the spellings correct of this file

- custom-environment-variables.json
```JSON
{
    "jwtPrivateKey": "JWT_PRIVATE_KEY"
}
```

- users.js
```js
const config = require('config');
const jwt = require('jsonwebtoken');
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
    
    // Generation of a JSON web Token

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);
});

module.exports = router;
```

- index.js
```js
const config = require('config');

const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const users = require('./routes/users');

if(!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);

}

mongoose.connect('mongodb://localhost/vidly')
 .then(() => console.log('Connected to MongoDB...'))
 .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json()); 
app.use('/api/users', users);
app.use('/api/auth', auth);
```