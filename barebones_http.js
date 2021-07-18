/*
A minimal HTTP server that implements a basic website
with two pages and returns a 404 for all other requests.
*/

const http = require('http');

const server = http.createServer((req, res) => {
    // The req object now has all the data from HTTP requests that we need
    // The res object provides methods to set headers/data for our response

    // Log the http method (GET, POST, PUT, DELETE) and requested URL. These have been parsed from the incoming HTTP request
    console.log(req.method + ' ' + req.url);

    // Create a default message and status code
    let status = 404;
    let responseMsg = "";

    // Check for different paths/pages and setup different response data and status codes
    if (req.url === '/home') {
        status = 200;
        responseMsg =
            '<h1>Suh Dude</h1>' +
            '<a href="/other">Other</a>' +
            '<script>console.log("yo dawg heard you like javascript...");</script>';
    } else if (req.url === '/other') {
        status = 200;
        responseMsg =
            '<h1>Other</h1>' +
            '<a href="/home">Home</a>';
    } else {
        status = 404;
        responseMsg =
            '<h1>Rekt!</h1>' +
            '<p>Nothing is here</p>' +
            '<a href="/home">Home</a>';
    }

    // Set the Content-Type to text/html so browsers will render it correctly
    res.setHeader('Content-Type', 'text/html');
    res.writeHead(status, 'Okely Dokely');
    // Send the response to the client and close the connection;
    res.end(responseMsg);
});

const port = 8009;
server.listen(port, () => {
    console.log(`HTTP Server listening on port ${port}`);
    console.log(`Try connecting with: telnet localhost ${port}`);
    console.log(`Or navigate to http://localhost:${port} in a browser`);
});
