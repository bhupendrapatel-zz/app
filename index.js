/**
 * Primary file for API
 */

// Dependencies
const http =  require('http');


// The server responds to all the requests
const server = http.createServer(function(req, res) {
    console.log("Hello World");
});

// Start server and have it listen on port 3000
server.listen(3000, function() {
    console.log("The server is listening on port 3000");
});