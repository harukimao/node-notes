## Package Dependencies

- Ran npm i mongoose
- This got added to package.json
```bash
   "dependencies": {
    "mongoose": "^8.15.1"
    }
```
- Inside of the node modules folder there are other libraries mongoose is dependent on
- All dependencies of our app and their dependencies are stored within node modules folder
- If one of these packages uses a different version for one of these dependencies it will be stored locally in the dependency's folder