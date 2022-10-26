const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
let server = require('http').createServer(app);
let io = require('socket.io')(server);


app.use('/', express.static('public'));

//app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname,"./public/index.html"))
})


app.listen(port, () => {
  console.log(`Chat client running on http://localhost:${port}`)
})

/*
const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT||3000 // setting the port
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
server.listen(port);
*/