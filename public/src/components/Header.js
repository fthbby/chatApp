import styled from "styled-components";
import Logout from "./Logout";
import avatar from "../assets/avatar.jpg";
import TeamsLogo from "../assets/TeamsLogo.png";
import {Button, Menu, MenuItem} from '@mui/material/';
import ProfileDropDown from '../components/ProfileDropDown'

export default function Header({ currentChat, currentUser }) {
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="brand">
            <img src={TeamsLogo} alt="logo" />
            <h4>TeamsClone</h4>
          </div>

          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>


        <div className="avatar">
        <ProfileDropDown currentUser={currentUser}/>
        </div>
        {/* <Logout /> */}
      </div>
    </Container>
  );
}

const Container = styled.div`
  background-color: #5558ae;
  width: 100%;
  .brand {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    height: 5rem;
  }
  img {
    height: 2rem;
  }
  h4 {
    color: black;
    text-transform: uppercase;
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
   
      .username {
        h3 {
          color: pink;
        }
      }
    }
  }
`;
