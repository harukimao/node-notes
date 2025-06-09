## Package JSON

```bash
mkdir npm-demo
cd npm-demo
npm init
```

- Final Output
```bash
{
  "name": "npm-demo",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "description": ""
}
```
#### Before Adding any node packages to your application you need to create a package.json file
### So as a best practice whenever you start a new project run npm init to create package.json

- run npm init --yes to initialize with all defualt values