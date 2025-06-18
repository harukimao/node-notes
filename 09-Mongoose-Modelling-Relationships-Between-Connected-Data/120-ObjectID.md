## Object ID

- Auto Assigned ID in MongoDB 12 bytes
- First 4 bytes show timestamp
- Next 3 bytes show machine identifier
- Next 2 bytes show process identifier
- Last 3 Bytes show counter
- 1 byte = 8 bits
- Driver generates an (almost) unqiue identifier (id)

###### To generate own id

```js
const  mongoose = require('mongoose');

const id = new mongoose.Types.ObjectId();
console.log(id.getTimestamp());

const isValid = mongoose.Types.ObjectId.isValid('1234');
console.log(isValid);
```