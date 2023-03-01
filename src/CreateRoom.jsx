import React, { useContext, useEffect, useState } from 'react';
import './CSS/Create.css';
import {AiFillCopy} from "react-icons/ai";
import { Context } from './Context/Context';
const CreateRoom = () => {
    const [groupName,setGroupName] = useState("");
    const [groupID,setGroupID] = useState("");
    const {socket} = useContext(Context);
    const [password,setPassword] = useState("");
    const [name,setName] = useState("");
    const {setShowChat,setId} = useContext(Context);
    const copyID = async()=>{
        let idCopier = document.getElementById('gr-id').value;
        await navigator.clipboard.writeText(idCopier);
        alert("you're copied!");
    }
    const makeRoom = async()=>{
        if(groupID && groupName && password && name){
            await socket?.emit("createRoom",{groupName,groupID,password,name});
            setShowChat(true);
            setId(groupID);
        }
        else alert("All are required!");
    }
    useEffect(()=>{
        let guid = () => {
            let s4 = () => {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4()+ '-' + s4();
        }
        setGroupID((guid));
    },[]);
    return (
        <div className='create-co'>
                <div className='form'>
                    <h3>Creating Room</h3>
                    <span>
                        <label htmlFor="gr-name">Group Name</label>
                        <input type="text" id='gr-name' placeholder="Enter your group's name?"
                        value={groupName} onChange={e=>setGroupName(e.target.value)}/>
                    </span>
                    <span>
                            <label htmlFor="gr-pass">Group Password</label>
                            <input type="text" id='gr-pass' placeholder="Enter your group's password?"
                            value={password} onChange={e=>setPassword(e.target.value)}/>
                    </span>
                    <span>
                            <label htmlFor="gr-pass">Your Name</label>
                            <input type="text" id='gr-pass' placeholder="Enter your name?"
                            value={name} onChange={e=>setName(e.target.value)}/>
                    </span>
                    <span>
                        <label htmlFor="gr-id">Group ID</label>
                        <input type="text" id='gr-id' value={groupID} disabled/>
                        <AiFillCopy onClick={copyID} size="25px" className="copy-icon"/>
                    </span>
                    <button className='btn-create' onClick={makeRoom}>Create</button>
                </div>
        </div>
    );
}

export default CreateRoom;
