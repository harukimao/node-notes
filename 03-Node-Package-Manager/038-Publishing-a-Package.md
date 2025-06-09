## Publishing a Package

- mkdir lion-lib making a library called lion
- cd lion-lib/
- npm init --yes
- make index.js

```javascript
module.exports.add = function(a, b){
    return a + b
};
```

- If you dont have an account on npmjs do that by npm adduser otherwise npm login
- npm publish to publish the package
- for it to be published name it sth unique in package.json
- Now you can use it as another node module to an application and it comes under dependencies in package.json
- You can then require('lion-lib') or whatever your library is named