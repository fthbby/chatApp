import styled from "styled-components";
import Logout from "./Logout";
import avatar from "../assets/avatar.jpg";
import TeamsLogo from "../assets/TeamsLogo.png";
import {
  Button,
  Menu,
  MenuItem,
  Input,
  TextField,
  InputAdornment,
  InputBase,
} from "@mui/material/";
import ProfileDropDown from "../components/ProfileDropDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
export default function Header({ currentChat, currentUser }) {
  const [focus, setFocus] = useState(false);

//   useEffect(() => {
//     console.log("focus :", focus);
//   }, [focus, Input]);
  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="brand">
            <img src={TeamsLogo} alt="logo" />
            <h4>TeamsClone</h4>
          </div>

          {/* <div className="username">
            <h3>{currentChat?.username}</h3>
          </div> */}
        </div>
        <Input
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          disableUnderline
          placeholder={focus ? "Search for people and chats" : "Search"}
          className={focus ? "focusInput" : "input"}
          startAdornment={
            <InputAdornment position="start">
              {!focus && <SearchIcon />}
            </InputAdornment>
          }
        />

        <div className="avatar">
          <ProfileDropDown currentUser={currentUser} />
        </div>
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
    .input {
      border: 1px solid #e6e9eb;
      height: 40px;
      width: 400px;
      border-radius: 5px;
      padding-top: 12px;
      padding-bottom: 12px;
      padding-right: 16px;
      padding-left: 16px;
      background-color: #dadae9;
    }
    .focusInput {
      border: 1px solid #e6e9eb;
      height: 40px;
      width: 400px;
      border-radius: 5px;
      padding-top: 12px;
      padding-bottom: 12px;
      padding-right: 16px;
      padding-left: 16px;
      background-color: white;
    }
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
