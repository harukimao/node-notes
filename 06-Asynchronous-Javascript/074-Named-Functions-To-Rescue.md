## Named Functions To Rescue

```js
console.log('Before');
// getUser(1, getRepositories); Mosh's Mistake
getUser(1, getUserRepos);
console.log('After');

// Mosh's Mistake
// function get(user){
//     getRepositories(user.gitHubUsername, getCommits)
// }
function getUserRepos(user){
    getRepositories(user.gitHubUsername, getCommits);
}

function getCommits(repos){
    getCommits(repo, displayCommits);
}

function displayCommits(commits){
    console.log(commits);
}

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

function getCommits(repo, callback){
    setTimeout(() => {
        console.log('Fetching commits...');
        callback(['commit1', 'commit2', 'commit3']);
    }, 2000);
}
```