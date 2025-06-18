## Using an Array of Sub-Documents


```js
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String
});

const Author = mongoose.model('Author', authorSchema);

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: [authorSchema]
}));

async function createCourse(name, authors) {
  const course = new Course({
    name, 
    authors
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course.find();
  console.log(courses);
}

async function updateAuthor(courseId){
    const course = await Course.findById({ _id: courseId, $set: {
        'author.name': 'John Space'
    }
    });
}

// Adding an Array of Documents thru Functions
updateAuthor('5a70c9082748234ahdawdwau8da');

async function addAuthor(courseId, author){
    const course = await Course.findById(courseId);
    course.authors.push(author);
    course.save();
}

addAuthor('500de5da31j12k2j1g51adaw', new Author ({
    name: 'Amy'
}));

async function removeAuthor(courseId, author){
    const course = await Course.findById(courseId);
    const author = course.authors.id( authorId );
    author.remove();
    course.save();
}

// first id course second id from author
removeAuthor('500de5da31j12k2j1g51adaw', '5a70c67dwah21wai2761');

// // Adding an Array of Documents
// createCourse('Node Course', [
// new Author({ name: 'Mosh' }),
// new Author({ name: 'John' })
// ]);
```