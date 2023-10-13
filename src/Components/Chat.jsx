import React, { useState,useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./chat.module.css";
import backspace from "../assets/backspace (1).png";
import chatbanner from "../assets/chatbanner.png";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";
import photo from "../assets/hello.png";
import { io } from "socket.io-client";
import axios from "axios";
import placeholderPic from '../assets/ProfilePlaceholder.png'

let socket;

const chatData = [
  {
    photo,
    name: "User 1",
  },
  {
    photo,
    name: "User 6",
  },
  {
    photo,
    name: "User 1",
 },
  {
    photo,
    name: "User 1",
  },
  {
    photo,
    name: "User 1",
  },
  
];

const Chat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [enquery, setEnquery] = useState(true);
  const [suplier, setSuplier] = useState(false);
  const [search, setSearch] = useState("");
  const [chatList, setChatList] = useState(null);
  const [filteredChatList, setFilteredChatList] = useState(null);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const [data, setData] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    socket = io("http://localhost:5000");
    console.log(socket);
    socket.on("connection", () => {
      console.log("socket connected", socket);
    });
  }, []);

  const handleClick1 = async (e) => {


    e.preventDefault()
    try {
      await axios.post('http://localhost:5000/api/qliqfix/send/EnqueryTo/Salesmans', {
        comment: 'need brushes',
        latitude: '26.85683',
        longitude: '75.80085'
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.log(error)
    }
    socket?.emit('send-rqst', {
      comment: 'need hammer',
      userid: '64a64887707c8d60c7bf7c6c'
    })
  }
  const handleClick = async () => {
    await axios.put('http://localhost:5000/api/qliqStore/update/enqueryAcceptOrReject/64cb6998373daa185f0bab7e', {
      providerid: '650193dccfc31239f4538fa3'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    socket?.emit('id', { id: '650193dccfc31239f4538fa3', name: "paras" })
  }

  const handleClickAccept = async () => {
    const res = await axios.put('http://localhost:5000/api/qliqfix/update/providerID/64fffacd3b8fe594941536f7', {
      providerid: '650193dccfc31239f4538fa3'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if(res.status === 200){
      response = await axios.post(`http://localhost:5000/api/qliqfix/send/message/${res?.data?.chatCreated?._id}`, {
        message: "your request has been accepted",
        sender: "650193dccfc31239f4538fa3",
      });
    }
    socket?.emit('id', { id: '650193dccfc31239f4538fa3', name: "paras" })
    console.log("successful")
  }

  // const handleClickFetch = async () => {
  //   const res = await axios.get('http://localhost:5000/api/qliqfix/get/AllSuppliers/651573c2f25adfa2f481d21e');
  //   setData(res.data?.getsuppliers);
  //   setChatList(res.data?.getsuppliers);
  //   setFilteredChatList(res.data?.getsuppliers);
  //   console.log(res.data?.getsuppliers);
  // }

  const handleClickFetch = async () => {
    const res = await axios.get('http://localhost:5000/api/qliqfix/get/chats/651573c2f25adfa2f481d21e');
    setData(res.data.chatswithUserInfo);
    setChatList(res.data.chatswithUserInfo);
    setFilteredChatList(res.data.chatswithUserInfo);
    // console.log(res.data.chatswithUserInfo);
  }

  console.log(selectedListItem);

  useEffect(() => {
    handleClickFetch()
  }, [])
  // console.log(data)

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };


  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      setFilteredChatList(
        data?.filter((item) => {
          return item?.username.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      setFilteredChatList(chatList);
    }
  }, [search]);
   

  return (
    <>
    <form onSubmit={handleClick1}>
        <input type="text" />
        <br />
        <button>send enquery</button>
      </form>
      <br />
      <div className={styles.Paymentmaindiv1}>
        <button onClick={handleClick}>click me</button>
        <button onClick={handleClickAccept}>accept</button>
      </div>
      <div className={styles.Paymentmaindiv1}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.requestBackHead}>
              <img style={{ marginRight: "1rem" }} src={backspace} onClick={() => navigate(-1)} />
              <button className={styles.chatEnquiryBtn} >
                Chats
              </button>
            </div>
            <input className={styles.searchbox} type="text" placeholder="Search here..." value={search} onChange={handleSearch}/>

            <div key={selectedListItem}
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "1rem",
                cursor: "pointer",
                overflowY: "auto",
                height: "30vmax",
              }}
              // className={styles.chatList}
            >
              {filteredChatList?.length === 0 ?<div style={{textAlign:'center',marginTop:'5vmax'}}>No Enquiry Found with <span style={{fontWeight:500}}>{search}</span> Name</div>:
              filteredChatList?.map((item, index) => (
                        <div className={styles.chatText}>
                                 <div style={{ display: "flex", alignItems: "center",justifyContent:'flex-start',gap:'2vmax',padding:'5px',margin:'.5vmax 0vmax',backgroundColor:'rgba(180,180,180,0.1)',borderRadius:'.5vmax'}} onClick={()=>{
                                  handleChatButtonClick()
                                  selectedListItem === index ? setSelectedListItem(null) : setSelectedListItem(item)
                                 }}>
                                  <img style={{height:'3vmax',width:'3vmax',borderRadius:'3vmax',objectFit:'cover'}} src={item.profile != null? item.profile:placeholderPic} alt="User" />
                                  <Typography>{item.username}</Typography>
                                </div>
                        </div>
                  ))}
                
            </div>
          </div>
          <br />
          <div className={styles.verticalLine}></div>
          <div className={styles.chatBanner}>
            {isChatOpen ? (
              <div>
                <ChatBox chat={selectedListItem} />
              </div>
            ) : (
              <img style={{marginLeft:'10vmax', height: "23vmax" }} src={chatbanner} alt="Chat Banner" />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
