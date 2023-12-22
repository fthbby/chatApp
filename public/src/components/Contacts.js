import { useState, useEffect } from "react";
import styled from "styled-components";
import TeamsLogo from "../assets/TeamsLogo.png";
import { Box } from "@mui/material";
import ContactsCard from "../pages/Chat/components/ContactsCard";

export default function Contacts({
  contacts,
  currentUser,
  handleChatChange,
  currentSelected,
  setCurrentSelected,
}) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    handleChatChange(contact);
  };

  console.log("contacts :", contacts);
  return (
    <>
      {currentUserName && (
        <Container>
          {/* <div className="brand">
            <img src={TeamsLogo} alt="logo" />
            <h3>TeamsClone</h3>
          </div> */}
          <Box
            display={"flex"}
            flexDirection={"column"}
            alignItems={"center"}
            overflow={"auto"}
            gap={"0.8rem"}
          >
            {contacts.map((contact, index) => (
              <ContactsCard
                contact={contact}
                index={index}
                changeCurrentChat={changeCurrentChat}
                currentSelected={currentSelected}
              />
            ))}
          </Box>
          {/* <div className="current-user">
            <div className="avatar">
              <img src={avatar} />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div> */}
        </Container>
      )}
    </>
  );
}

const Container = styled.div`
  display: grid;
  gird-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #f0f0f0;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 5rem;
  }

  .selected {
    background-color: purple;
  }

  .current-user {
    ${"" /* background-color: orange; */}
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin: 1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius: 50%;
      }
    }
    .username {
      h2 {
        color: red;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
