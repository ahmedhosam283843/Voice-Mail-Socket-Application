import React,{useState, useEffect} from "react";
import Topbar from "./mailbox/Topbar";
import Sidebar from "./mailbox/Sidebar";
import MailDetails from './mailbox/MailDetails'
import getSocket from "./socket";
import './mailbox.css'


const Mailbox = () => {

  const [currentEmailId, setCurrentEmailId] = useState(0);
  const [emails, setEmails] = useState([]);
    
  useEffect(()=>{
    const socket = getSocket(localStorage.getItem("token"));
    // get mails list
    socket.emit("getMails");

    socket.on("mailReceived", (message) => {
      //log list length
      console.log("Received mails Count:", message.mails_list.length);
      setEmails(message.mails_list);
    });
  },[])
  
  return <>
  <div className="mailbox-Container">
    <Topbar />
    <div className="mainScreen">

      <Sidebar emails={emails} currentEmailId={currentEmailId} setCurrentEmailId={setCurrentEmailId}/>
      <MailDetails emails={emails} currentEmailId={currentEmailId} />
    </div>

  </div>
  </>;
};

export default Mailbox;
