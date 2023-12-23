import React from "react";
import { Avatar, Box, Divider, Typography } from "@mui/material";

function OtherUserHeader({ currentChat }) {
  return (
    <Box
      display={"flex"}
      alignItems={"center"}
      padding={"2rem 1rem"}
      borderBottom={"1px solid #ABAAAA"}
    >
      <Avatar sx={{ mr: 2 }} />
      <Typography fontWeight={600}>{currentChat?.username}</Typography>
      {/* <div className="user-details">
      <div className="avatar">
        <img src={avatar} alt="" />
      </div>
      <div className="username">
        <h3>{currentChat?.username}</h3>
      </div>
    </div>
    <Logout /> */}
    </Box>
  );
}

export default OtherUserHeader;
