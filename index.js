/**
 * Primary file for API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;


// The server responds to all the requests
const server = http.createServer(function (req, res) {

    // Get the URL and parse it
    let parsedUrl = url.parse(req.url, true);

    // Get the path
    let path = parsedUrl.pathname;
    let trimmedPath = path.replace(/^\/+|\/+$/g, '');

    // Get the query parameter
    let queryStringObject = parsedUrl.query;

    // Get the HTTP method
    let method = req.method.toLowerCase();

    // Get the headers as an object
    let headers = req.headers;

    // Get Payload
    let decoder = new StringDecoder('utf-8');
    let buffer = '';


    req.on('data', function (data) {
        buffer += decoder.write(data);
    });

    req.on('end', function () {
        buffer += decoder.end();

        // Send the response
        res.end("Hello World\n");

        // Log the request path
        console.log("Request received with these payload", buffer);

    });

});

// Start server and have it listen on port 3000
server.listen(3000, function () {
    console.log("The server is listening on port 3000");
});