import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'http://localhost:3000/';
    const urlQueryString = window.location.search;

    useEffect(() => {
        const {name, room} = queryString.parse(urlQueryString);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join',{name , room}, () => {

        });

        return () => {
            //socket.emit('disconnect');
            //socket.off();
        }
    }, [ENDPOINT,urlQueryString] );

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages,message]);
        })
    },[messages])


    const sendMessage = (event) => {
        event.preventDefault();

        if(message){
            socket.emit('sendMessage', message, () =>{
                setMessage('');
            })
        }
    }

    console.log(message);
    console.log(messages);

    return(
        <div className="outerContainer">
            <div className="innerContainer">
                <input value={message} onChange={event => setMessage(event.target.value)}
                    onKeyPress={event => event.key==='Enter' ? sendMessage(event) : null}
                />
            </div>
        </div>
    );
}

export default Chat;