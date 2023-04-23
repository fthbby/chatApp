import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { allUsersRoute, host } from "../api/routes";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import { io } from "socket.io-client";
import Header from "../components/Header";

export default function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);

  const [isLoaded, setIsLoaded] = useState(false);
  const getAllContacts = async () => {
    try {
      if (currentUser) {
        let res = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        console.log("get all users res :", res.data);
        setContacts(res.data);
      } else console.log("no current user so cant pull contacts");
    } catch (err) {}
  };

  const checkLoggedInUser = async () => {
    if (!localStorage.getItem("chat-app-user")) {
      console.log("no logged in user");
      navigate("/login");
    } else {
      setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      setIsLoaded(true);
      console.log("current loged in user:", currentUser);
    }
  };

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  useEffect(() => {
    getAllContacts();
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Container>
        <div className="container">
          <Header currentChat={currentChat} 
            currentUser={currentUser}
          />

          <div className="contactsandchat">
            <Contacts
              contacts={contacts}
              currentUser={currentUser}
              changeChat={handleChatChange}
            />

            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
              />
            )}
          </div>
        </div>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  weight: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${'' /* background-color: #5558ae; */}
  background-color:grey;
  .container {
    ${'' /* height: 85vh; */}
    ${'' /* width: 85vh; */}
    background-color:white;
  }

  .contactsandchat {
    display: grid;
    grid-template-columns: 30% 70%;
    height: 85vh;
    width: 85vh;

  }
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-columns: 35% 65%;
  }
`;
