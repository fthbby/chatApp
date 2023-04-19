import React from "react";
import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { allUsersRoute } from "../utils/routes";
import { useNavigate } from "react-router-dom";

import Contacts from "../components/Contacts";
export default function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);

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
      console.log('current loged in user:', currentUser)
    }
  };

  useEffect(() => {
    checkLoggedInUser();
  }, []);

  useEffect(()=>{
    getAllContacts();
  },[currentUser])
  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser}/>
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
