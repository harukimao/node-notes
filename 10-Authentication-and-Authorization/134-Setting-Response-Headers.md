## Setting Response Headers 


- config.js
```js
const config=require('config');

module.exports=function(){

    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}


```

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

router.get('/',async (req,res)=>{
    const users=await User.find();
    res.send(users);
});

router.get('/me',auth,async (req,res)=>{
    const user = await User.findById(req.user._id).select('-password');
    res.send(user)
});

router.post('/',async (req,res)=>{
    const {error}=validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user=await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('User already registered');

    user= new User(_.pick(req.body,['name','email','password','isAdmin']));
    const salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(user.password,salt);
    await user.save();

    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['_id','name','email','isAdmin']));
    
    //res.send(_.pick(user,['_.id','name','email']));
});

module.exports=router;
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

