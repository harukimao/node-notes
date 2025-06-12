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