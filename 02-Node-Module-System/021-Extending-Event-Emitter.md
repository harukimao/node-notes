## Extending Event Emitter

- app.js

```javascript
const EventEmitter = require('events');
const Logger = require('./logger');
const logger = new Logger();

// Register a Listener
logger.on('messageLogged', function(arg){
    console.log("Listener Called", arg);
});

logger.log('message');
```

- logger.js

```javascript
const EventEmitter = require('events');

let url = 'http://mylogger.io/log'; // Fake Link btw

class Logger extends EventEmitter {
    log(message){
        // Send an HTTP request
        console.log(message);

        // Raise an Event
        this.emit('messageLogged', { id : 1, url: 'http://'}); 
    }   
}

module.exports = Logger;
```