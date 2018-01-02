(function () {
    var socket = io();

    socket.on('connect',function(){
        console.log('Connected to server');
        socket.emit('createMessage',{
            from : 'Andrew',
            text:'Hello how are you?'
        });
    });
    socket.on('disconnect',function(){
        console.log('Disconnected from Server');
    });
    socket.on('newMessage',function (message) {
        console.log('newMessage',message);
    });
})();