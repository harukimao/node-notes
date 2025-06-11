## Templating Engines

- Pug
- Mustache
- EJS

- Each has different syntax for generating dynamic HTML and returning it to the client

- This is a way to return html markup to the client with view engine. Basically you display html at your frontend with an easier html syntax

- Check -> views -> index.pug

```js
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());
app.set('view engine', 'pug');
app.set('views', './views'); // default

// Here is the code for it to be included in the main api
app.get('/', (req, res) => {
    res.render('index', { title: 'My Express App', message : 'Hello'})
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```