## Module Wrapper Function

- Immediately Invoked Function Expression
- Node wraps our code in a function module like this to execute it
- It is called the Module Wrapper Function

```javascript
function (exports, require, module, __filename, __dirname) {

let url = "http://mylogger.io/log";

function log(message) {
  console.log(message);
}

module.exports = log;

}

```

- You can view the arguments like this
```javascript
console.log(__filename);
console.log(__dirname);
```