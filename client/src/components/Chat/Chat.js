import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const ENDPOINT = 'http://localhost:3000/';
    const urlQueryString = window.location.search;

    useEffect(() => {
        const {name, room} = queryString.parse(urlQueryString);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join',{ name , room}, () => {

        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
    }, [ENDPOINT,urlQueryString] );

    return(
        <h1>Chat</h1>
    );
}

export default Chat;