## Replacing Callbacks with Promises

```js
// getUser(1, function(user){
//     getRepositories(user.gitHubUsername, (repos)=> {
//         getCommit(repo[0], (commits)=>{
//             console.log(commits);
//         });
//     });
// });

getUser(1)
 .then(user => getRepositories(user.gitHubUsername))
 .then(repos =>) getCommits(repo[0])
 .then(commits => console.log('Commits', commits))
 .catch(err => console.log('Error', err.message));

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