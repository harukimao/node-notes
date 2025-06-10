## Middleware

### Concept: 
- Middleware Function: Takes a request object from the client and either returns a response to the client or passses control to another middleware funciton

- Every route handler is technically a middleware function as it does the stuff above

- express.json() returns middleware function. The function reads requests and if there is a json object is present in the body of the request it parses the body of the request into a json object and set req.body property 

- Requests goes thru request processing pipieline which contains middleware functions which perform operations and terminate the cycle by returning a response to the client

- Express application is basically a bunch of middleware functions

- You can create custom middleware functions