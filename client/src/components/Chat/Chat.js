import React, {useState, useEffect} from "react";
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import Infobar from '../Infobar/Infobar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');
    const [message,setMessage] = useState('');
    const [messages,setMessages] = useState([]);
    const ENDPOINT = 'https://realtime-chat-application-v1.herokuapp.com/';
    const urlQueryString = window.location.search;

    useEffect(() => {
        const {name, room} = queryString.parse(urlQueryString);
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join',{name , room}, () => {

        });

        return () => {
            socket.disconnect();
        }
    }, [ENDPOINT,urlQueryString] );

    useEffect(() => {
        socket.on('message', message => {
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

    return(
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
            </div>
        </div>
    );
}

export default Chat;