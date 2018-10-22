/**
 * Primary file for API
 */

// Dependencies
const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const config = require('./config');


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

        // If route is found then call its handler, else not found handler
        let choosenHandler = typeof (router[trimmedPath]) !== 'undefined' ? router[trimmedPath] : handlers.notFound;

        // Construct data object to be send to the handler
        let data = {
            'trimmedPath': trimmedPath,
            'queryStringObject': queryStringObject,
            'method': method,
            'headers': headers,
            'payload': buffer
        };

        // Route the request to the handler speciifed in router
        choosenHandler(data, function (statusCode, payload) {
            // Use the Status Code called back from handler, or default it to 200
            statusCode = typeof (statusCode) == 'number' ? statusCode : 200;

            // Use the payload called back from handler, or default it to empty object
            payload = typeof (payload) == 'object' ? payload : {};

            // Convert the payload to string
            var payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            // Log the request path
            console.log("Returning the response: ", statusCode, payloadString);

        });

    });

});

// Start the server
server.listen(config.port, function () {
    console.log("The server is listening on port " + config.port + " in " + config.envName + " mode");
});

// Define a handler
let handlers = {};

// Sample handler
handlers.sample = function (data, callback) {
    callback(200, { 'name': 'sample' })
};

// Not Found Handler
handlers.notFound = function (data, callback) {
    callback(404);
};

// Define a router
let router = {
    'sample': handlers.sample
};