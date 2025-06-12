## Callbacks

```js
console.log('Before');
getUser(1, function(user){
    getRepositories(user.gitHubUsername, function(repos){
        console.log('Repos: ', repos);
    });
});
console.log('After');

function getUser(id, callback){
    setTimeout(() => {
        console.log('Reading user from database...');
        callback({ id: id, gitHubUsername: 'losh ' });
    }, 2000);
}

function getRepositories(username, callback){
    setTimeout(() => {
        console.log('Calling GitHub API...');
        callback(['repo1', 'repo2', 'repo3']);
    }, 2000);
}
```