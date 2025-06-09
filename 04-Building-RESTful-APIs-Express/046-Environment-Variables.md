## Environment Variables

- const port = process.env.PORT || 3000 auto assigns a port no if your machine has an environment variable called port otherwise sets 3000 as default port which is arbitrary number of your dev machine
- set PORT = 5000 now we have an environment variable called port = 5000

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```