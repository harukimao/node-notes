## Query Exercise 3

- Only check queries, courses returned with price more than 15 or word by in it

```js
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-exercises'); 

const courseSchema = new mongoose.schema({
 name: String,
 author: String,
 tags: [ String ],
 date: Date,
 isPublised: Boolean,
 price: Number
});

const Course = mongoose.model('Course', courseSchema);

async function getCourses(){
    return await Course
    .find({isPublished: true})
    .or([
        { price: { $gte: 15 } },
        { name: /.*by.*/i }
    ])
    .sort('-price')
    .select({'name author price'});
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
} 

run();
```