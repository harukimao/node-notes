## Patterns for Dealing with Async Code

- How to access user object in the main program

#### Three patterns to deal with async code
- Callbacks
- Promises
- Async/await

```js

console.log('Before');
const user = getUser(1);
console.log(user); // Won't be logged since async 
console.log('After');

function getUser(id){
    setTimeout(() => {
        console.log('Reading user from database...');
        return { id: id, gitHubUsername: 'losh '};
    }, 2000);
}