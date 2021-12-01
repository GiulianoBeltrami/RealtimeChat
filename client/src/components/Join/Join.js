import React, {useState} from "react";
import {Link} from 'react-router-dom';
import './Join.css';

const Join = () => {
    const [name,setName] = useState('');
    const [room,setRoom] = useState('');

    const isNameFilled = () =>{
        return name.length > 0;
    }

    const isRoomFilled = () => {
        return room.length > 0;
    }

    const isNameAndRoomFilled = () => {
        return isNameFilled() && isRoomFilled();
    }

    return(
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={event=> setName(event.target.value)}/>
                </div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={event=> setRoom(event.target.value)}/>
                </div>
                <Link onClick={ event => (!isNameFilled() || !isRoomFilled()) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <button className="joinButton mt-20" type="submit">Entrar</button>
                </Link>
            </div>
        </div>
    );
}



export default Join;