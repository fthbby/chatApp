import { useState, useEffect } from "react";
import styled from "styled-components";
import TeamsLogo from "../assets/TeamsLogo.png";
import avatar from "../assets/avatar.jpg";
export default function Contacts({ contacts, currentUser }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {};

  console.log("contacts :", contacts);
  return (
    <>
      {currentUserName && (
        <Container>
          <div className="brand">
            <img src={TeamsLogo} alt="logo" />
            <h3>TeamsClone</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="avatar">
                  <img src={avatar} />
                </div>

                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}

            {contacts.map((contact, index) => (
              <div
                className={`contact ${
                  index === currentSelected ? "selected" : ""
                }`}
                key={index}
              >
                <div className="avatar">
                  <img src={avatar} />
                </div>

                <div className="username">
                  <h3>{contact.username}</h3>
                </div>
              </div>
            ))}    
            
          </div>
          <div className="current-user">
            <div className="avatar">
              <img src={avatar} />
            </div>
            <div className="username">
              <h2>{currentUser.username}</h2>
            </div>
          </div>
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
  }
  img {
    height: 2rem;
  }
  h3 {
    color: black;
    text-transform: uppercase;
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
    gap: 0.8rem;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .contact {
      background-color: white;
      min-height: 5rem;
      width: 90%;
      cursor: pointer;
      border-raidus: 0.2rem;
      padding: 0.4rem;
      gap: 1rem;
      align-items: center;
      display: flex;
      transition: 0.5s ease-in-out;
      .avatar {
        img {
          height: 3rem;
          border-radius:50%

        }
      }
    }

    .username {
      h3 {
        color: black;
        ${"" /* background-color: */}
      }
    }
    .selected {
      background-color: purple;
    }
  }

  .current-user {
    ${'' /* background-color: orange; */}
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin:1rem;
    .avatar {
      img {
        height: 4rem;
        max-inline-size: 100%;
        border-radius:50%
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
