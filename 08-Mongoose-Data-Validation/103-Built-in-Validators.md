## Built in Validators

```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
.then(()=> console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB...', err));

// Error if price not entered when course is published
const courseSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true,
         minlength: 5,
         maxlength: 255,
        },
    category: {
        type: String,
        required: true,
        enum ['web', 'mobile', 'network']
    }
    author: String,
    tags: [String],
    date: { type: Date, default: Date.now},
    isPublished: Boolean,
    price: {
        type: Number,
        required: function() { return this.isPublished },
        min: 10,
        max: 200
    }
});

async function createCourse(){
const Course = mongoose.model('Course', courseSchema);
    const course = new Course({
        name: 'Angular Course',
        category: '-', // Checking for category error
        author: 'Mosh',
        tags: ['node', 'backend'],
        isPublished: true,
        price: 15
    });
    
    try{
    
    // To get bool
    course.validate((err)=>{
        if(err) { }
    });
    const result = await course.save();
    console.log('Result', result);
    }
    catch (ex) {
        console.log(ex.message);
    }
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

createCourses('any valid course id');
```