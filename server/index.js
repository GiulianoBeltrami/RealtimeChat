const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');
const {addUser,removeUser,getUser,getUserInRoom} = require('./users');


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

io.on('connection', socket => {
    socket.on('join', ({ name , room}, callback) => {
        
        const {error, user} = addUser({id:socket.id,name,room});
        if(error){
            return callback(error);
        }
        socket.emit('message',{ user:'admin',text:`Olá ${user.name}, seja bem vindo a sala ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} entrou!`} );
        socket.join(user.room);

        io.to(user.room).emit('roomData', {room: user.room, users:getUserInRoom(user.room)});

        callback();
    })

    socket.on('sendMessage', (message,callback) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message',{user:user.name , text:message});
        io.to(user.room).emit('roomData',{room:user.room , users:getUserInRoom(user.room)});
        callback();
    })

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user){
            io.to(user.room).emit('message',{ user:'admin',text:`${user.name} saiu da sala!`});
        }
    })
})

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`)
});