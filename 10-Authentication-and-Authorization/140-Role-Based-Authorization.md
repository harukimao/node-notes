## Role Based Authorization

- /models/users.js
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
    // isAdmin Property added, and its functionality in this function
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


- /middleware/admin.js
```js
module.exports = function(req,res,next){
    //401 : unauthorized
    //403 : Forbidden

    if (!req.user.isAdmin) return res.status(403).send('Access Denied.');
    next();
}
```

- genres.js (change made in delete)
```js
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

// First middleware function auth, second admin, third callback
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