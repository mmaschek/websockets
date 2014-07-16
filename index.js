var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){

  io.emit('chat message', 'a user connected');

  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
	io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(msg){
    io.emit('chat message', 'a user disconnected');
  });
});

http.listen(8080, function(){
  console.log('listening on *:8080');
});