// Create web server 
// application to handle HTTP requests
// This is a "RESTful" API that uses HTTP methods (verbs) to 
// indicate what action is being requested.
// GET = read
// POST = create
// PUT = update
// DELETE = delete
// The API returns JSON formatted data

// Import modules
var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

// Create express app
var app = express();

// Configure app to use bodyParser to parse data from a POST
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set port
var port = process.env.PORT || 8080; // set our port

// Create express router
var router = express.Router();

// Log all requests to the console
router.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

// Home page route
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the comments API!' });
});

// Get all comments
router.get('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving comments');
        }
        else {
            res.send(data);
        }
    });
});

// Get a single comment
router.get('/comments/:id', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving comments');
        }
        else {
            var comments = JSON.parse(data);
            var comment = comments[req.params.id];
            if (!comment) {
                res.status(404).send('Comment not found');
            }
            else {
                res.send(JSON.stringify(comment));
            }
        }
    });
});

// Create a comment
router.post('/comments', function(req, res) {
    fs.readFile('comments.json', 'utf8', function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send('Error retrieving comments');
        }
        else {
            var comments = JSON.parse(data);
            var comment = req.body;
            var id = comments.length;
            comment.id = id;
            comments.push(comment);
            
            // Save the updated comments array to the file
            fs.writeFile('comments.json', JSON.stringify(comments), 'utf8', function(err) {
                if (err) {
                    console.log(err);
                    res.status(500).send('Error saving comment');
                }
                else {
                    res.send('Comment saved successfully');
                }
            });
        }
    });
});
