import React, { useContext, useEffect, useState } from 'react';
import "./CSS/Join.css"
import { Context } from './Context/Context';
const JoinRoom = () => {
    const [groupID,setGroupID] = useState("");
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const {socket} = useContext(Context);
    const {setShowChat,setId} = useContext(Context);
    const join = async()=>{
        if(groupID && password && name){
            await socket?.emit("joinRoom",{groupID,password,name,joinDate:Date.now()});
            setId(groupID);
        }else alert("All field are required");
    }
    useEffect(()=>{
        socket?.on("response",data=>{
            alert(data.message);
            if(data.success) setShowChat(true);
        });
    },[socket,setShowChat]);
    const handleKeyPress = (e)=>{
        if(e.key==="Enter") join();
    }
    return (

            <div>
                <h3 className='join-title'>Join Room</h3>
                <div className="form">
                    <span>
                        <label htmlFor="gr-id">Group ID</label>
                        <input type="text" placeholder='Enter group ID'
                        value={groupID} onChange={e=>setGroupID(e.target.value)} onKeyPress={handleKeyPress}/>
                    </span>
                    <span>
                        <label htmlFor="gr-password">Group Password</label>
                        <input type="text" id="gr-password" placeholder='Enter group password'
                        value={password} onChange={e=>setPassword(e.target.value)} onKeyPress={handleKeyPress}/>
                    </span>
                    <span>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder='your name'
                        value={name} onChange={e=>setName(e.target.value)} onKeyPress={handleKeyPress}/>
                    </span>
                    <button onClick={join} className='btn-create'  onKeyPress={handleKeyPress}>Join Group</button>
                </div>
            </div>
    );
}

export default JoinRoom;
