## Create a file (module) logger.js

- Logger.js

```javascript
let url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

module.exports.log = log;

// module.exports = log; // This allow you to use log() directly in the file you load this module in.

// module.exports.endPoint = url; // Better to keep private
```
