const express = require('express');
const router = express.Router();
// In home module you work with router object rather than app object

router.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message : 'Hello'})
});

module.exports = router;