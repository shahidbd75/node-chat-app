const path =require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

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

    socket.on('createMessage',(message)=>{
       console.log('create Message',message);
       io.emit('newMessage',{
           from: message.from,
           text: message.text,
           createAt: new Date().getTime()
       });
    });
    socket.on('disconnect',()=>{
        console.log('user was disconnected');
    });
});

