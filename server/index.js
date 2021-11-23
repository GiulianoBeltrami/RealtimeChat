const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(router);
const server = http.createServer(app);


const io = socketio(server);

io.on('connection', (socket) => {
    console.log("New socket connection");

    socket.on('disconnect', () => {
        console.log('Someone has disconencted');
    })
})

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`)
});