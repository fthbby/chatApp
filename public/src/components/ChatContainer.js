import styled from "styled-components";
import avatar from "../assets/avatar.jpg";
import Logout from "./Logout";
import ChatInput from "./ChatInput";
import axios from "axios";
import { getAllMessageRoute, sendMessageRoute } from "../api/routes";
import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

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
      <Container>
        <div className="chat-header">
        {/* <div className="user-details">
            <div className="avatar">
              <img src={avatar} alt="" />
            </div>
            <div className="username">
              <h3>{currentChat?.username}</h3>
            </div>
          </div>
          <Logout /> */}
        </div>
        <div className="chat-messages">
          {messages.map((message, index) => {
            return (
              <div ref={scrollRef} key={uuidv4}>
                <div
                  className={`message ${
                    message.fromSelf ? "sended" : "received"
                  }`}
                >
                  <div className="content">
                    <p>{message.message}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <ChatInput handleSendMessage={handleSendMessage} />
      </Container>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 0% 90% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 0% 85% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: pink;
        }
      }
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
    .message {
      display: flex;
      align-items: center;
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
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: purple;
      }
    }
    .received {
      justify-content: flex-start;
      .content {
        background-color: grey;
      }
    }
  }
`;
