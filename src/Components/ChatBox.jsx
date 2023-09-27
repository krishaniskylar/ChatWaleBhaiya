import React, { useEffect, useRef, useState } from "react";
import styles from "./chatbox.module.css";
import hello from "../assets/hello.png";
import sendchat from "../assets/sendchat.png";
import attachment from "../assets/attachment.png";

function ChatBox() {
  const fileInputRef = useRef(null);
  const [groupId, setGroupId] = useState(""); // The group ID of the chat
  const [userName, setUserName] = useState("Wasley Langworth");
  const [profileImage, setProfileImage] = useState(hello);
  const [message, setMessage] = useState(null);
  const [messageHistory, setMessageHistory] = useState([
    { message: "Hello!", type: "received" },
    { message: "Hi there!", type: "sent" },
  ]);



  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setMessage(file.name);
  };

  const handleSend = () => {
    if (message) {
      // Add the sent message to the message history
      setMessageHistory([...messageHistory, { message, type: "sent" }]);
      setMessage("");
    }
  };

  const handleMessageInputChange = (event) => {
    setMessage(event.target.value);
  };

  // useEffect(() => {
  //   if(message)
  //   setMessageHistory([...messageHistory, { message, type: "received" }]);
  // }, [ message]);

  useEffect(() => {
    // Scroll to the bottom of the chat history on every update
    const chatContainer = document.querySelector(`.${styles.chatContainer}`);
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messageHistory]);

  return (
    <div className={styles.chatbox}>
      <div className={styles.chatNav}>
        <img className={styles.chatNavImage} src={profileImage} alt="User" />
        <p className={styles.chatNavText}>{userName}</p>
      </div>
      <div className={styles.chatContainer}>
      <div className={styles.messageContainer}>
        {messageHistory.map((item, index) => (
          <div
            key={index}
            className={item.type === "sent" ? styles.sentMessage : styles.receivedMessage}
          >
            {item.message}
            
          </div>
        ))}
      </div>
      </div>
      <div className={styles.messageInput}>
        <input
          className={styles.messageTextField}
          type="text"
          placeholder="Message..."
          value={message}
          onChange={handleMessageInputChange}
          onKeyUpCapture={(event) => {
            if(event.key === "Enter"){
              if(event.target.value.trim() === ""){
                return
              }
              handleSend()
            }
          }}
        />
        <div className={styles.messageActions}>
          <input
            type="file"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileInputChange}
          />
          <img
            className={styles.attachmentIcon}
            src={attachment}
            onClick={openFileInput}
            alt="Attachment"
          />
          <img
            className={styles.sendIcon}
            src={sendchat}
            onClick={
              () => {
                if(message.trim() === ""){
                  return
                }
                handleSend()
              }}
            alt="Send"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
