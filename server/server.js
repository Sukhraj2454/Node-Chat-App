const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users}  =require('./utils/users');


const PORT = process.env.PORT || 3000;
const publicpath = path.join(__dirname, '/../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicpath));

io.on('connection', (socket)=>{
  console.log('New user Connected');

socket.on("join", (params, callback) => {
  if(!isRealString(params.name) || !isRealString(params.room))
    return callback('Name and Room Name are required');

    socket.join(params.room);
    users.removeUser(socket.id);
    // socket.leave(params.room);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin','Welcome to the Chat-App'));
    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has Joined.`));
    callback();
});

  socket.on('createMessage', (message, callback)=>{
    var user = users.getUser(socket.id);
    if(user && isRealString(message.text))
    {
      if(message.text.split(' ')[0] === '-w')
        {
          console.log('A whisper');
          let user2 = users.getUserByName(message.text.split(' ')[1]);
          if(user2){
          io.to(user2.id).emit('Whisper',generateMessage(user.name, message.text));
          io.to(user.id).emit('Whisper',generateMessage(user.name, message.text));}
          else {
            io.to(user.id).emit('Whisper',generateMessage('Admin', "Invalid User Entered."));
          }
        }
      else
      io.to(user.room).emit('newMessage',generateMessage(user.name, message.text));
    }
    callback();
});

socket.on('createLocationMessage', (coords)=>{
  var user = users.getUser(socket.id);
  if(user)
  {
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  }
});
  socket.on('disconnect', ()=>{
    var user = users.removeUser(socket.id);

      if(user){
        io.to(user.room).emit('updateUserList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
      }
  });
});

server.listen(PORT, ()=>{console.log('Server is Listening on Port:'+PORT)});
