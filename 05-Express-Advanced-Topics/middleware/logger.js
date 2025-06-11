// Put all middleware in this folder
function log (req, res, next){
    console.log('Logging...');
    next();
}

module.exports = log;