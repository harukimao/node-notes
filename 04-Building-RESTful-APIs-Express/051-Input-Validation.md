## Input Validation

- npm i joi, joi for Input validation

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

    const schema = Joi.object({
    name: Joi.string().min(3).required()
    });

    const result = schema.validate(req.body);  

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

app.get('/api/courses/:id', (req, res) => {
    let course = course.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('The course with the given ID was not found');
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```