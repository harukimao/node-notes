## Async and Await

```js
// getUser(1)
//  .then(user => getRepositories(user.gitHubUsername))
//  .then(repos =>) getCommits(repo[0])
//  .then(commits => console.log('Commits', commits))
//  .catch(err => console.log('Error', err.message));

// Async and Await Approach
async function displayCommits(){
    try{    
        const user = await getUser(1);
        const repos = await getRepositories(user.gitHubUsername);
        const commits = await getCommits(repos[0]);
        console.log(commits);
    }
    catch (err) {
        console.log('Error', err.message);
    }
}
// Returns a promise that once fulfilled doesnt return a value returns void
displayCommits();

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
           // Test Error
           //reject(new Error('Could not get repos'));
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