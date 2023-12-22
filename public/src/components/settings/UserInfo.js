import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid, Avatar } from "@mui/material";

function UserInfo() {
  const [user, setUser] = useState("");

  useEffect(() => {
    let parsed = JSON.parse(localStorage.getItem("chat-app-user"));
    setUser(parsed);
  }, []);

  return (
    <Box border={"1px solid gray"} borderRadius={1} padding={1}>
      <Avatar /> {user.username}
      <br/>
      {user.email}

      <Button>Manage</Button>
      <Button>Sign Out</Button>

    </Box>
  );
}

export default UserInfo;
