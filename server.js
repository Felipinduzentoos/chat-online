const express = require('express');
const app = express();
const http = require('http').Server(app);
const serverSocket = require('socket.io')(http);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('iniciando na porta 3000');
});

serverSocket.on('connection', function(socket) {
    console.log('algo se conectou' + socket.id);
    
    socket.on('msg', function(mensagem){
      console.log (`msg recebida ${mensagem}`)
      serverSocket.emit('msg', ` ${mensagem}`)
    })
    })