import React, { useEffect, useRef, useState } from "react";
import styles from "./chatbox.module.css";
import hello from "../assets/hello.png";
import sendchat from "../assets/sendchat.png";
import attachment from "../assets/attachment.png";
import placeholderPic from "../assets/ProfilePlaceholder.png";
import axios from "axios";
import { io } from "socket.io-client";

let socket;

function ChatBox(props) {
  const fileInputRef = useRef(null);
  const [groupId, setGroupId] = useState(""); // The group ID of the chat
  const [userName, setUserName] = useState("Wasley Langworth");
  const [profileImage, setProfileImage] = useState(hello);
  const [message, setMessage] = useState(null);
  const chat = props.chat;
  // const [messageHistory, setMessageHistory] = useState([
  // { message: "Hello!", type: "received" },
  // { message: "Hi there!", type: "sent" },
  // ]);
  const [messageHistory, setMessageHistory] = useState(null);

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setMessage(file.name);
  };

  const handleSend = async () => {
    if (message) {
      const res = await axios.post(
        `http://localhost:5000/api/qliqfix/send/message/${chat?._id}`,
        {
          message: message,
          sender: "651573c2f25adfa2f481d21e",
        }
      );
      // Add the sent message to the message history
      setMessageHistory([...messageHistory, { message, type: "sent" }]);
      setMessage("");

      // Send the message to the server
      socket.emit("send-message", {
        chatId: chat?._id,
        message,
      });
    }
  };

  const handleMessageInputChange = (event) => {
    setMessage(event.target.value);
  };

  const fatchMessage = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/qliqfix/get/messages/${chat?._id}`
    );
    console.log(res.data);
    setMessageHistory(res.data.messages);
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

  useEffect(() => {
    socket = io("http://localhost:5000");
    console.log(socket);
    socket.on("connection", () => {
      console.log("socket connected", socket);
    });
  }, []);

  useEffect(() => {
    fatchMessage();
  }, [message]);

  return (
    <div className={styles.chatbox}>
      <div className={styles.chatNav}>
        <img
          className={styles.chatNavImage}
          src={chat?.profile ? chat?.profile : placeholderPic}
          alt="User"
        />
        <p className={styles.chatNavText}>{chat?.username}</p>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.messageContainer}>
          {messageHistory?.length === 0 || messageHistory === null ? (
            <div>No messages yet</div>
          ) : (
            messageHistory.map((item, index) => (
              <div
                key={index}
                className={ item.sender === chat.users[1]? styles.sentMessage : styles.receivedMessage }
              >                
                {item?.message}
              </div>
            ))
          )}
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
            if (event.key === "Enter") {
              if (event.target.value.trim() === "") {
                return;
              }
              handleSend();
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
            onClick={() => {
              if (message.trim() === "") {
                return;
              }
              handleSend();
            }}
            alt="Send"
          />
        </div>
      </div>
    </div>
  );
}

export default ChatBox;
