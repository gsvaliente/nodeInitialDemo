const express = require('express');
const app = express();
const port = 5000;
const socketIO = require('socket.io');


// TODO allow cors for localhost:3000 (la direcció del client)

// TODO middlewares

// TODO rutes

// TODO sockets

app.listen(port, () => {
  console.log(`Xat server running on http://localhost: ${port}`)
});