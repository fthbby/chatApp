import React from 'react'
import { Avatar, Box } from "@mui/material";

function Bubble({message, currentChat, formatDate}) {
  return (
    <Box
    style={
      message.fromSelf
        ? styles.sentBubble
        : styles.receivedBubble
    }
    padding={1}
  >
    {!message.fromSelf
      ? currentChat.username + formatDate(message.createdAt)
      : formatDate(message.createdAt)}
    <Box
      pt={0.5}
      flexWrap={"wrap"}
      backgroundColor="red"
      sx={{ wordWrap: "break-word" }}
    >
      {message.message}
    </Box>
  </Box>  )
}

export default Bubble


const styles = {
    sended: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
    },
    received: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  
    sentBubble: {
      borderRadius: 5,
      backgroundColor: "#e5e5f1",
    },
  
    receivedBubble: {
      borderRadius: 5,
      backgroundColor: "white",
    },
  };