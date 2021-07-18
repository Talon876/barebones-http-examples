/*
A minimal TCP server that follows just enough of the
HTTP protocol (https://datatracker.ietf.org/doc/html/rfc2616)
to return a basic website with two pages and return a 404 for all other requests.
*/

const net = require('net');

const server = new net.Server();
const port = 8009;
server.listen(port, () => {
    console.log(`TCP (Minimal HTTP) Server listening on port ${port}`);
    console.log(`Try connecting with: telnet localhost ${port}`);
    console.log(`Or navigate to http://localhost:${port} in a browser`);
});

server.on('connection', (socket) => {
    console.log(`Received connection from ${socket.remoteAddress}`);

    socket.on('data', (chunk) => {
        const msg = chunk.toString().trim();

        // Show the data we received from the client.
        console.log(`>>> ${msg}\n\n`);

        // Check if it looks like an HTTP GET request
        if (msg.startsWith('GET ')) {

            // Create a default message and status code
            let responseMsg = '';
            let status = 404;

            // Check for different paths/pages and setup different response data and status codes
            if (msg.startsWith('GET /home')) {
                status = 200;
                responseMsg =
                    '<h1>Suh Dude</h1>' +
                    '<a href="/other">Other</a>' +
                    '<script>console.log("yo dawg heard you like javascript...");</script>';
            } else if (msg.startsWith("GET /other")) {
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

            // Create each line of the HTTP response,
            // Ensuring that Content-Type is set to text/html so browsers will render it correctly
            const lines = [
                `HTTP/1.1 ${status} Okely Dokely`,
                'Content-Type: text/html',
                `Content-Length: ${responseMsg.length}`,
                '',
                responseMsg
            ];

            // Create the full response payload by combining the lines together with newline characters
            const httpResponse = lines.join('\n');

            console.log(`<<< ${httpResponse}`);

            // Send response to the client and close the connection
            socket.write(httpResponse);
            socket.destroy();
        }
    });
});
