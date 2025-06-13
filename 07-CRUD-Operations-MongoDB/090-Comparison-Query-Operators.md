## Comparison Query Operators
- eq
- ne
- gt
- gte
- lt
- lte
- in
- nin

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

const courseSchema = new mongoose.Schema({
    name: String,
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean
});

// If you change any attributes in this and rerun
// the program another object
// will be added in the table 
async function createCourse(){
const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });
    
    // Returns the actual course object in DB
    const result = await course.save();
    console.log('Result', result);
}

async function getCourses(){
    // Finding Queries in MongoDB
    const courses = await Course
    //.find( { price: { $gte : 10, $lte: 20 } } )
    .find({price: { $in: [10, 15, 20] }})
    .limit(10)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(courses);
}


getCourses();
```