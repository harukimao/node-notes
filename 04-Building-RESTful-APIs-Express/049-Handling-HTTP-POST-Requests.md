## Handling HTTP POST Requests

- app.use(express.json()); Here express.json() returns middleware and then we make our app use that middleware in the resource processing pipeline

```js
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
        res.status(404).send('The course with the given ID was not found');
    req.send(course);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```