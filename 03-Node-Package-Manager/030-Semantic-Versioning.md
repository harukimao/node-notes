## Semantic Versioning (SemVer)

```json
    "dependencies": {
    "mongoose": "^8.15.1" 
    } 
```
- Caret Character ^ forces major is same
- ^8.15.1 = Major.Minor.Patch (SemVer)
- For fixing patch version changes
- For adding features without breaking existing applications minor version changes 
- For adding features that could break existing application major version changes
- ~ Tilde forces major.minor
- "mongoose": "8.15.1" with no character forces the exact same version