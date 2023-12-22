import styled from "styled-components";
import Logout from "./Logout";
import avatar from "../assets/avatar.jpg";
import TeamsLogo from "../assets/TeamsLogo.png";
import {
  Autocomplete,
  Input,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material/";
import ProfileDropDown from "../components/ProfileDropDown";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
export default function Header({ currentChat, currentUser, contacts }) {
  const [focus, setFocus] = useState(false);

  console.log("contacts :", contacts);

  const [selectedValue, setSelectedValue] = useState(null);

  // Assuming 'contacts' is an array of options for autocomplete

  const handleChange = (event, value) => {
    setSelectedValue(value);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
              height: "5rem",
            }}
          >
            <img src={TeamsLogo} alt="logo" />
            <h4>Teams</h4>
          </Box>
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

        {/* <Autocomplete
          options={contacts}
          getOptionLabel={(option) => option.username}
          renderInput={(params) => (
            <TextField
         
              {...params}
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
          )}
        /> */}

        {/* <Autocomplete
        options={contacts}
        getOptionLabel={(option) => option.username}
        getOptionSelected={(option, value) => option._id === value._id}

        value={selectedValue}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label={focus ? 'Search for people and chats' : 'Search'}
            variant="outlined"
            // fullWidth
            InputLabelProps={{
              shrink: true,
              style: {
                fontWeight: 'bold',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  {!focus && <SearchIcon />}
                </InputAdornment>
              ),
              classes: {
                root: focus ? 'focusInput' : 'input',
              },
              disableUnderline: true,
            }}
          />
        )}
      /> */}
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
