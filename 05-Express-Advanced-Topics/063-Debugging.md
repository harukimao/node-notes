## Debugging

- Using debug module with environment variable to enable or disable debugging so no code commenting after debugging is done
- Set an env variable to decide what kind of info to see on the console
- set DEBUG=app:startup to see only the  debugging messsages which are part of this namespace
- set to DEBUG=     to not see any debugging messages
- To see all debugging messages set DEBUG=app:*
- This will show app:db and app:startup since those are the two we used

```js
const startupDebugger = require('debug')('app:startup')
const dbDebugger = require('debug')('app:db');
const morgan = require('morgan');
const express = require('express');
const app = express();

app.use(express.json());

if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    startupDebugger('Morgan Enabled');
}

// Db work....

dbDebugger('Connected to the database...');

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
```