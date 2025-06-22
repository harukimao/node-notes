## Authorization Middleware

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

- users.js model
```js
const Joi=require('joi');
const mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const config=require('config');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024,
    },
    isAdmin:Boolean
});

userSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id, isAdmin:this.isAdmin},config.get('jwtPrivateKey'));
    return token;
}

const User=mongoose.model('User',userSchema);

function validateUser(user){
    const schema={
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin:Joi.boolean().required()

    }
    return Joi.validate(user,schema);
}

exports.User=User;
exports.validate=validateUser;
```

- genres.js
```js

//const asyncMiddleware=require('../middleware/async');
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const{Genre,validateGenres}=require('../models/genre');
const mongoose=require('mongoose');
const express=require('express');
const router=express.Router();

router.get('/',async (req,res,next)=>{
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

router.put('/:id',auth,async (req,res)=>{

    const {error}=validateGenres(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre= await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    })

    if(!genre) return res.status(404).send('genre with the given id is not found');

    res.send(genre);

});

router.delete('/:id',[auth,admin],async (req,res)=>{

    const genre=await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send('genre with the given id is not found');  

    res.send(genre);

});


router.get('/:id',async (req,res)=>{

    const genre= await Genre.findById(req.params.id);

    if(!genre) return res.status(404).send('genre with the given id is not found');

    res.send(genre);
});

module.exports=router;
```

- /middleware/auth.js
```js
const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next){
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('No Loken');

    try {
        const decoded = jwt.verify(token, config.get('jwtPrivateKey')); // Storing with .env changes the second argument here
        req.body = decoded;
        // req.user._id to access id in route handlers
        next();
    }
    catch (ex) {
        res.status(400).send('Invalid token');
     }
}

module.exports = auth
```