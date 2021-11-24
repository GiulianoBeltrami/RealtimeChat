const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');


const PORT = process.env.PORT || 3000;

const app = express();
app.use(router);
app.use(cors());
const server = http.createServer(app);

options={
    cors:true,
    origins:["http://localhost:3001"]
}

const io = socketio(server,options);

io.on('connection', (socket) => {
    console.log("New socket connection");

    socket.on('join', ({ name , room}, callback) => {
        console.log({name,room});
        
    })

    socket.on('disconnect', () => {
        console.log('Someone has disconencted');
    })
})

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`)
});