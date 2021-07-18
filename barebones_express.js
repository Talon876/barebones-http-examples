/*
A minimal express server that creates an HTTP server
to return a basic website with two pages and return a 404 for all other requests.
*/
const express = require('express');

const app = express();

// Create a handler for the /home page
app.get('/home', (req, res) => {
    const responseMsg =
        '<h1>Suh Dude</h1>' +
        '<a href="/other">Other</a>' +
        '<script>console.log("yo dawg heard you like javascript...");</script>';
    res.status(200).send(responseMsg);
});

// Create a handler for the /other page
app.get('/other', (req, res) => {
    const responseMsg =
        '<h1>Other</h1>' +
        '<a href="/home">Home</a>';
    res.status(200).send(responseMsg);
});

// Create a default handler for all other requests that returns a 404 page
app.get('*', (req, res) => {
    const responseMsg =
        '<h1>Rekt!</h1>' +
        '<p>Nothing is here</p>' +
        '<a href="/home">Home</a>';
    res.status(404).send(responseMsg);
});

const port = 8009;
app.listen(port, () => {
    console.log(`Express Server listening on port ${port}`);
    console.log(`Try connecting with: telnet localhost ${port}`);
    console.log(`Or navigate to http://localhost:${port} in a browser`);
});
