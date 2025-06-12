## Synchronous vs Asynchronous

- Synchronous are blocking
- Asynchronous settimeout in this case is non blocking, when the program is run the first line is executing and when setTimeout is encountered all it does is schedule a task to be performed in the future, doesn't block or wait, only schedules and returns control

```js
console.log('Before'); // Synchronous
// Async function
setTimeout(() => {
    console.log('Reading user from database...');
}, 2000);
console.log('After');
```