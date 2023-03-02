import React, { useContext, useEffect, useState } from 'react';
import "./CSS/Homepage.css";
import CreateRoom from './CreateRoom';
import JoinRoom from './JoinRoom';
import {io} from "socket.io-client"
import { Context } from './Context/Context';
import ChatGroup from './ChatGroup';
const HomePage = () => {
    const [createRoom,setCreateRoom] = useState(true);
    const {socket,setSocket,showChat,setGroupInformation} = useContext(Context);
    useEffect(()=>{
        setSocket(io("ws://localhost:5000"));
    },[setSocket]);
    useEffect(()=>{
        socket?.on("connect",()=>{
            console.log("Connected: "+socket?.id);
        });
    },[socket]);
    useEffect(()=>{
        socket?.on("send-group-info",group=>{
            console.log({group});
            setGroupInformation(group);
        })
    },[socket,setGroupInformation]);
    return (
        <div className='cover'>
            <div className='title'>
                <h1>Wellcome to my website</h1>
            </div> 
            {
                showChat?<div className='chat'><ChatGroup/></div>:
                <div className='button'>
                <span>
                    <button id='mybtn-1' className={'btn '+(createRoom?"btn-active":"")} onClick={()=>{
                        setCreateRoom(true);
                    }}>Create room</button>  
                    <button id='mybtn-2' className={'btn '+(createRoom?"":"btn-active")} onClick={()=>{
                        setCreateRoom(false);
                    }}>join room</button> 
                </span> 
                <div>
                    {
                        createRoom?<CreateRoom/>:<JoinRoom/>
                    }
                </div>
            </div>}
        </div>
    );
}

export default HomePage;
