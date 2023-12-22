import styled from "styled-components";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { Avatar, Box, Divider, Typography } from "@mui/material";
import OtherUserHeader from "../pages/Chat/components/OtherUserHeader";
import { getAllMessageRoute, sendMessageRoute } from "../api/routes";
import ChatInput from "./ChatInput";

export default function ChatContainer({ currentChat, currentUser, socket }) {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  const scrollRef = useRef();

  const handleSendMessage = async (msg) => {
    try {
      let res = await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
      console.log("res :", res);
      socket.current.emit("send-msg", {
        to: currentChat._id,
        from: currentUser._id,
        msg,
      });
      console.log("socket", socket);

      const msgs = [...messages];
      msgs.push({ fromSelf: true, message: msg });
      setMessages(msgs);
      console.log("send res :", res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getAllMessages = async () => {
    if (currentChat) {
      let res = await axios.post(getAllMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
      });

      setMessages(res.data);
      console.log("dataaa :", res.data);
    }
  };

  useEffect(() => {
    if (currentChat) {
      getAllMessages();
    }
  }, [currentChat]);

  return (
    <>
      <Box display={"grid"} gridTemplateRows={"10% 75% 15%"} overflow={'hidden'}>
        <OtherUserHeader currentChat={currentChat} />
        <Box
          padding={"2rem 2rem"}
          display="flex"
          flexDirection={"column"}
          gap={"1rem"}
          overflow={"auto"}
        >
          {messages.map((message, index) => {
            return (
              <Box
                ref={scrollRef}
                key={uuidv4}
                display={!message.fromSelf && "flex"}
                flexDirection={!message.fromSelf && "row"}
                alignItems={"center"}
              >
                {!message.fromSelf && <Avatar sx={{ marginRight: 2 }} />}
                <Box style={message.fromSelf ? styles.sended : styles.received}>
                  <Box
                    style={
                      message.fromSelf
                        ? styles.sentBubble
                        : styles.receivedBubble
                    }
                    padding={1}
                  >
                    {!message.fromSelf ? currentChat.username + "11/2" : "11/2"}
                    <Box pt={0.5}>{message.message}</Box>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
        <ChatInput handleSendMessage={handleSendMessage} />
      </Box>
    </>
  );
}

const styles = {
  sended: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  received: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  sentBubble: {
    borderRadius: 5,
    backgroundColor: "#e5e5f1",
  },

  receivedBubble: {
    borderRadius: 5,
    backgroundColor: "white",
  },
};

const Container = styled.div`
  ${'' /* display: grid;
  grid-template-rows: 0% 90% 10%;
  gap: 0.1rem;
  overflow: hidden; */}
  ${'' /* @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 0% 85% 15%;
  } */}

  .content {
    max-width: 40%;
    overflow-wrap: break-word;
    padding: 1rem;
    font-size: 1.1rem;
    border-radius: 1rem;
    color: #d1d1d1;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      max-width: 70%;
    }
  }

  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;

    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: red;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
  }
`;
