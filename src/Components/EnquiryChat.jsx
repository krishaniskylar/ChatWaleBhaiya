import React, { useState, useEffect } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./EnquiryChat.module.css";
import backspace from "../assets/backspace (1).png";
import chatbanner from "../assets/chatbanner.png";
import ChatBox from "./ChatBox";
import { useNavigate } from "react-router-dom";
import photo from "../assets/hello.png";
import { io } from "socket.io-client";
import axios from "axios";

let socket;

const chatData = [
  {
    photo,
    name: "User 1",
    chatGroups: [
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
    chatGroups: [
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
    chatGroups: [
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
    chatGroups: [
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
    chatGroups: [
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
  const [data, setData] = useState([])
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
    await axios.put('http://localhost:5000/api/qliqfix/update/providerID/64fffacd3b8fe594941536f7', {
      providerid: '650193dccfc31239f4538fa3'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    socket?.emit('id', { id: '650193dccfc31239f4538fa3', name: "paras" })
    console.log("successful")
  }

  const handleClickFetch = async () => {
    const res = await axios.get('http://localhost:5000/api/qliqfix/get/AllSuppliers/651573c2f25adfa2f481d21e');
    setData(res.data?.getsuppliers);
  }

  useEffect(() => {
    handleClickFetch()
  }, [])
  console.log(data)

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

      <form onSubmit={handleClick1}>
        <input type="text" />
        <br />
        <button>send enquery</button>
      </form>
      <br />
      <div className={styles.Paymentmaindiv1}>
        <button onClick={handleClick}>click me</button>
        <button onClick={handleClickAccept}>accept</button>
        <div style={{ display: "flex" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className={styles.requestBackHead}>
              <img style={{ marginRight: "1rem" }} src={backspace} onClick={() => navigate(-1)} />
              <button className={styles.chatEnquiryBtn} onClick={handleEnquery}>
                Enquiry
              </button>
            </div>
            <input className={styles.searchbox} type="text" placeholder="Search here..." value={search} onChange={handleSearch} />

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
              {filteredChatList.length === 0 ? <div style={{ textAlign: 'center', marginTop: '5vmax' }}>No Enquiry Found with <span style={{ fontWeight: 500 }}>{search}</span> Name</div> :
                data?.map((item, index) => (
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
                        <img id={item.profile} src={item.photo} alt="User" />
                        <Typography>{item.username}</Typography>
                      </div>
                    </AccordionSummary>
                    <AccordionDetails>
                      {/* <div className={styles.chatText}>
                        {item.chatGroups.map((item, index) => (

                          <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between', padding: '5px', margin: '1vmax 0vmax', backgroundColor: 'rgba(180,180,180,0.1)', borderRadius: '.5vmax' }} onClick={() => {
                            handleChatButtonClick()
                          }}>
                            <img style={{ height: '2vmax' }} src={item.photo} alt="User" />
                            <Typography>{item.name}</Typography>
                          </div>

                        ))}
                      </div> */}
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
              <img style={{ marginLeft: '10vmax', height: "23vmax" }} src={chatbanner} alt="Chat Banner" />
            )}
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default EnquiryChat;
