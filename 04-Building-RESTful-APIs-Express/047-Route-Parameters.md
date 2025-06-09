## Route Parameters

```js
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send([1, 2, 3]);
});

// This is how you send route params
app.get('/api/posts/:id/:year/:month', (req, res) => {
    res.send(req.params);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```

- To sort using query string parameters
- localhost:3000/api/posts/2018/1?sortBy=name
- To read query parameters
- Change res.send(req.params); to res.send(req.query)