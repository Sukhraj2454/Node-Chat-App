var socket = io();

socket.on('connect', function(){
  console.log('Connected to server.');
  socket.emit('createMessage', {
    from:'Andrew',
    to:'Mike@eaxmple.com',
    text:'Hey, i need a lower Price.'
  });
});

socket.on('newMessage', function(message){

  console.log('Message:', message);
});

socket.on('disconnect', function(){
  console.log('Disconnected from server');
});
