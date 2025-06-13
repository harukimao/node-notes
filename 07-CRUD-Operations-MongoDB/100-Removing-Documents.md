## Removing Documents

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
    const pageNumber = 2;
    const pageSize = 10;
    const courses = await Course.find( { author: 'Mosh', isPublished: true } )
    .skip((pageNumber-1)* pageSize)
    .limit(pageSize)
    .sort({name: 1})
    .select({name: 1, tags: 1});
    console.log(courses);
}

async function updateCourse(id){

    const result = await Course.update({ _id: id}, {
        $set: {
            author: 'Mosh',
            isPublished: false
        }
    });

    console.log(result);
}

async function removeCourse(id){
    // const result =  await Course.deleteOne({ _id: id}); // Could use delete many
    const course =  await Course.findByIdAndRemove(id);
    console.log(course);
}

removeCourses('any valid course id');
```