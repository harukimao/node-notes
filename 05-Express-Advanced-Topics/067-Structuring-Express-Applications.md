## Structuring Express Applications

- For every API Endpoint have a seperate module
- All routes working with courses would be in courses.js and all routes working with authors should be in authors.js
- All the routes are cleared once in their own files / is left and arguments (if any)

routes -> courses.js

```js
const express = require('express');
const router = express.Router();
// In course module you work with router object rather than app object

const courses = [ 
    { id: 1, name: "course-1"},
    { id: 2, name: "course-2"},
    { id: 3, name: "course-3"}
];


// Now we can exclude /api/courses and shorten it to /
router.get('/', (req, res) => {
    res.send(courses);
}); 

router.post('/', (req ,res) => {

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

router.put('/:id', (req, res) => {
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

router.delete('/:id', (req, res) => {
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

router.get('/:id', (req, res) => {
    let course = courses.find(c => c.id === parseInt(req.params.id));
    if(!course)
        return res.status(404).send('The course with the given ID was not found');
    res.send(course); // send course if found
});

function validateCourse(course){
    const schema = Joi.object({
    name: Joi.string().min(3).required()
    });
    
    return schema.validate(course);  
}

module.exports = router;
```

routes -> home.js

```js
const express = require('express');
const router = express.Router();
// In home module you work with router object rather than app object

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message : 'Hello'})
});

module.exports = router;
```

- You export the modules
- index.js in the main directory becomes like below
- All the included things packed in new folders are given new links


```js
const Joi = require('joi');
const courses = require('./routes/courses');
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const home = require('./routes/home');
const app = express();
const logger = require('./middleware/logger');

app.set('view engine', 'pug');
app.set('views', './views'); // default

app.use(express.json());
app.use(express.urlencoded( { extended : true } ));
app.use(express.static('public')); 
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

// Configuration
console.log("application name: " + config.get('name'));
console.log("mail server: " + config.get('mail.host'));
console.log("password: " + config.get('mail.password'));

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

- Middleware in a seperate folder too like hits
- Middleware -> logger.js

```js
// Put all middleware in this folder
function log (req, res, next){
    console.log('Logging...');
    next();
}

module.exports = log;
```