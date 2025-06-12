## Replacing Callbacks with Promises

```js
console.log('Before');
getUser(1, function(user){
    getRepositories(user.gitHubUsername, (repos)=> {
        getCommit(repo[0], (commits)=>{
            console.log(commits);
        });
    });
});
console.log('After');

function getUser(id){
   
   return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Reading a user from database...');
            resolve({id:id,githubUsername:'rohitkolapkar'});
            
        },3000);

    });
};

function getRepositories(username){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('getting repositories');
           resolve(['repo1','repo2','repo3']);
        },2000);
    });

};

function getCommits(repo){

    return new Promise((resolve,reject)=>{
        setTimeout(()=>{
            console.log('Calling Github API..')
            resolve(['commits']);
        },2000);
    });
};
```