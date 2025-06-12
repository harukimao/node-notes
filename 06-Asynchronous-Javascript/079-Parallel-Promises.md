## Running Parallel Promises

- If any promise is rejected the final promise from promise.all is considered rejected

```js
// To simulate error
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(()=> {
//         console.log('Async operation 1...');
//         reject(new Error('because sth failed'));
//     }, 2000)
// });

const p1 = new Promise((resolve) => {
    setTimeout(()=> {
        console.log('Async operation 1...');
        resolve(1);
    }, 2000)
});

const p2 = new Promise((resolve) => {
    setTimeout(()=> {
        console.log('Async operation 2...');
        resolve(2);
    }, 2000)
});

// In this implementation both async operations are started at the same time (concurrency)
Promise.all([p1, p2])
 .then(result => console.log(result))
 .catch(err => console.log(err.message))


// When you wanna do another operation as soon as any of the promises complete and not wait for all to complete
Promise.race([p1, p2])
 .then(result => console.log(result))
 .catch(err => console.log(err.message))
// Output : 1 since 1 completed first and .race return its resolved promise aka value of the first filled promise