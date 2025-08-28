In **Express.js**, a **header** refers to the metadata sent along with an HTTP request or response. It is part of the HTTP protocol and contains key-value pairs that give additional information about the request or response.

### Types of Headers in Express.js

1. **Request Headers** – Sent by the client (browser, Postman, frontend app) to the server.

   - Example: `Content-Type`, `Authorization`, `Accept`, `User-Agent`.
   - Express lets you read these using:

     ```js
     app.get("/example", (req, res) => {
       console.log(req.headers); // all headers
       console.log(req.get("Authorization")); // specific header
     });
     ```

2. **Response Headers** – Sent by the server back to the client.

   - Example: `Content-Type`, `Set-Cookie`, `Cache-Control`.
   - Express lets you set headers using:

     ```js
     app.get("/example", (req, res) => {
       res.set("Content-Type", "application/json");
       res.setHeader("X-Custom-Header", "Hello");
       res.send({ message: "Headers set!" });
     });
     ```

### Common Use Cases of Headers in Express

- **Authentication**: Pass tokens (e.g., JWT) using `Authorization` header.
- **Content Negotiation**: Specify `Content-Type` (e.g., `application/json`).
- **Security**: Add headers like `X-Frame-Options`, `Strict-Transport-Security`.
- **Caching**: Use headers like `Cache-Control`, `ETag`.

---

Would you like me to **explain headers in the context of JWT authentication** (e.g., how a token is passed in headers)? Or **show how to set and read custom headers in Express.js**?
