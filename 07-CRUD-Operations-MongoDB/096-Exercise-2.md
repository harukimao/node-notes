## Query Exercise 2

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

// Check queries here
async function getCourses(){
    return await Course
    .find({isPublished: true})
    .or([ { tags : 'frontend' }, { tags: 'backend' } ])
    .sort('-price')
    .select({'name author price'});
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
} 

run();
```