## Callback Hell

Nested jumble of callbacks, to resolve solution in next slide

```js
console.log('Before');
getUser(1, function(user){
    getRepositories(user.gitHubUsername, (repos)=> {
        getCommit(repo, (commit)=>{

        });
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