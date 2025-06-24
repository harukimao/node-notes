## Express Error Middleware

```js
const auth=require('../middleware/auth');
const admin=require('../middleware/admin');
const{Genre,validateGenres}=require('../models/genre');
const mongoose=require('mongoose');
const express=require('express');

const router=express.Router();

router.get('/',async (req,res,next)=>{

    // catching rejected promises
    
    try {
        const genres=await Genre.find();
        res.send(genres);
    }
    catch (ex){
        // log the exception
        next(ex);

    }    
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

- index.js

```js
const error = require('./middleware/error');
const Joi = require('joi');
Joi.objectId=require('joi-objectid')(Joi);
const mongoose=require('mongoose');
const customers=require('./routes/customers');
const genres=require('./routes/genres');
const movies=require('./routes/movies');
const rentals = require('./routes/rentals');
const home=require('./routes/home');
const express=require('express');
const app=express();

mongoose.connect('mongodb://localhost/vidly')
.then(()=>console.log('Connectd to MongoDB..'))
.catch(()=>console.log('Failed to connect with database'));


app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals', rentals);
app.use('/',home);
//middleware function to log errors
//not calling but referencing
app.use(error);

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server is listening on port: ${port}`));
```
- error.js

```js

module.exports=function(err, req, res, next){
    res.status(500).send('Something failed');
}
```