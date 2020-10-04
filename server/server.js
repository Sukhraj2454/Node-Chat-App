const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
const PORT = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '/../public');

app.use(express.static(publicpath));

io.on('connection', (socket)=>{
  console.log('New user Connected');

  socket.emit('newMessage',{
    from:'Admin',
    text:'Welcome to the Chat'
  });

socket.broadcast.emit('newMessage',{
  from:'Admin',
  text:'New user Joined',
  createdAt:new Date().getTime()
});

  socket.on('createMessage', (message, callback)=>{
    console.log('Message:', message);

    io.emit('newMessage',generateMessage(message.from, message.text));
    callback('This is From Server.');
dAt:new Date().getTime()
});

socket.on('createLocationMessage', (coords)=>{
  io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
});
  socket.on('disconnect', ()=>{
    console.log('User Disconnected');
  });

});



server.listen(PORT, ()=>{console.log('Server is Listening on Port:'+PORT)});
