import styled from "styled-components";
import Picker from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import {
  Autocomplete,
  Input,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material/";

export default function ChatInput({ handleSendMessage }) {
  const [showEmoji, setShowEmoji] = useState(false);
  const [msg, setMsg] = useState("");

  const handleEmojiPicker = () => {
    setShowEmoji(!showEmoji);
  };

  const handleEmojiClick = (event, emoji) => {
    console.log(emoji);
    let message = msg;
    message += emoji.emoji;
    setMsg(message);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMessage(msg);
      setMsg("");
    }
  };
  return (
    <Box
      display={"grid"}
      alignItems={"center"}
      backgroundColor="#F5F5F5"
      padding={"0 1rem"}
    >
      {/* <div className="button-container"> */}
      {/* <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPicker} />
          {showEmoji && <Picker onEmojiClick={handleEmojiClick} />}
        </div> */}
      {/* </div> */}
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <Input
          style={{
            width: "100%",
            background: "white",
            padding: 5,
            borderRadius: 5,
            border: "1.5px solid #E0E0E0",
          }}
          disableUnderline
          type="text"
          placeholder="Type a message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <Box
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {/* <button className="submit"> */}
          <IoMdSend fontSize={30} onClick={sendChat} />
          {/* </button> */}
        </Box>
      </form>
    </Box>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  ${"" /* grid-template-columns: 5% 95%; */}
  background-color: lightgrey;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  ${
    "" /* .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }
      .emoji-picker-react {
        position: absolute;
        top: -350px;
        ${"" /* background-color: #080420; */
  }
        ${"" /* box-shadow: 0 5px 10px #9a86f3; */}
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  } */}
  .input-container {
    width: 100%;
    border-radius: 2rem;
    ${"" /* display: flex; */}
    ${"" /* align-items: center; */}
    gap: 2rem;
    ${"" /* background-color: white; */}
    input {
      ${"" /* width: 90%; */}
      height: 60%;
      background-color: 'transparent';
      color: black;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      ${
        "" /* &::selection {
        background-color: #9a86f3;
      } */
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;
