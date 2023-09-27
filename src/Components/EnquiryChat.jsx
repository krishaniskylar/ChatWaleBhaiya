import React, { useState,useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./EnquiryChat.module.css";
import backspace from "../assets/backspace (1).png";
import chatbanner from "../assets/chatbanner.png";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";
import photo from "../assets/hello.png";

const chatData = [
  {
    photo,
    name: "User 1",
    chatGroups:[
      {
        photo,
        name: "Devanshu Techanician",
      },
      {
        photo,
        name: "Devanshu Plumber",
      },
      {
        photo,
        name: "Devanshu Plumber",
      },
    ],
  },
  {
    photo,
    name: "User 6",
    chatGroups:[
      {
        photo,
        name: "User 1",
      },
      {
        photo,
        name: "User 2",
      },
    ],
  },
  {
    photo,
    name: "User 1",
    chatGroups:[
      {
        photo,
        name: "User 1",
      },
      {
        photo,
        name: "User 2",
      },
    ],
  },
  {
    photo,
    name: "User 1",
    chatGroups:[
      {
        photo,
        name: "User 1",
      },
      {
        photo,
        name: "User 2",
      },
    ],
  },
  {
    photo,
    name: "User 1",
    chatGroups:[
      {
        photo,
        name: "User 1",
      },
      {
        photo,
        name: "User 2",
      },
    ],
  },
];

const EnquiryChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [enquery, setEnquery] = useState(true);
  const [suplier, setSuplier] = useState(false);
  const [search, setSearch] = useState("");
  const [chatList, setChatList] = useState(chatData);
  const [filteredChatList, setFilteredChatList] = useState(chatData);
  const [selectedListItem, setSelectedListItem] = useState(null);
  const navigate = useNavigate();

  const handleChatButtonClick = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleEnquery = () => {
    setEnquery(true);
    setSuplier(false);
    setSelectedListItem(null);
  };

  const handleSuplier = () => {
    setEnquery(false);
    setSuplier(true);
    setSelectedListItem(null);
  };

  const handleListItemClick = (index) => {
    setSelectedListItem(index);
    
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (search) {
      setFilteredChatList(
        chatList.filter((item) => {
          return item.name.toLowerCase().includes(search.toLowerCase());
        })
      );
    } else {
      setFilteredChatList(chatList);
    }
  }, [search]);
   

  return (
    <>
      {/* <Navbar /> */}
      <div className={styles.Paymentmaindiv1}>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.requestBackHead}>
              <img style={{ marginRight: "1rem" }} src={backspace} onClick={() => navigate(-1)} />
              <button className={styles.chatEnquiryBtn} onClick={handleEnquery}>
                Enquiry
              </button>
            </div>
            <input className={styles.searchbox} type="text" placeholder="Search here..." value={search} onChange={handleSearch}/>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginTop: "3rem",
                cursor: "pointer",
                overflowY: "auto",
                height: "25vmax",
              }}
              // className={styles.chatList}
            >
              {filteredChatList.length === 0 ?<div style={{textAlign:'center',marginTop:'5vmax'}}>No Enquiry Found with <span style={{fontWeight:500}}>{search}</span> Name</div>:
              filteredChatList.map((item, index) => (
                    <Accordion
                      key={index}
                      expanded={selectedListItem === index}
                      onChange={() => {
                        if (selectedListItem === index) {
                          setSelectedListItem(null);
                        } else {
                          handleListItemClick(index);
                        }
                      }}
                      
                    >
                      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <img id={styles.chatimg} src={item.photo} alt="User" />
                          <Typography>{item.name}</Typography>
                        </div>
                      </AccordionSummary>
                      <AccordionDetails>
                        <div className={styles.chatText}>
                          {item.chatGroups.map((item, index) => (
                                
                                 <div style={{ display: "flex", alignItems: "center",justifyContent:'space-between',padding:'5px',margin:'1vmax 0vmax',backgroundColor:'rgba(180,180,180,0.1)',borderRadius:'.5vmax'}} onClick={()=>{
                                  handleChatButtonClick()
                                 }}>
                                  <img style={{height:'2vmax'}} src={item.photo} alt="User" />
                                  <Typography>{item.name}</Typography>
                                </div>
                               
                          ))}
                        </div>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                
            </div>
          </div>
          <br />
          <div className={styles.verticalLine}></div>
          <div className={styles.chatBanner}>
            {isChatOpen ? (
              <div>
                <ChatBox />
              </div>
            ) : (
              <img style={{marginLeft:'10vmax', height: "23vmax" }} src={chatbanner} alt="Chat Banner" />
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default EnquiryChat;