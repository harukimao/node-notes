## File System Module

```javascript
const fs = require('fs');

// Synchronous
const files = fs.readdirSync('./');
console.log(files);

// Asynchronous
const files2 = fs.readdir('./', function(err, files){
    if (err) console.log('Error', err);
    else console.log('Result', files2);
});
```