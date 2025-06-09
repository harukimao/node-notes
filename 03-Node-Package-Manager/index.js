var _ = require('underscore');

// First checks for Core Module
// If not core maybe file or folder
// If not then exists inside a node module folder

let result = _.contains([1, 2, 3], 2);
console.log(result);