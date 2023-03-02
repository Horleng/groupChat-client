import React, { useContext, useEffect } from 'react';
import "./CSS/Members.css"
import { Context } from './Context/Context';
const Members = () => {
    const {socket,id,setGroupInformation,groupInformation} = useContext(Context);
    useEffect(()=>{
        socket?.emit('refresh',{groupId:id});
    },[socket,id]);
    useEffect(()=>{
        socket?.on("res",data=>{
            setGroupInformation(data);
        });
    },[setGroupInformation,socket])
    const removerUser = (userId)=>{
        if(window.confirm("Are you sure you want to remove this user?")){
            socket?.emit("removerUser",{userId,groupId:id});
        }
    }
    useEffect(()=>{
        socket?.on("response-remove",async({remover,admin})=>{
            if(socket.id===remover?.socketId){
                alert(`You was removed by ${admin.username}`);
                window.location.reload();
            }else {
                alert(`${remover.username} was removeed by ${admin.username}`);
            }
        });
    },[socket]);
    return (
        <>
            <div className='card-cover'>
                {
                    groupInformation?.members.length?
                    groupInformation.members.map((item, index) =>{
                        const joinDate = new Date(item.joinDate);
                        return(
                            <div className='card' key={index}>
                                <div className='img-cover'>
                                    <img src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_1280.png" alt="" className='card-image'/>
                                </div>
                                <div className='info'>
                                    <h6 className='name'>{item.username}</h6>
                                    {
                                        item.socketId===groupInformation.owner?
                                        <p className='join-date owner-date'>Owner</p>:
                                        <p className='join-date'>{joinDate.toLocaleTimeString()}</p>
                                    }
                                </div>
                                <span className='remove-btn'>
                                    {
                                        socket?.id===groupInformation?.owner && item.socketId!==groupInformation.owner?
                                        <button onClick={()=>removerUser(item.socketId)}>Remove</button>:<></>
                                    }
                                </span>
                            </div>
                        )
                        
                    }):<h1>No Members</h1>
                }
            </div>
        </>
    );
}

export default Members;
