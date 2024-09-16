const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});




http.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});


io.on('connection', (socket) => {
    console.log('Cliente conectado: ' + socket.id);

    
    socket.on('msg', (data) => {
        console.log(`Mensagem recebida: ${data.username}: ${data.message}`);
        io.emit('msg', data); 
    });

 
    socket.on('disconnect', () => {
        console.log('Cliente desconectado: ' + socket.id);
    });
});
