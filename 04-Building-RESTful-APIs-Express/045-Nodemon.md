## Nodemon

- This restarts your application for your process due to changes, this way you dont have to shut down app and restart via node index.js

- Run with nodemon index.js
```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

app.listen(3000, () => console.log('Listening on port 3000...'));
```