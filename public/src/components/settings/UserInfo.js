import React, { useEffect, useState } from "react";
import { Box, Button, Typography, Modal, Grid, Avatar } from "@mui/material";
import GreyButton from "../buttons/GreyButton";
import PhotoModal from "./PhotoModal";

function UserInfo({ user, setManage }) {
  const [open, setOpen] = useState(false);

  const onProfilePhoto = () => {
    setOpen(true);
  };

  return (
    <Box border={"1px solid gray"} borderRadius={1} padding={2}>
      <Box display={"flex"} flexDirection={"row"} mb={3}>
        <Avatar
          sx={{ width: 50, height: 50, mr: 2, cursor: "pointer" }}
          onClick={onProfilePhoto}
        />
        <Box>
          <Typography fontWeight={600}>{user.username}</Typography>
          <Typography>
            {user.firstName} {user.lastName}
          </Typography>

          <Typography>{user.email}</Typography>
        </Box>
      </Box>

      <Box display={"flex"} justifyContent={"flex-end"}>
        <GreyButton text="Manage" mr={2} onClick={() => setManage(true)} />
        <GreyButton text="Sign Out" />
      </Box>

      <PhotoModal open={open} onClose={() => setOpen(false)} />
    </Box>
  );
}

export default UserInfo;
