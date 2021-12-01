const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const router = require('./router');
const cors = require('cors');
const Users = require('./users');
const users = new Users();

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
    joinSocket(socket);

    sendMessageSocket(socket);

    disconnectSocket(socket);
})

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`)
});

function joinSocket(socket){
    return socket.on('join', ({ name , room}, callback) => {
        
            const {user} = users.addUser({id:socket.id,name,room});

            socket.join(user.room);

            socket.emit('message',{ user:'admin',text:`Olá ${user.name}, seja bem vindo a sala ${user.room}`});

            socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} entrou!`} );
            

            io.to(user.room).emit('roomData', {room: user.room, users:users.getUsersInRoom(user.room)});

            callback();
        })
}

function sendMessageSocket(socket){
    return  socket.on('sendMessage', (message,callback) => {
                const user = users.getUser(socket.id);

                console.log('--------------------------------------------------------------');
                console.log('User send message');
                console.log(user);
                console.log('Send: ',message);
                console.log('--------------------------------------------------------------');
                
                io.to(user.room).emit('message',{user:user.name , text:message});

                callback();
            })
}

function disconnectSocket(socket){
    return  socket.on('disconnect', () => {
                const user = users.removeUser(socket.id);

                if (user){
                    io.to(user.room).emit('message',{ user:'admin',text:`${user.name} saiu da sala!`});
                    io.to(user.room).emit('roomData',{room:user.room , users:users.getUsersInRoom(user.room)});
                }
            })
}

class chatSocket{

    constructor(server,options){
        this.server = server;
        this.options = options;
        this.io = socketio(server,options);
    }

    connectionSocket = () => {
        this.io.on('connection', socket => {

            joinSocket(socket);
        
            sendMessageSocket(socket);
        
            disconnectSocket(socket);
        })
    }
    
    joinSocket = (socket) =>{
        return socket.on('join', ({ name , room}, callback) => {
            
            const {user} = users.addUser({id:socket.id,name,room});

            socket.join(user.room);

            socket.emit('message',{ user:'admin',text:`Olá ${user.name}, seja bem vindo a sala ${user.room}`});

            socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} entrou!`} );
            

            io.to(user.room).emit('roomData', {room: user.room, users:users.getUsersInRoom(user.room)});

            callback();
        })
    }
    

    sendMessageSocket = (socket) => {
        return  socket.on('sendMessage', (message,callback) => {
            const user = users.getUser(socket.id);

            io.to(user.room).emit('message',{user:user.name , text:message});

            callback();
        })
    }
    

    disconnectSocket = (socket) => {
        return  socket.on('disconnect', () => {
            const user = users.removeUser(socket.id);

            if (user){
                io.to(user.room).emit('message',{ user:'admin',text:`${user.name} saiu da sala!`});
                io.to(user.room).emit('roomData',{room:user.room , users:users.getUsersInRoom(user.room)});
            }
        })
    }

}