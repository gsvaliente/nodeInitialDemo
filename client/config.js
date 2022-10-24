const express = require('express'); // using express
const socketIO = require('socket.io');
const http = require('http');
const port = process.env.PORT||3000 // setting the port
let app = require('express')();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
 
server.listen(port);