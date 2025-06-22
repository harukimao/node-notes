## Logging Out Users

- No need to make a route since we arent storing tokens in database
- Store the tokens on the client not server
- Whenever sending token from client to server send through HTTPS

#### ✔️ The server generates and sends the JWT token.
#### ✔️ The client stores and reuses the token for future authenticated requests.