## Creating Settled Promises

```js
const p = Promise.resolve({ id: 1 });
p.then(result => console.log(result));
```

- To simulate error

```js
const p = Promise.reject(new Error('reason for rejection'));
p.catch(error => console.log(error));
```