## Configuration

- How to store configurations settings for your app and overwrite them in each environment
- npm rc, npm config used for managing configurations
- Config folder --> default.json
- development.json will override the default.json settings when running it development mode and likewise
- Store passwords in environment variables rather than config files
- Define environment variable with set app_password = 1234 this is on CLI
- Read using config
- Config folder --> customer-environment-variables.json mapping our config settings to environment variables

```js
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./logger'); 
const express = require('express');
const app = express();

// Configuration
console.log("application name: " + config.get('name'));
console.log("mail server: " + config.get('mail.host'));
console.log("password: " + config.get('mail.password'));

console.log(process.env.NODE_ENV); 
app.get('env'); 

app.use(express.json());
app.use(express.urlencoded( { extended : true } ));
app.use(express.static('public')); 
app.use(helmet());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan Enabled');
}

app.use(morgan('tiny'));
app.use(logger);

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
#### What Are Environment Variables?

###### Environment variables are dynamic values that affect how running processes behave on a computer. They are part of the operating system's environment in which a process runs and can be accessed by programs to configure their behavior.

#### Where Are They Stored?
###### On your PC/Server: They are stored in memory (RAM) when the system or a process starts.

###### Persistent Storage: They can also be saved in configuration files (like .env, bashrc, zshrc, or system settings) and loaded into memory when needed.

###### Key Characteristics of Environment Variables

#### Scope:

###### System-wide: Available to all processes (e.g., PATH, HOME in Linux/macOS).

###### User-specific: Defined in shell profiles (e.g., .bashrc, .zshrc).

###### Process-specific: Only available to a single app (e.g., in a .env file for Node.js).

#### Temporary vs. Permanent:

###### Temporary: Exist only in the current shell session (e.g., export API_KEY=123).

###### Permanent: Saved in config files and loaded on system/login.

#### Security:
###### Used to store sensitive data (like API keys, database passwords) instead of hardcoding them in files.