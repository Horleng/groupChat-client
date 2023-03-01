import { useState } from "react";
import HomePage from "./HomePage";
import Members from "./Members";
import {Route,Routes} from "react-router-dom";
import  {Context} from "./Context/Context"
function App() {
  const [socket,setSocket] = useState(null);
  const [id,setId] = useState("");
  const [showChat,setShowChat] = useState(false);
  const [groupInformation,setGroupInformation] = useState(null);
  return (
    <>
      <Context.Provider value={{id,setId,socket,setSocket,showChat,setShowChat,groupInformation,setGroupInformation}}>
        <Routes>
          <Route  path="/" element={<HomePage />}/>
          <Route  path="/members" element={<Members/>}  />
        </Routes>
      </Context.Provider>
    </>
  );
}

export default App;
