import React from 'react'
import { Box, Grid } from "@mui/material";
import avatar from '../../../assets/avatar.jpg'


function ContactsCard({contact, index, changeCurrentChat, currentSelected}) {
  return (
    <Box
    minHeight={"5rem"}
    width={"90%"}
    cursor={"pointer"}
    borderRadius={"0.2rem"}
    padding={"0.4rem"}
    gap={"1rem"}
    alignItems={"center"}
    display={"flex"}
    transition={"0.5s ease-in-out"}
    key={contact._id}
    className={`${index === currentSelected ? "selected" : ""}`}
    onClick={() => changeCurrentChat(index, contact)}
  >
    <Box>
      <Box
        component={"img"}
        src={avatar}
        borderRadius={"50%"}
        height={"3rem"}
      />
    </Box>

    <Box>
      <h3>{contact.username}</h3>
    </Box>
  </Box>  )
}

export default ContactsCard