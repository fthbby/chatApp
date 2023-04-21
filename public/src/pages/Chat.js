import axios from "axios";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { allUsersRoute, host } from "../api/routes";
import { useNavigate } from "react-router-dom";
import Welcome from "../components/Welcome";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import {io} from 'socket.io-client'

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

useEffect(()=>{
  if(currentUser){
    socket.current = io(host);
    socket.current.emit("add-user", currentUser._id);
  }
},[])

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
          <Contacts
            contacts={contacts}
            currentUser={currentUser}
            changeChat={handleChatChange}
          />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
             />
          )}
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
background-color: #5558ae;
.container {
height: 85vh;
width: 85vh;
display:grid;
background-color:white;
grid-template-columns: 25% 75%;

@media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }


`;
