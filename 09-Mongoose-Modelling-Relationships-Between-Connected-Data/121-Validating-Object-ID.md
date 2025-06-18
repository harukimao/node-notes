## Validating Object ID

- Handling wrong ID format

```js
const Joi = require('joi');
Joi.objectid = require('joi-objectid')(Joi);
const mongoose = require('mongoose');

if (!mongoose.Types.ObjectId.isValid(req.body.customerId))
    return res.status(400).send('Invalid Customer'); 

function validateRental(rental){
    const schema = {
        customerId: Joi.objectId().required(),
        movieId: Joi.objectId().required()
    }

    return Joi.validate(rental, schema);
}
```