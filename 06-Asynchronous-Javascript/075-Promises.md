## Promises

- Holds the eventual result of an asynchronous operation
- Will Result in a value or an error
- Three states,<span style="color: red;">Pending</span>--Async Operation--><span style="color: red;">Fulfilled</span> or <span style="color: red;">Error</span> 

```js
const p = new Promise(function(resolve, reject){
    // Any async operation
    // Send this result to consumers of this promise
    setTimeout(()=> {
        resolve(1); // pending -> resolved, fulfilled
        // Pass Error
        //reject(new Error('message')); pending -> rejected
    }, 2000);
});

p.then(result => console.log('Result', result))
.catch(err => console.log('Error', err.message));
```