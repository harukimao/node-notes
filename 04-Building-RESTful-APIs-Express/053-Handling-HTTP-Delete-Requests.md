## Handling HTTP Delete Requests

1) Look for course
2) Not Existing, return 404
3) Delete
4) Return the same course

```js
const Joi = require('joi');
const express = require('express');
const app = express();

app.use(express.json());

const courses = [ 
    { id: 1, name: "course-1"},
    { id: 2, name: "course-2"},
    { id: 3, name: "course-3"}
 ];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
}); 

app.post('/api/courses', (req ,res) => {

    const result = validateCourse(req.body);
    
    if (result.error) {
    return res.status(400).send(result.error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course); // Return the object in the body of the response to confirm ID added
});

app.put('/api/courses/:id', (req, res) => {
    // Look for course
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('The course with the given ID was not found');

    // Validate, if invalid return 400 - Bad Request 
    const result = validateCourse(req.body);
    
    // Could use { error } instead of result.error
    if (result.error) {
    return res.status(400).send(result.error.details[0].message);
    }

    // Update Course
    course.name = req.body.name;

    // Return Updated Course
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not Existing, return 404
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('The course with the given ID was not found');

    // Delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);
    
    // Return the same course
    res.send(course);
}); 

function validateCourse(course){
    const schema = Joi.object({
    name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);  
}

app.get('/api/courses/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('The course with the given ID was not found');
    res.send(course); // send course if found
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```