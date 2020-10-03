const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const PORT = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '/../public');

app.use(express.static(publicpath));
io.on('connection', (socket)=>{
console.log('New connection found.');

socket.on('disconnect', ()=>{
  console.log('User Disconnected');
});
});



server.listen(PORT, ()=>{console.log('Server is Listening on Port:'+PORT)});
