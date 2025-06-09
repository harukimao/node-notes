## Updating a Published Package

```js
module.exports.add = function(a, b){ return a + b };
module.exports.multiply = function(a, b){ return a * b };
```

- Running npm publish wont publish over the previous version
- Since we added a new feature which would not break the previous features we update minor
- You can go to package.json and update the version number manually or you can write npm version major/minor/patch 
- Then npm publish which publishes the new version