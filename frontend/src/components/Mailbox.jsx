import React,{useState, useEffect} from "react";
import Topbar from "./mailbox/Topbar";
import Sidebar from "./mailbox/Sidebar";
import MailDetails from './mailbox/MailDetails'
import getSocket from "./socket";
import './mailbox.css'


const Mailbox = () => {

  const [currentEmailId, setCurrentEmailId] = useState(0);
  const [emails, setEmails] = useState([
    {
      "id":0,
      "from": "Maxime Preaux",
      "address": "maxime@codepen.io",
      "time": "2016-10-07 15:35:14",
      "message": "Audio File",
      "subject": "Messing with React.js",
      "tag": "inbox",
      "read": "false",
      "content": <audio src='https://www.w3schools.com/html/horse.mp3' controls />
    },
    {
      "id":1,
      "from": "Dribbble",
      "address": "digest@dribbble.com",
      "time": "2016-05-09 14:23:54",
      "message": "Audio File",
      "subject": "Dribbble Digest",
      "tag": "inbox",
      "read": "false",
      "content": <audio src='https://www.w3schools.com/html/horse.mp3' controls />
    }
  ]);
  

  useEffect(()=>{
    const socket = getSocket(localStorage.getItem("token"));
    // get mails list
    socket.emit("getMails");

    socket.on("mailReceived", (message) => {
      //log list length
      console.log("Received mails Count:", message.mails_list.length);
      // Handle received mails
      // Example: Update UI to display received mails
      setEmails(message.mails_list);
    });
  },[])
  
  return <>
  <div className="mailbox-Container">
    <Topbar />
    <div className="mainScreen">

      <Sidebar emails={emails} setEmails={setEmails} currentEmailId={currentEmailId} setCurrentEmailId={setCurrentEmailId}/>
      <MailDetails emails={emails} currentEmailId={currentEmailId}/>
    </div>

  </div>
  </>;
};

export default Mailbox;
