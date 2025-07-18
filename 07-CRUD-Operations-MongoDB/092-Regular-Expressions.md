## Regular Expressions

- /text/ ^ before represents that it starts with that text
- /Hamedani$/i here $ means that it ends with this string and i means that its case *insensitive*
- Contains Mosh.find({author: /.*Mosh.*/})

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

async function createCourse(){
const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Node.js Course',
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true
    });
    const result = await course.save();
    console.log('Result', result);
}

async function getCourses(){
    const courses = await Course
    //.find( { author: 'Mosh', isPublished: true } )
    // To find that it starts with Mosh
    .find({author: /^Mosh/ })
    // End with Hamedani
    .find({author: /Hamedani$/i})
    // Contains Mosh
    .find({author: /.*Mosh.*/})
    .limit(10)
    .sort({name: 1})
    //.select({name: 1, tags: 1});
    // If you count like this
    .count()
    // It returns the count of objects that meet this criteria, use it instead of select when trying to display count instead of objects
    console.log(courses);
}

getCourses();
```