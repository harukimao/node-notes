## Protecting Routes

- genres.js
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

// pass auth a middleware function to be executed b4 the other middleware (callback) function
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