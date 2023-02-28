This is for Backend

NOTE: If you are copying this whole folder then you need to reinstall pnpm install coz of using virtual location it need to setup the paths

npm install -g pnpm  // firstly install npm as pnpm

pnpm init

pnpm install express bcrypt mongoose nodemon jsonwebtoken dotenv colors validator


"start": "nodemon --trace-deprecation backend/server.js"  <!-- setting the script for running the server --> 

SignUp/ Registration API Implementaion Done


<<<<<<<Status Codes>>>>>>

1xx Informational

100 Continue: The server has received the initial part of the request and will continue to process it.
101 Switching Protocols: The server is switching protocols according to the request of the client.
2xx Success

200 OK: The request has succeeded.
201 Created: The request has been fulfilled and a new resource has been created.
202 Accepted: The request has been accepted for processing, but the processing has not been completed.
204 No Content: The server has fulfilled the request but there is no content to send back.
3xx Redirection

300 Multiple Choices: The requested resource has multiple representations.
301 Moved Permanently: The requested resource has been moved permanently to a new URL.
302 Found: The requested resource has been temporarily moved to a new URL.
304 Not Modified: The client's cached version of the requested resource is up to date.
4xx Client Error

400 Bad Request: The server cannot understand the request due to invalid syntax.
401 Unauthorized: The client must authenticate itself to get the requested response.
403 Forbidden: The client does not have access rights to the content.
404 Not Found: The requested resource could not be found.
5xx Server Error

500 Internal Server Error: A generic error message, given when no more specific message is suitable.
501 Not Implemented: The server does not support the functionality required to fulfill the request.
502 Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
503 Service Unavailable: The server is currently unable to handle the request due to a temporary overload or maintenance.





// signUp work done for every type
// signIn working start from signIn, not full compelted