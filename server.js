const express = require('express');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 4000;

app.get('/', (req, res) => {
  console.log('Connected');
})

io.on('connection',(socket)=>{
	console.log("New Client Connected");
	
	socket.on("server",(message)=>{
		console.log(message,socket.id);
		socket.broadcast.emit("client",message);
	});

	socket.on('disconnect',()=>{
		console.log("Client Disconnected");
	});

});

server.listen(PORT,()=>{console.log(`Server running on port ${PORT}`)});