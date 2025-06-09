## OS Module

- Can check OS methods on node website

```javascript
    const os = require('os');
    let totalMemory = os.totalmem();
    let freeMemory = os.freemem();

    console.log(`Total Memory: + ${totalMemory}`);
```