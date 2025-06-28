## Extracting Config Logic

- config.js
```js
const config = require('config');

module.exports = function() {
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivatKey is not defined.');
    }
}
```

- index.js
```js
Joi.objectId=require('joi-objectid')(Joi);
const Joi = require('joi');
const express=require('express');
const app=express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();

const p = Promise.reject(new Error('Sth failed'));
p.then(() => console.log('Done'));

const port=process.env.PORT || 3000;
```