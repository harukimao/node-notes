## Modelling Relationships 

- Trade off between query performance vs consistency

- Using References (Normalization) -> Consistency but additional query

```js
let author = {
    name: 'Mosh'
}

let course = {
    author: 'id'
    //authors: ['id1', 'id2']
}
```

- Using Embedded Documents (Denormalization) -> Performance but inconsistent data

```js
let course = {
    author: {
        name: 'Mosh'
    }
}
```

- Hybrid Approach

```js
let author = {
    name: 'Mosh'
    // 50 other properties
}

// Useful for snapshot of a data
let course = {
    author:{
        id: 'ref',
        name: 'Mosh'
    }
}
```