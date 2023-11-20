// create web server to handle request and send response
// import http module
const http = require('http');

// import url module
const url = require('url');

// import querystring module
const querystring = require('querystring');

// create server
http.createServer(function(req, res) {
    // get the query string
    const query = url.parse(req.url).query;
    // parse the query string
    const params = querystring.parse(query);

    // set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    if ('firstname' in params && 'lastname' in params) {
        // response with firstname and lastname
        res.write('Your name is ' + params['firstname'] + ' ' + params['lastname']);
    } else {
        // response without firstname and lastname
        res.write('Your name is undefined');
    }
    res.end();
}).listen(8081);

// print the message
console.log('Server running at http://');

// Path: hello.js
// create web server to handle request and send response
// import http module
const http = require('http');

// import url module
const url = require('url');

// create server
http.createServer(function(req, res) {
    // get the query string
    const query = url.parse(req.url, true).query;
    // get the name
    const name = query.name;

    // set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    // response with name
    res.write('Hello ' + name);
    res.end();
}).listen(8081);

// print the message
console.log('Server running at http://');

// Path: index.html
<!DOCTYPE html>
<html>

<head>
    <title>Node.js GET Request</title>
    <meta charset="utf-8"></meta>
</head>

<body>
    <form action="http://"></form>
</body>
</html>