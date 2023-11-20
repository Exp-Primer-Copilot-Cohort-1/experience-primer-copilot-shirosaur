// create web server
// import http module
const http = require('http');

// import fs module
const fs = require('fs');

// import url module
const url = require('url');

// create server
http.createServer(function(req, res) {
    // get the path name
    const pathname = url.parse(req.url).pathname;
    // print the path name
    console.log("Request for " + pathname + " received.");

    // read the file content
    fs.readFile(pathname.substr(1), function(err, data) {
        if (err) {
            console.log(err);
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data.toString());
        }
        res.end();
    });
}).listen(8081);

// print the message
console.log('Server running at http://');
// wait it works now