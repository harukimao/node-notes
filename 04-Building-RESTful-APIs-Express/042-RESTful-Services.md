## RESTful Services

- App is client
- Under the hood talks to server to access data
- Communication is through HTTP protocol, which allows some specific HTTP services
- Client directly calls services by sending HTTP requests
- REST is short for Representational State Transfer
- Create, Read, Update, Delete CRUD Operations
- http://vidly.com/api/customers is an Endpoint
- HTTP Methods, GET, POST, PUT, DELETE
- GET request to /api/customers
- Response would send JSON { id: 2,name: 'etc'}
- GET request to /api/customers/1 fetches customer id 1
- PUT /api/customers/1 Updates id 1
- POST /api/customers with body for request

### Standard HTTP Methods
- GET /api/customers
- GET /api/customers/1
- PUT /api/customers/1
- DELETE /api/customers/1
- POST /api/customers