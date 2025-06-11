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