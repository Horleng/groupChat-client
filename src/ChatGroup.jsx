import React, {  useContext, useEffect, useRef, useState } from 'react';
import "./CSS/Chat.css"
import {TbSend} from "react-icons/tb"
import {FiMoreVertical} from "react-icons/fi"
import {AiOutlineClose} from "react-icons/ai"
import moment from "moment";
import { Context } from './Context/Context';
import Members from './Members';
const ChatGroup = () => {
    const [menu,setMenu] = useState(false);
    const {socket,id,groupInformation} = useContext(Context);
    const [newArrMs,setNewArrMs] = useState(null);
    const [showMembers,setShowMembers] = useState(false);
    const ms = useRef();
    const [message,setMessage] = useState([]);
    const scrollRef = useRef();
    const sendMessage = async()=>{
        if(ms.current.value){
            if(id){
                const data = {ms:ms.current.value,sendDate:Date.now(),sender:socket.id,groupID:id};
                socket?.emit("sendMessage",data);
                const ownData = {ms:ms.current.value,sendDate:Date.now(),sender:socket.id,groupID:id,author:"you"};
                setMessage(neMs=>[...neMs,ownData]);
                ms.current.value = "";
            }else alert("Error system");
        }else alert("message is required");
    }
    useEffect(()=>{
        socket?.on("backMessage",data=>{
            setNewArrMs(data);
        });
    },[socket,ms.current?.value]);
    useEffect(()=>{
       newArrMs &&  setMessage(ms=>[...ms,newArrMs]);
    },[newArrMs,ms.current?.value]);
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    const leaveGroups = ()=>{
        window.location.reload();
    }
    const showMem = ()=>{
        setShowMembers(true);
        setMenu(false); 
    }
    const clostBtn = ()=>{
        setShowMembers(false);
    }
    return (
        <div className='message-body'>
            <div className='chat-header'>
                <h3>Chat Group</h3>
                <FiMoreVertical onClick={()=>{
                    setMenu(!menu);
                }} size="25px" className='more-icon'/>
                {
                    menu?<div className='menu'>
                            <ul>
                                <li onClick={showMem}>Members</li>
                                <li onClick={leaveGroups} id="leave">Leave</li>
                                {
                                    groupInformation?
                                    groupInformation?.owner===socket?.id?
                                    <li>Delete Group</li>:<></>
                                    :<></>
                                }
                            </ul>
                        </div>:<></>
                }
                {
                    showMembers?
                    <div className='member'>
                        <AiOutlineClose onClick={clostBtn} fill='black' size="20px" className='clost-icon'/>
                        <Members/>
                    </div>:<></>
                }
            </div>
            <div className="message">
                {
                    message.length?
                        message.map((ms,index)=>{
                            return(
                                <div  className={'ms '+(ms.sender===socket.id?"own-ms":"")} key={index}>
                                    <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" />
                                    <div className='content'>
                                        <div className={'ms-content '+(ms.sender===socket.id?"own-ms-content ":" ")}>
                                            <span className={""+(ms.owner===ms.sender?"owner":" ")}>{ms.author}</span>
                                            <span>{ms.ms}</span>
                                        </div>
                                        <span className='dateTime'>{moment(ms.sendDate).fromNow()}</span>
                                    </div>
                                </div>
                            )
                        })
                        :<span>No message</span>
                }
                <div  ref={scrollRef}></div>
            </div>
            <div className='type-ms'>
                <input ref={ms} type="text" placeholder='Type message here' onKeyPress={(key=>{
                    if(key.key === "Enter") sendMessage();
                })}/>
                <TbSend className="send-icon" size="25px" onClick={sendMessage}/>
            </div>
        </div>
    );
}

export default ChatGroup;
