const bcrypt = require('bcrypt');

//1234 -> abcd NEED A SALT (random string before and after)
//always use asynchronous, higher the round number the longer it takes to generate the salt

async function run(){
    const salt = await bcrypt.genSalt(10); 
    const hashed = await bcrypt.hash('1234', salt);
    console.log(salt);
    console.log(hashed);

}

run();