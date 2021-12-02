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
    origins:["*"]
}


class ChatSocket{

    constructor(server,options){
        this.io = socketio(server,options);
    }

    connectionSocket = () => {
        return this.io.on('connection', socket => {

            this.joinSocket(socket);
        
            this.sendMessageSocket(socket);
        
            this.disconnectSocket(socket);
        })
    }
    
    joinSocket = (socket) =>{
        return socket.on('join', ({ name , room}, callback) => {
            
            const {user} = users.addUser({id:socket.id,name,room});

            socket.join(user.room);

            socket.emit('message',{ user:'admin',text:`Olá ${user.name}, seja bem vindo a sala ${user.room}`});

            socket.broadcast.to(user.room).emit('message', {user:'admin',text:`${user.name} entrou!`} );
            

            this.io.to(user.room).emit('roomData', {room: user.room, users:users.getUsersInRoom(user.room)});

            callback();
        })
    }
    

    sendMessageSocket = (socket) => {
        return  socket.on('sendMessage', (message,callback) => {
            const user = users.getUser(socket.id);

            this.io.to(user.room).emit('message',{user:user.name , text:message});

            callback();
        })
    }
    

    disconnectSocket = (socket) => {
        return  socket.on('disconnect', () => {
            const user = users.removeUser(socket.id);

            if (user){
                this.io.to(user.room).emit('message',{ user:'admin',text:`${user.name} saiu da sala!`});
                this.io.to(user.room).emit('roomData',{room:user.room , users:users.getUsersInRoom(user.room)});
            }
        })
    }

}

const chatSocket = new ChatSocket(server,options);
chatSocket.connectionSocket();

server.listen(PORT, () =>{
    console.log(`Server has started on port ${PORT}`)
});


