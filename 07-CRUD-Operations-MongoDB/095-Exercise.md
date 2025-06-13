## Query Exercise

- To import json file into a new database run this command
- mongoimport --db (name of database) mongo-exercises --collection courses --file exercise-data.json --jsonArray
- The above command is for the folder Mosh placed the stuff in
- New database with 7 documents will be uploaded

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
    .find({isPublished: true, tags: 'backend'})
    .sort({ name: 1})
    .select({'name author'});
}

async function run(){
    const courses = await getCourses();
    console.log(courses);
} 

run();
```
#### Tip:

###### Line 1:

const courseSchema = new mongoose.Schema({ ... });

This just defines the structure (blueprint) — but it doesn’t talk to the database yet.

###### Line 2:

const Course = mongoose.model('Course', courseSchema);

This tells Mongoose:

- ✅ "Create a model named 'Course' using this schema."
- ✅ "Automatically use the MongoDB collection called courses."
- ✅ "Now you can start saving/finding documents."

###### Line 3

await user(class basically).save();

What it does:
Inserts a new document (row) into the MongoDB collection (like a row in an SQL table).

If the collection doesn’t exist yet, MongoDB will automatically create it.

### Summary
const Course = mongoose.model('Course', schema); // defines model for 'courses' collection
const course = new Course({ name: 'AI' });       // creates document in memory
await course.save();                             // 🔥 creates collection (if needed) + inserts the row
