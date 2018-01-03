const path =require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 3330;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
app.use(express.static(publicPath));
server.listen(port,()=>{
    console.log(`Server is up on port ${port}`);
});

// socket io
io.on('connection',(socket) => {
    console.log('new user connected');

    socket.emit('newMessage',generateMessage('Admin','Welcome to chat app'));
    socket.broadcast.emit('newMessage',generateMessage('Admin','New user joined'));

    socket.on('createMessage',(message)=>{
       //console.log('create Message',message);
       io.emit('newMessage',generateMessage(message.from,message.text));

    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});

