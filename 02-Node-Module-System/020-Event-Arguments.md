## Event Arguments

```javascript
const EventEmitter = require('events');
const emitter = new EventEmitter();

// Register a Listener
emitter.on('messageLogged', function(arg){
    console.log("Listener Called", arg);
});

// Raise an Event
emitter.emit('messageLogged', { id : 1, url: 'http://'}); 
```